// 获取年月时、分
export const taskTimeFormat = (val) => {
	const times = getTimeDate(val)
	return times.date
}
// 获取时、分
export const overTimeFormat = (val) => {
	const times = getTimeDate(val)
	return times.times
}
// 时间格式化
export const getTimeDate = (val) => {
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
		times: addZero(hour) + ':' + addZero(minute),
		veryDayDate: addZero(year) + '-' + addZero(month) + '-' + addZero(day) + ' ' + '00' + ':' + '00' + ':' +
			'00',
	}
	return time
}

function addZero(s) {
	return s < 10 ? ('0' + s) : s;
}
// 获取处理当前日期，时分秒以00:00:00显示
export const getTate = (val) => {
	let date = new Date(val);
	const year = date.getFullYear(); //getFullYear()代替getYear()
	//月 getMonth()：0 ~ 11
	const month = date.getMonth() + 1;
	//日 getDate()：(1 ~ 31)
	const day = date.getDate();
	const m = addZero(year) + '-' + addZero(month) + '-' + addZero(day) + ' ' + '00' + ':' + '00' + ':' +
		'00';
	return m
}
// 格式化触发的当前时间
export const getNow = (val) => {
	let date = new Date(val);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	return m + "月" + d + '日';
}
// 前一天
export const preDay = (date) => {
	let odata = new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000); //计算当前日期 -1
	return getTate(odata)
}
// 后一天
export const nextDay = (date) => {
	let odata = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000); //计算当前日期 +1
	return getTate(odata)
}

// 获取近30天数据
export const getDay = () => {
	const times = timeList()
	let arr = []
	times.forEach((val) => {
		const obj = getTate(val)
		arr.push(obj)
	})

	return arr
}
// 获取当前日期、当月第一天，当月最后一天的时间戳，用来判断当前触发的时间是不是30天以内的时间
export const getMonthDay = (val) => {
	const now = timeList()
	// // 当天的时间戳
	const timeNow = Date.parse(val);
	// // 当月第一天时间戳
	const timeStar = Date.parse(now[0]);
	// // 当月最后一天时间戳
	const timeEnd = Date.parse(now[now.length - 1]);
	const times = {
		timeNow: timeNow,
		timeStar: timeStar,
		timeEnd: timeEnd
	}
	return times
}
// 文字字节数限制
export const validateTextLength = (value) => {

	// 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
	if (value != undefined) {
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
// 选择近30天时间
export const timeList = () => {
	var thrityMonth = [];
	for (var i = 0; i < 30; i++) {
		thrityMonth.unshift(new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString())
	}
	return thrityMonth
}
// 拨打电话
export const call = (val) => {
	uni.makePhoneCall({
		phoneNumber: val,
		success(e) {
			// console(e)
		},
		fail(e) {
			// console(e)
		}
	})
}

//功能只展示不实现的提示
export const handleSecondQi = ()=>{
	uni.showToast({
		title: "程序员哥哥正在实现中",
		icon: "none",
		duration: 1000,
	});
}

export const handleTimeToStrTime = (time)=>{
	const newTime = time.replace(/-/g, '/')
	return (new Date(newTime).getMonth() + 1 + '月') + 
		   (new Date(newTime).getDate() + '日') + ' ' +
		   String(Number(new Date(newTime).getHours())<10?'0'+Number(new Date(newTime).getHours()) :Number(new Date(newTime).getHours())) + ':'+
		   String(Number(new Date(newTime).getMinutes())<10?'0'+Number(new Date(newTime).getMinutes()) :Number(new Date(newTime).getMinutes()))
}
