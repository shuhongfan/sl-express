/*
 * @Author: zhangyanxin
 * @Date: 2020-04-22
 *
 * 调度任务管理
 */

import { createAPI } from '@/utils/request'

// 查询任务接口
export const dispatchList = data => createAPI(`/web-dispatch/schedule/dispatch/${data}`, 'get', data)
// 保存任务接口
export const dispatchAdd = data => createAPI(`/web-dispatch/schedule/dispatch`, 'POST', data)
// 运行任务
export const dispatchRun = data => createAPI(`/web-dispatch/schedule/run/${data}`, 'PUT', data)
// 恢复任务
export const dispatchResume = data => createAPI(`/web-dispatch/schedule/resume/${data}`, 'PUT', data)
// 运暂停任务
export const dispatchPause = data => createAPI(`/web-dispatch/schedule/pause/${data}`, 'PUT', data)
// 日志列表
export const scheduleLogList = data => createAPI(`/web-dispatch/scheduleLog/page`, 'get', data)
// 日志详情
export const scheduleLogDetail = data => createAPI(`/web-dispatch/scheduleLog/${data}`, 'get', data)
