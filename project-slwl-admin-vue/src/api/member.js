/*
 * @Author: zhangyanxin
 * @Date: 2020-03-04
 *
 * 个人中心接口
 */

import { createAPI } from '@/utils/request'

// 获取个人信息
export const infoList = data => createAPI(`/web-manager/userCenter/info`, 'get', data)
// 更新个人信息
export const updateInfoList = data => createAPI(`/web-manager/userCenter/info`, 'put', data)
// 获取通知通告
export const notieList = data => createAPI(`/web-manager/userCenter/message`, 'get', data)
