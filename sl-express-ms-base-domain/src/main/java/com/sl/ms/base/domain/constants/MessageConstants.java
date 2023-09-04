package com.sl.ms.base.domain.constants;

public class MessageConstants {
    public static final Integer IS_READ = 1;
    public static final Integer UNREAD = 0;

    public static final Integer IS_DELETED = 1;
    public static final Integer NOT_DELETED = 0;

    /**
     * 消息通知标题
     */
    public interface MessageTitle {
        /**
         * 公告消息通知
         */
        String BULLETIN = "您有一条新的公告消息";

        /**
         * 新取件任务消息通知
         */
        String PICKUP = "您有一个新的取件订单";

        /**
         * 快件取消消息通知
         */
        String CANCEL = "您有一个快件已取消";

        /**
         * 派件签收消息通知
         */
        String SIGN = "您有一个派件已签收";

        /**
         * 派件消息通知
         */
        String DISPATCH = "您有一个新的派件订单";
    }
}
