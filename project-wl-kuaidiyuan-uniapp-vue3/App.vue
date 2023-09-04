<script setup>
import { ref, reactive, onMounted } from 'vue';
import { onLoad,onShow } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
// ------定义变量------
const store = useStore(); //vuex获取储存数据
const locationData = ref({});
// ------生命周期------
onShow(()=>{
	// 获取当前位置储存在vuex，获取取件、派件列表时要用到
	uni.getLocation({
		type: 'gcj02',
		success: res => {
			locationData.value = {
				longitude: res.longitude,
				latitude: res.latitude
			};
			store.commit('user/setlLacation', locationData.value);
		},
		fail: err => {
		}
	});
	uni.getNetworkType({
		success: function(res) {
		}
	});
})
onMounted(() => {
});
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/styles/common.scss';
// 设置整个项目的背景色
page {
	background-color: #f5f5f5;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>
