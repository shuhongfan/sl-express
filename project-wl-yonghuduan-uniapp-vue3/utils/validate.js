// 手机校验
export function validatePhone(rule, value, data, callback) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    if (rule.required) {
      callback('请输入电话号码')
    } else {
      callback()
    }
  } else if (!Number.isInteger(value)) {
    callback('电话号码必须全为数字')
  } else if (value.trim().length < 11) {
    callback('电话号码长度必须是11位')
  } else {
    if (!reg.test(value) && value !== '') {
      callback('请输入正确的电话号码')
    } else {
      callback()
    }
  }
}
// 手机验证
export const isPhone = (value) => {
  const reg = /^[1][3-9][0-9]{9}$/
  if (!reg.test(value) || value === '') {
    return false
  } else {
    return true
  }
}
// 倒计时
export const timeCountdown = (obj) => {
  // obj包括timer、times show
  const TIME_COUNT = 60; // 默认倒计时秒数
  if (!obj.timer) {
    obj.times = TIME_COUNT;
    obj.show = false;
    obj.timer = setInterval(() => {
      if (obj.times > 0 && obj.times <= TIME_COUNT) {
        obj.times--;
      } else {
        obj.show = true;
        clearInterval(obj.timer); // 清空定时器
        obj.timer = null;
      }
    }, 1000);
  }
  return {
    timer: obj.timer,
    show: obj.show,
    times: obj.times,
  };
};
// 身份证校验
export const validateIdentityCard = (value) => {
  const accountreg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/g
	let tipVal = ''
  if (value === undefined || value === '') {
		return false
  } else if (!accountreg.test(value)) {
    return false
  }else{
		return true
	}
	
}