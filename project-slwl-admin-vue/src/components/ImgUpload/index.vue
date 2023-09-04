<!-- 图片上传组件 -->
<template>
  <div class="upload-item">
    <!-- 禁用状态 -->
    <!-- <div
      v-if="disabled && !imageUrl"
      class="disabled-shadow"
    >
      <i
        class="el-icon-plus avatar-uploader-icon"
      />
    </div> -->
    <!-- 示例图 -->
    <div
      v-for="(item,index) in exampleList"
      v-if="isShowExampleImg"
      :key="index"
      class="read-example-box"
    >
      <img :src="item" />
    </div>
    <!-- 上传组件 -->
    <el-upload
      ref="uploadfiles"
      :accept="type"
      :class="{disabled:disabled ?'disabled':'' }"
      class="avatar-uploader"
      action=""
      :http-request="upload"
      multiple
      :limit="2"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :headers="headers"
      :disabled="disabled"
      list-type="picture-card"
      :file-list="fileList"
    >
      <i class="el-icon-plus avatar-uploader-icon" />

      <div
        slot="file"
        slot-scope="{file}"
      >
        <img
          v-if="file.url"
          :src="file.url"
          class="avatar"
        />

        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
        <span
          v-if="file.url && !disabled"
          class="el-upload-list__item-actions"
        >
          <img
            class="el-upload-span searchBigImg"
            src="../../assets/img-search.png"
            @click.stop="searchBigImg(file)"
          />
          <img
            class="el-upload-span"
            src="../../assets/img-delete.png"
            @click.stop="oploadImgDel(file)"
          />

        </span>
      </div>

    </el-upload>
    <!-- 规则说明 -->
    <p class="upload-tips">
      <slot />
    </p>
    <!-- 预览弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      height="600px"
    >
      <img
        width="100%"
        :src="imageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {
  imgUpload
} from '@/api/transit'
export default {
  props: {
    type: {
      type: String,
      default: '.jpg,.jpeg,.png'
    },
    propImageUrl: {
      type: Array
    },
    size: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: true
    },
    exampleList: {
      type: Array
    },
    isShowExampleImg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      headers: {
        Authorization: Cookies.get('TOKEN')
      },
      imageUrl: '',
      isDisable: '',
      dialogVisible: false,
      fileList: []
    }
  },
  mounted() {
    this.fileList = this.propImageUrl ? this.propImageUrl.map((item) => {
      return { url: item.size ? item.response.data : item.url }
    }) : []
  },
  methods: {
    upload(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      return imgUpload(formData).catch((err) => {
        console.log(err, 'err')
      })
    },
    // 查询大图
    searchBigImg(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    // 上传失败
    handleError(err, file, fileList) {
      console.log(err, file, fileList, 'handleError')
      this.$message({
        message: '图片上传失败',
        type: 'error'
      })
    },
    // 上传成功
    handleAvatarSuccess(response, file, fileList) {
      console.log(response, file, fileList, 'response, file, fileList')
      this.fileList = fileList.filter((item) => {
        // 由于无法触发失败的上传钩子，所以这里对数据进行筛选，防止出现上传失败的图片依然在上传列表显示
        return !item.size || (item.size && Boolean(item.response.code === 200))
      })
      this.$emit('imageChange', this.fileList)
      if (response.code !== 200) {
        return this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      }
    },
    // 删除选中的图片
    oploadImgDel(file) {
      this.fileList = this.fileList.filter((item, index) => {
        return file.url !== item.url
      })
      this.$emit('imageChange', this.fileList)
    },
    // 文件超出限制时的钩子
    handleExceed() {
      this.$message.error('最多上传2张照片')
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.size
      if (!isLt2M) {
        this.$message({
          message: `上传文件大小不能超过${this.size}M!`,
          type: 'error'
        })
        return false
      }
      this.$emit('imageChange', [1])// 优化当上传图片时，示例图和上传后的图片会同时存在一会，然后示例图才消失
    }
  }
}
</script>
<style scoped lang="scss">
.avatar-uploader .el-icon-plus:after {
  position: absolute;
  display: inline-block;
  content: ' ' !important;
  left: calc(50% - 26px);
  top: calc(50% - 50px);
  width: 50px;
  height: 50px;
  background: url('./../../assets/img-upload-normal.png') center center
    no-repeat;
  background-size: 20px;
}
.el-icon-plus {
  position: relative;
}
.el-icon-plus:before {
  content: '上传图片' !important;
  font-size: 14px;
  color: #000;
}
.el-upload-list__item-actions:hover .upload-icon {
  display: inline-block;
}
.el-icon-zoom-in:before {
  content: '\E626';
}
.el-icon-delete:before {
  content: '\E612';
}
.el-upload-list__item-actions:hover {
  opacity: 1;
}
.upload-item {
  display: flex;
  align-items: center;
  position: relative;
  .el-form-item__content {
    width: 500px !important;
  }
}
.upload-tips {
  font-size: 12px;
  color: #BAC0CD;
  display: inline-block;
  line-height: 17px;
  position: absolute;
  left: 0;
  bottom: -40px;
  font-weight: normal;
}
.el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d8dde3;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 212px !important;
  height: 159px !important;
  background-color: white;
}
.avatar-uploader {
  display: inline-block;
  position: relative;
  z-index: 1;
  // width: 212px;
  height: 159px;
}

.disabled-shadow {
  position: absolute;
  width: 212px;
  height: 100%;
  background-color: #d8dde3;
  z-index: 2;
  border-radius: 6px;
}
/deep/ .disabled-shadow {
  display: flex;
  justify-content: center;
  // border: 2px solid #EFF3F8;
  left: 1px;
  top: 1px;
  width: 210px;
  height: 157px;
  .el-icon-plus:after {
    position: absolute;
    display: inline-block;
    content: ' ' !important;
    left: calc(50% - 26px);
    top: calc(50% - 50px);
    width: 50px;
    height: 50px;
    background: url('./../../assets/img-upload-disabled.png') center center
      no-repeat;
    background-size: 20px;
  }
  .el-icon-plus:before {
    color: #bac0cd;
  }
}

/deep/ .avatar-uploader .el-upload:hover {
  // border-color: #ffc200;
  .el-icon-plus:after {
    position: absolute;
    display: inline-block;
    content: ' ' !important;
    left: calc(50% - 26px);
    top: calc(50% - 50px);
    width: 50px;
    height: 50px;
    background: url('./../../assets/img-upload-hover.png') center center
      no-repeat;
    background-size: 20px;
  }
  .el-icon-plus:before {
    color: #e15536;
  }
}
.el-upload-span {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.searchBigImg {
  margin-right: 40px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}

.avatar {
  width: 212px;
  height: 159px;
  display: block;
  cursor: auto;
}
/deep/ .el-dialog__header {
  background-color: white;
  position: relative;
  z-index: 2;
  padding: 0px;
}
/deep/ .el-dialog__body {
  position: absolute;
  height: 600px;
  width: 100%;
  top: 0;
  padding: 0;
  img {
    position: absolute;
    width: 100%;
    height: 600px;
  }
}
/deep/ .el-dialog {
  height: 600px;
}
/deep/ .el-upload-list__item {
  width: 212px;
  height: 159px;
  margin-right: 20px;
}
//上传列表
/deep/ .read-example-box {
  img {
    border: 1px solid #d8dde3;
    width: 212px;
    height: 159px;
    border-radius: 4px;
    margin-right: 21px;
  }
}
</style>
