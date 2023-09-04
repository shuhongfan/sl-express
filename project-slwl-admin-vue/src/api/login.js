/*
 * @Author: siwenqiang
 * @Date: 2022-06-14
 *
 * 登录相关接口
 */

import { createAPI } from '@/utils/request'

// 获取登录页面验证码图片
export const getCaptcha = data => createAPI('/captcha' + `?key=${data}`, 'get', data, 'arraybuffer')

// 登录
export const login = data => createAPI(`/login`, 'post', data)

// 获取权限路由
export const getRouter = data => createAPI(`/menus`, 'get', data)

// 获取登录信息
export const loginLog = (data, msg) => createAPI(`/apiLogin/authority/loginLog/anno/login/${data}`, 'get', { description: msg })
