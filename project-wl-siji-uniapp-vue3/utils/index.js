import { PositionUpload } from '@/pages/api/index.js';
// 获取时、分
export const taskTimeFormat = (val) => {
	const times = getTime(val)
	return times.date
}
// 获取时、分
export const overTimeFormat = (val) => {
	const times = getTime(val)
	return times.times
}
// 时间格式化
function getTime(val) {
	const date = new Date(val);
	date.setTime(date.getTime() + 3600000)
	//年 getFullYear()：四位数字返回年份
	const year = date.getFullYear(); //getFullYear()代替getYear()
	//月 getMonth()：0 ~ 11
	const month = date.getMonth() + 1;
	//日 getDate()：(1 ~ 31)
	const day = date.getDate();
	//时 getHours()：(0 ~ 23)
	const hour = date.getHours();
	//分 getMinutes()： (0 ~ 59)
	const minute = date.getMinutes();
	//秒 getSeconds()：(0 ~ 59)
	const second = date.getSeconds()
	const time = {
		date: addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute),
		times: addZero(hour) + ':' + addZero(minute)
	}
	return time
}

function addZero(s) {
	return s < 10 ? ('0' + s) : s;
}
// 获取当前日期
export const getTate = (val) => {
	let date = new Date(val);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	return m + "月" + d + '日';
}
// 前一天
export const preDay = (date) => {
	const reg = /[\u4e00-\u9fa5]/g
	let odata = new Date(new Date(date.replace(reg, '-')).getTime() - 24 * 60 * 60 * 1000); //计算当前日期 -1
	return getTate(odata)
}
// 后一天
export const nextDay = (date) => {
	const reg = /[\u4e00-\u9fa5]/g
	let odata = new Date(new Date(date.replace(reg, '-')).getTime() + 24 * 60 * 60 * 1000); //计算当前日期 +1
	return getTate(odata)
}
// 获取当前月天数
export const getDay = () => {
	const date = new Date();
	const year = date.getFullYear(); //getFullYear()代替getYear()
	const month = date.getMonth() + 1;
	const day = new Date(year, month, 0);
	let arr = []
	const datas = day.getDate()
	for (let i = 1; i <= datas; i++) {
		arr.push(month + '月' + i + '日')
	}
	return arr
}
// 文字字节数限制
export const validateTextLength = (value) => {
	console.log(value)
	// 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
	if (value!=undefined) {
		let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
		let mat = value.match(cnReg)
		let length
		if (mat) {
			length = (mat.length + (value.length - mat.length) * 0.5)
			return length
		} else {
			return value.length * 0.5
		}
	}

}

export function openMap(orgName,endName,latitude,longitude,name){
	
    let url = "";
    if (plus.os.name == "Android") {
        let hasBaiduMap = plus.runtime.isApplicationExist({
            pname: 'com.baidu.BaiduMap',
            action: 'baidumap://'
        });
        let hasAmap = plus.runtime.isApplicationExist({
            pname: 'com.autonavi.minimap',
            action: 'androidamap://'
        });
		// 调用驾车导航
        let urlBaiduMap = `baidumap://map/direction?origin=${orgName}&destination=${endName}&mode=driving&coord_type=gcj02&src=andr.baidu.openAPIdemo`
		// API 示例展示
		// let urlBaiduMap = `baidumap://map/direction?origin=name:对外经贸大学|latlng:39.98871,116.43234&destination=西直门&coord_type=bd09ll&mode=transit&sy=3&index=0&target=1&src=andr.baidu.openAPIdemo`
        urlBaiduMap = encodeURI(urlBaiduMap)
        // let urlAmap = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
		// 高德展示无法实现关键词导航 当前为关键词路线规划
		let urlAmap = `androidamap://keywordNavi?sourceApplication=softname&keyword=${endName}&style=2`

		// return
        if (hasAmap && hasBaiduMap) {
            plus.nativeUI.actionSheet({
                title: "选择地图应用",
                cancel: "取消",
                buttons: [{
                    title: "百度地图"
                }, {
                    title: "高德地图"
                }]
            }, function(e) {
                switch (e.index) {
                    case 1:
                        plus.runtime.openURL(urlBaiduMap);
                        break;
                    case 2:
                        plus.runtime.openURL(urlAmap);
                        break;
                }
            })
        } else if (hasAmap) {
            plus.runtime.openURL(urlAmap);
        } else if (hasBaiduMap) {
            plus.runtime.openURL(urlBaiduMap);
        } else {
            plus.nativeUI.alert("本机未安装指定的地图应用");
            // url = "geo:"+latitude+","+longitude+"?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
            // plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差  
        }
    }
}	
let getAuth = null

// 初始上报位置
export const positionsUploadInit = () => {
	// 获取用户的定位配置
	let appAuthorizeSetting = uni.getAppAuthorizeSetting().locationAuthorized 
	// 清除 定位检查的定时器
	getAuth != null ? clearInterval(getAuth) : null
	// 如果用户拒绝使用定位 提示无法上报位置
	if (appAuthorizeSetting == 'denied'){
		uni.showToast({
			title: '您拒绝提供定位服务，系统将无法使用位置上报功能',
			duration: 3000,
			icon: 'none'
		});
		return false
	}
	//如果没有开启定位 持续检查 直到开启定位
	if(appAuthorizeSetting != 'authorized' && appAuthorizeSetting != 'denied'){
		getAuth = setInterval(() => {
			positionsUploadInit()
		}, 30000)
		return false
	} 
	const posit = uni.getStorageSync('positions')
	// 位置上报
	if (!posit){
		positionUploadHandle()
	}
}
/** 
* 
* 条件配置  时间和距离  
* 要求：进入首页上报一次 并开启连续上报，条件为每五分钟 或者 每500米 上报位置 上报一次后重置上报条件；点击提货、交付直接上报 
* 实现： 	
* 		一、如果没有获取到定位，每30秒检查一次定位配置情况
* 		二、每分钟获取定位并计算 距离 （距离使用计算公式计算，不是请求api）, 如果超过5分钟或者距离超过 500M 上报位置 否者 不做任何操作
* 		三、直接执行上报 点击提货、交付上报 则 直接上报并 清空所有时间和距离条件 重新计算
* 记录： timer - 定时器，最后一次的位置 - lastPoint， 时间：countTime， 距离：countTime
* 500m 和 5分钟一次上报 
* 
* 百度定位Api的请求限制：2000次/天  一天是 1440分钟 满足每分钟获取一次定位  但高频率获取定位 会有 提示 
* 定位的误差 10米 - 50米 我们测试 坐着不动 距离 49，36，72，72 117 162  39 78 0
* 
**/

// 位置获取 item 如果存在 则直接执行上报 清空所有时间和距离条件 重新计算
export const positionUploadHandle = item => {
	uni.getLocation({
		type: 'gcj02',
		isHighAccuracy: true,
		success: function(positions) {
			if (positions){
				// 首次进入 上传位置 并记录相关数据
				const posit = uni.getStorageSync('positions')
				// 点击按钮直接上报
				if(item){
					positionUploadAdmin(positions)
					uni.setStorageSync('positions', {timer:posit.timer, lastPoint: positions, countTime: 0, countDist: 0 })
					return 
				}
				// 非直接上报 按条件执行 每分钟执行定位并计算距离 首次执行
				if (!posit) {
					const timer = setInterval(() => {
						positionUploadHandle()
					}, 1000 * 60)
					uni.setStorageSync('positions', {timer, lastPoint: positions, countTime: 0, countDist: 0 })
					// 上报位置
					positionUploadAdmin(positions)
				} else {
					const dist = getDistance(posit.lastPoint.latitude, posit.lastPoint.longitude, positions.latitude,  positions.longitude)
					uni.setStorageSync('positions', {timer:posit.timer, lastPoint: positions, countTime: posit.countTime + 60000, countDist: posit.countDist + dist })
					// console.log('距离和时间',posit.lastPoint.latitude, posit.lastPoint.longitude, positions.latitude,positions.longitude, posit.countTime, dist)
					// 之后进入根据条件决定是否上报位置
					if(posit.countTime + 60000 >= 300000 || posit.countDist + dist >= 500){
						// uni.showToast({
						// 	title: `满足条件：${posit.countTime + 60000 >= 10000 ? '时间大于了 5分钟' :'距离大于了500米'} 上报位置， 时间: ${posit.countTime + 10000} 距离：${posit.countDist}`,
						// 	duration: 5000,
						// 	icon: 'none'
						// });
						positionUploadAdmin(positions)
						uni.setStorageSync('positions', {timer:posit.timer, lastPoint: positions, countTime: 0, countDist: 0 })
					}
				}	
			} else {
				uni.showToast({
					title: '位置更新失败，请检查定位功能是否开启，或切网络了重新上传',
					duration: 3000,
					icon: 'none'
				});
			}
		}, 
		fail: function(err){
			uni.showToast({
				title: '位置获取失败，请检查定位功能是否开启，或切网络了重新上传',
				duration: 3000,
				icon: 'none'
			});
		}
	});
} 
// 计算距离
// params ：lat1 纬度1； lng1 经度1； lat2 纬度2； lng2 经度2； len_type （1:m or 2:km);
const getDistance = (lat1, lng1, lat2, lng2, lenType = 1, decimal = 2) => {
	const EARTH_RADIUS = 6378.137 //地球半径
	const PI = 3.1415926
	const radLat1 = lat1 * PI / 180.0;
	const radLat2 = lat2 * PI / 180.0;
	let a = radLat1 - radLat2;
	let b = (lng1 * PI / 180.0) - (lng2 * PI / 180.0);
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * EARTH_RADIUS;
	//s = round(s * 10000) / 10000; //输出为公里
	//s = round(s * 1000) / 1; //单位修改为米,取整
	s = lenType == 1 ? Math.round(s * 1000)/1 : Math.round(s * 10000) / 10000;
	return s
}

// 位置上报到后台
const positionUploadAdmin = (positions) => {
	PositionUpload({lat: positions.latitude.toString(), lng: positions.longitude.toString()}).then(res => {
		// 上报成功不做处理,
		if(res.code == 200){
			console.log('位置上报成功了')
		} else {
			uni.showToast({
				title: '位置上报失败，请检查定位功能是否开启，或切网络了重新上传',
				duration: 3000,
				icon: 'none'
			});
		}
		
	})
}