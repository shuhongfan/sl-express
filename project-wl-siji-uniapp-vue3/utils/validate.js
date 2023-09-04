// 手机校验
export function validatePhone(rule, value, data, callback) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    if (rule.required) {
      callback('请输入手机号码')
    } else {
      callback()
    }
  } else if (!value) {
    callback('手机号码必须全为数字')
  } else if (value.trim().length < 11) {
    callback('手机号码长度必须是11位')
  } else {
    if (!reg.test(value) && value !== '') {
      callback('请输入正确的手机号码')
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