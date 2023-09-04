<!-- 我的- 系统设置 -->
<template>
		<view class="systmSet">
			<view class="navList">
				<!-- <view class="line" @click="goDetails(`/pages/user/setCarrier?type=phone&title=换绑手机`)"> -->
				<view class="line" @click="goDetails(``)">
					<text>换绑手机</text>
					<image class="icon" src="@/static/sj_open_rit.png" mode=""></image>
				</view>
				<view class="line" @click="goDetails(``)">
				<!-- <view class="line" @click="goDetails(`/pages/user/setCarrier?type=pass&title=修改密码`)"> -->
					<text>修改密码</text>
					<image class="icon" src="@/static/sj_open_rit.png" mode=""></image>
				</view>
				<view class="line" @click="goDetails(`/pages/user/setCarrier?type=setMessage&title=消息通知设置`)">
					<text>消息通知设置</text>
					<image class="icon" src="@/static/sj_open_rit.png" mode=""></image>
				</view>
				<view class="line" @click="dialogToggle('clear', `清理缓存后会清空所有数据`, '清理')">
					<text>清理缓存</text>
					<image class="icon" src="@/static/sj_open_rit.png" mode=""></image>
				</view>
			</view>
			<view class="navList">
				<view class="back" @click="dialogToggle('back', '确定要退出登录？', '退出')">
					<text>退出</text>
				</view>
			</view>
		</view>
		<!-- 提示窗示例 清理缓存、退出的提示 - start-->
		<Popup ref="alertDialog" type="dialog">
			<PopupDialog :type="msgType" cancelText="关闭" :confirmText="butText" :content="content" @confirm="confirmHandle"
				@close="dialogClose"></PopupDialog>
		</Popup>
		<!-- 提示窗示例 清理缓存、退出的提示 - end-->
</template>

<script >
// 变量导入	
import { ref, onMounted } from 'vue';
import Popup from '@/components/Popup/components/uni-popup/uni-popup.vue' 
import PopupDialog from '@/components/Popup/components/uni-popup-dialog/uni-popup-dialog.vue' 
export default {
	data(){
		return {
			type:'clear',
			msgType:'success', 
			content: '', 
			butText: '清理',
		}
	},
	components:{
		Popup,
		PopupDialog
	},
	created() {
		// 差量编译 只有在app中才纯在清理缓存的功能
		// #ifdef APP-PLUS
		this.formatSize()
		// #endif
	},
	methods:{
		// 计算缓存大小
		formatSize() {
			let that = this;
			plus.cache.calculate(function(size) {
				let sizeCache = parseInt(size);
				if (sizeCache == 0) {
					that.fileSizeString = "0B";
				} else if (sizeCache < 1024) {
					that.fileSizeString = sizeCache + "B";
				} else if (sizeCache < 1048576) {
					that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
				} else if (sizeCache < 1073741824) {
					that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
				} else {
					that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
				}
			});
		},
		// 清楚缓存
		clearCache() {
			let that = this;
			let os = plus.os.name;
			that.formatSize();
			if (parseInt(that.fileSizeString) <= 100){
				uni.showToast({
					icon:'none',
					title: '没有缓存了',
					duration: 2000
				});
			} else if (os == 'Android') {
				let main = plus.android.runtimeMainActivity();
				let sdRoot = main.getCacheDir();
				let files = plus.android.invoke(sdRoot, "listFiles");
				let len = files.length;
				for (let i = 0; i < len; i++) {
					let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
					plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
						if (entry.isDirectory) {
							entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
								uni.showToast({
									title: '缓存清理完成',
									duration: 2000
								});
								that.formatSize(); // 重新计算缓存  
							}, function(e) {
								console.log(e.message)
							});
						} else {
							entry.remove();
						}
					}, function(e) {
						console.log('文件路径读取失败')
					});
				}
			} else { // ios  
				plus.cache.clear(function() {
					uni.showToast({
						title: '缓存清理完成',
						duration: 2000
					});
					that.formatSize();
				});
			}
		},
		// 弹窗的点击事件设置对应的展示信息
		dialogToggle(type, content, butText) {
			this.type = type
			this.content = content
			this.butText = butText
			this.$refs.alertDialog.open()
		},
		// 点击清理按钮清理缓存 点击退出直接退出
		confirmHandle(){
			this.type == 'clear' ? this.clearCache() : this.backlogin()
		},
		// 关闭弹窗
		dialogClose(){
			
		},
		// 去详情页面
		goDetails(url){
			if (url == ''){
				uni.showToast({
					title: '抱歉 该功能暂未实现！',
					duration: 2000,
					icon: 'none'
				});
				return
			}
			uni.navigateTo({
				url
			})
		},
		// 退出登录
		backlogin(){
			this.goDetails('/pages/login/user')
		}
	}
}
</script>

<style lang="scss" scoped>
	::v-deep .uni-dialog-title{
		padding:0;
	}
	::v-deep .uni-dialog-content{
		padding: 80rpx 0 60rpx 0;
		font-size: var(--font-size-16);
	}
	::v-deep .uni-dialog-content-text{
		font-size: var(--font-size-16);
		color: var(--neutral-color-main);
		
	}
	.systmSet{
		.navList{
			position: relative;
			background: var(--neutral-color-white);
			border-radius: 16rpx;
			padding: 0rpx 48rpx;
			margin: 40rpx 30rpx 80rpx 30rpx;
			font-size: var(--font-size-16);
			.line{
				line-height: 114rpx;
				border-bottom: solid 2rpx var(--neutral-color-cancel);
				display: flex;
				justify-content: space-between;
				align-items: center;
				.icon{
					width: 48rpx;
					height: 48rpx;
				}
			}
			.line:last-child{
				border: none;
			}
		}
		.back{
			text-align: center;
			line-height: 120rpx;
			font-size: var(--font-size-16);
		}
	}
</style>