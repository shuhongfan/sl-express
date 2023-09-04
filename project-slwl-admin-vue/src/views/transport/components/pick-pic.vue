<template>
  <el-container class="customer-details-box">
    <el-card
      shadow="never"
      style="width: 100%"
      :class="isShow?'show':'hidden'"
    >
      <div class="block">
        <div class="car-base pick-pic">
          提货照片
          <img
            ref="arrow"
            src="../../../assets/new-pull-down.png"
            style="position:absolute;width:18px;height:18px;right:44px;top:20px;cursor:pointer;transition-duration:0.3s"
            @click="open"
          />
        </div>
        <div
          class="demo-input-suffix"
          style="color: #2a2929; font-size: 14px; padding: 20px 26px 40px"
        >
          <div
            class="img-label"
            style="margin-left:70px"
          >货品照片</div>
          <div class="img-box">
            <img
              style="width: 212px; height: 159px; border-radius: 4px"
              :src="cargoPicture||defaultPic"
            />
            <div class="img-shadow">
              <img
                class="el-upload-span searchBigImg"
                src="../../../assets/img-search.png"
                @click.stop="searchBigImg(cargoPicture||defaultPic)"
              > </img>
            </div>
          </div>

          <div
            class="img-label"
            style="margin-left:20%"
          >凭证照片</div>
          <div class="img-box">
            <img
              style="width: 212px; height: 159px; border-radius: 4px"
              :src=" cargoPickUpPicture||defaultPic"
            />
            <div class="img-shadow">
              <img
                class="el-upload-span searchBigImg"
                src="../../../assets/img-search.png"
                @click.stop="searchBigImg(cargoPickUpPicture||defaultPic)"
              > </img>
            </div>
          </div>

        </div>
      </div>
    </el-card>
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
  </el-container>
</template>
<script>
import { transportJobDetail } from '@/api/transport'
export default {
  data() {
    return {
      dialogVisible: false,
      imageUrl: '',
      isShow: true,
      srcList: [
        'https://elevator4s-oss.oss-cn-hangzhou.aliyuncs.com/2021/05/07/b632db6a837f46e0950670277fa9e5e5multipartFile.png'
      ],
      cargoPicture: '',
      cargoPickUpPicture: '',
      defaultPic:
        'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/282b9ee4-9edc-40e9-b365-84dec2cce429.png'
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList(this.id)
  },
  methods: {
    open() {
      this.isShow = !this.isShow
      this.$refs.arrow.style.transform = !this.isShow ? 'rotate(-90deg)' : 'rotate(0deg)'
    },
    // 查询大图
    searchBigImg(url) {
      this.imageUrl = url
      this.dialogVisible = true
    },
    async getList(id) {
      const { data: res } = await transportJobDetail(id)
      this.cargoPicture = res.cargoPicture
      this.cargoPickUpPicture = res.cargoPickUpPicture
    },
    // 返回列表
    handleTaskList() {
      this.$router.push({ path: '/transport/transport-task' })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .img-label {
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  margin-right: 20px;
}
/deep/ .image-slot {
  background-image: url('https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/282b9ee4-9edc-40e9-b365-84dec2cce429.png');
  width: 241px;
  height: 160px;
  background-repeat: no-repeat;
  background-size: contain;
}
.pick-pic {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #2a2929;
}
.customer-details-box {
  height: 100%;
  margin-left: 20px;
  .block {
    background-color: #ffffff;
    width: 100%;
    padding: 0 24px;
  }
  .car-base {
    color: #2a2929;
    font-size: 16px;
    margin: 15px 0;
    font-weight: 700;
  }
  .car-img-base {
    margin: 25px 0;
    // border-bottom: 1px solid #e5e7ec;
    .info-box {
      border: 0 !important;
      padding: 35px 0;
      width: 100%;
    }
  }
  .form-box {
    border: 0 !important;
    /deep/ .el-card__body {
      padding: 15px 26px;
      .form-item-box {
        display: flex;
        flex-wrap: wrap;
        .form-item {
          width: 50%;
          display: flex;
          align-items: center;
          margin-top: 24px;
          box-sizing: border-box;
          &:nth-child(1),
          &:nth-child(2) {
            margin-top: 0;
          }
          &:nth-child(odd) {
            padding-right: 35px;
          }
          &:nth-child(even) {
            padding-left: 35px;
          }
          .span-title {
            min-width: 80px;
            font-weight: 400;
            text-align: right;
            color: #20232a;
            font-size: 14px;
          }
          /deep/ .el-input {
            flex: 1;
            margin-left: 10px;
          }
          /deep/.el-input.is-disabled .el-input__inner {
            background: #eff3f8;
            border: 1px solid #d8dde3;
            border-radius: 5px;
            font-weight: 400;
            color: #bac0cd;
          }
        }
      }
    }
  }
  /deep/ .img-box {
    display: inline-block;
    position: relative;
    .img-shadow {
      position: absolute;
      top: 0;
      width: 212px;
      height: 159px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      text-align: center;
      display: none;
      .searchBigImg {
        width: 28px;
        height: 28px;
        margin-top: 64px;
        cursor: pointer;
      }
    }
  }
  .img-box:hover {
    .img-shadow {
      display: block;
    }
  }
  .footer-box {
    text-align: center;
    margin-top: 20px;
    padding: 30px 0 16px;
    border-top: 1px solid #e5e7ec;
    .save-btn {
      background-color: #e15536;
      color: #ffffff;
      width: 110px;
      border-radius: 5px;
      font-weight: 400;
      border: 1px solid #e15536;
      &:hover {
        background: #ffab98;
        border: 1px solid #ffab98;
      }
    }
    .cancel-btn {
      width: 110px;
      color: #2a2929;
      border: 1px solid #d8dde3;
      border-radius: 5px;
      font-weight: 400;
      &:hover {
        background: #ffeeeb;
        border: 1px solid #f3917c;
        color: #e15536;
      }
    }
  }
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
</style>
