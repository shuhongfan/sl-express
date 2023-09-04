package com.sl.ms.trade.constant;

/**
 * @ClassName TradingCacheConstant.java
 * @Description 交易缓存维护
 */
public class TradingCacheConstant {

    //默认redis等待时间
    public static final int REDIS_WAIT_TIME = 5;

    //默认redis自动释放时间
    public static final int REDIS_LEASETIME = 4;

    //安全组前缀
    public static final String PREFIX = "trading:";

    //分布式锁前缀
    public static final String LOCK_PREFIX = PREFIX + "lock:";

    //创建交易加锁
    public static final String CREATE_PAY = LOCK_PREFIX + "create_pay";

    //查询交易状态加锁
    public static final String QUERY_PAY = LOCK_PREFIX + "query_pay";

    //创建退款加锁
    public static final String REFUND_PAY = LOCK_PREFIX + "refund_pay";

    //退款查询加锁
    public static final String REFUND_QUERY_PAY = LOCK_PREFIX + "refund_query_pay";

    //创建退款加锁
    public static final String PAY_CHANNEL_LIST = PREFIX + "pay_channel_list&ttl=-1";

    //page分页
    public static final String PAGE = PREFIX + "page";
}
