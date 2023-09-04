package com.sl.transport.common.constant;

/**
 * 常量类
 *
 * @author zzj
 * @version 1.0
 */
public abstract class Constants {

    public interface LOCKS {
        /**
         * 任务调度锁的前缀
         */
        String DISPATCH_LOCK_PREFIX = "DISPATCH_LOCK_";

        /**
         * 司机作业单锁前缀
         */
        String DRIVER_JOB_LOCK_PREFIX = "DRIVER_JOB_LOCK_";
    }

    public interface GATEWAY{

        String USER_ID = "userId";
        String USERINFO = "userInfo";
        String TOKEN = "token";
        String AUTHORIZATION = "Authorization";
        String ACCESS_TOKEN = "access_token";
        String REFRESH_TOKEN = "refresh_token";
    }

    public interface MQ {

        /**
         * 默认延时时间为-1
         */
        int DEFAULT_DELAY = -1;

        /**
         * 低延迟时间：5秒
         */
        int LOW_DELAY = 5000;

        /**
         * 标准延迟时间：10秒
         */
        int NORMAL_DELAY = 10000;

        /**
         * 延迟交换机关键字
         */
        String DELAYED_KEYWORD = "delayed";

        /**
         * 表明是延迟队列
         */
        String DELAYED = "true";

        /**
         * 定义消息交换机，约定：1：类型都为topic，2：延迟队列命名由.delayed结尾
         */
        interface Exchanges {
            /**
             * 订单
             */
            String ORDER_DELAYED = "sl.exchange.topic.order.delayed";

            /**
             * 运单
             */
            String TRANSPORT_ORDER_DELAYED = "sl.exchange.topic.transportOrder.delayed";

            /**
             * 运输任务
             */
            String TRANSPORT_TASK = "sl.exchange.topic.transportTask";

            /**
             * 运输路线、机构等
             */
            String TRANSPORT = "sl.exchange.topic.transport";

            /**
             * 物流信息等
             */
            String TRANSPORT_INFO = "sl.exchange.topic.transportInfo";

            /**
             * 司机作业单
             */
            String DRIVER_JOB = "sl.exchange.topic.driverJob";

            /**
             * 取派件任务（延时）
             */
            String PICKUP_DISPATCH_TASK_DELAYED = "sl.exchange.topic.pickupDispatchTask.delayed";

            /**
             * 快递员
             */
            String COURIER = "sl.exchange.topic.courier";

            /**
             * 司机
             */
            String DRIVER = "sl.exchange.topic.driver";

            /**
             * 用户
             */
            String USER = "sl.exchange.topic.user";

            /**
             * 车辆
             */
            String TRUCK = "sl.exchange.topic.truck";

            /**
             * 车辆计划
             */
            String TRUCK_PLAN = "sl.exchange.topic.truckPlan";

            /**
             * 系统
             */
            String SYSTEM = "sl.exchange.topic.system";

            /**
             * 错误消息
             */
            String ERROR = "sl.exchange.topic.error";

            /**
             * 交易（支付）
             */
            String TRADE = "sl.exchange.topic.trade";

            /**
             * 快递员任务
             */
            String COURIER_TASK = "sl.exchange.topic.courierTask";
        }

        /**
         * 定义消息队列
         */
        interface Queues {

            /**
             * 调度中心：订单转取/派件任务
             */
            String DISPATCH_ORDER_TO_PICKUP_DISPATCH_TASK = "sl.queue.dispatch.order.pickupDispatchTask";

            /**
             * 调度中心：合并运单队列
             */
            String DISPATCH_MERGE_TRANSPORT_ORDER = "sl.queue.dispatch.mergeTransportOrder";

            /**
             * 基础微服务：完成车辆计划
             */
            String BASE_TRUCK_PLAN_COMPLETE = "sl.queue.base.truckPlan.complete";

            /**
             * work微服务：生成快递员的取件、派件任务
             */
            String WORK_PICKUP_DISPATCH_TASK_CREATE = "sl.queue.work.pickupDispatchTask.create";

            /**
             * work微服务：创建运输任务
             */
            String WORK_TRANSPORT_TASK_CREATE = "sl.queue.work.transportTask.create";

            /**
             * work微服务：取件成功
             */
            String WORK_COURIER_PICKUP_SUCCESS = "sl.queue.work.courier.pickup.success";

            /**
             * 物流信息微服务：追加物流信息
             */
            String TRANSPORT_INFO_APPEND = "sl.queue.transportInfo.append";

            /**
             * 轨迹服务：创建运单
             */
            String TRACK_TRANSPORT_ORDER_CREATED = "sl.queue.track.transportOrder.created";

            /**
             * 轨迹服务：更新运单状态
             */
            String TRACK_TRANSPORT_ORDER_UPDATE_STATUS = "sl.queue.track.transportOrder.update.status";

            /**
             * 订单微服务：快递员取件后更新订单
             */
            String OMS_COURIER_PICKUP_UPDATE_ORDER = "sl.queue.oms.courier.pickup.update.order";

            /**
             * 订单微服务：更新运单状态
             */
            String OMS_TRANSPORT_ORDER_UPDATE_STATUS = "sl.queue.oms.transportOrder.update.status";

            /**
             * 订单微服务：更新支付状态
             */
            String OMS_TRADE_UPDATE_STATUS = "sl.queue.oms.trade.update.Status";

            /**
             * 订单微服务：更新退款
             */
            String OMS_TRADE_REFUND_STATUS = "sl.queue.oms.trade.refund";

            /**
             * 错误消息队列前缀
             */
            String ERROR_PREFIX = "sl.queue.error.";

            /**
             * 权限系统机构消息队列
             */
            String AUTH_TRANSPORT = "sl.queue.auth.transport";

            /**
             * 权限系统机构消息队列
             */
            String AUTH_USER = "sl.queue.auth.user";

            /**
             * 搜索微服务：快递员任务新增/更新
             */
            String COURIER_TASK_SAVE_OR_UPDATE = "sl.queue.search.courierTask.saveOrUpdate";

            /**
             * 搜索微服务：创建运单
             */
            String SEARCH_TRANSPORT_ORDER_CREATED = "sl.queue.search.transportOrder.created";
        }

        /**
         * 定义路由key
         */
        interface RoutingKeys {
            /**
             * 运单加入到调度
             */
            String JOIN_DISPATCH = "JOIN_DISPATCH";

            /**
             * 创建运输任务
             */
            String TRANSPORT_TASK_CREATE = "CREATE";

            /**
             * 快递员取件
             */
            String COURIER_PICKUP = "PICKUP";

            /**
             * 快递员取件后更新订单
             */
            String COURIER_UPDATE_ORDER = "UPDATE_ORDER";

            /**
             * 快递员派件
             */
            String COURIER_DISPATCH = "DISPATCH";

            /**
             * 完成车辆计划
             */
            String TRUCK_PLAN_COMPLETE = "COMPLETE";

            /**
             * 新增订单
             */
            String ORDER_CREATE = "CREATE";

            /**
             * 生成取/派件任务
             */
            String PICKUP_DISPATCH_TASK_CREATE = "CREATE";

            /**
             * 追加物流信息
             */
            String TRANSPORT_INFO_APPEND = "APPEND";

            /**
             * 新增运单
             */
            String TRANSPORT_ORDER_CREATE = "CREATE";

            /**
             * 更新运单状态
             */
            String TRANSPORT_ORDER_UPDATE_STATUS_PREFIX = "UPDATE_STATUS.";

            /**
             * 更新支付状态
             */
            String TRADE_UPDATE_STATUS = "UPDATE_STATUS";

            /**
             * 更新退款状态
             */
            String REFUND_UPDATE_STATUS = "REFUND_UPDATE_STATUS";

            /**
             * 新增/更新快递员任务
             */
            String COURIER_TASK_SAVE_OR_UPDATE = "saveOrUpdate";
        }
    }
}
