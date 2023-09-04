<script setup>
import { ref, reactive, onMounted } from 'vue';
import { onLoad,onShow } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
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
