package com.sl.transport.info.service;

/**
 * 布隆过滤器服务
 */
public interface BloomFilterService {

    /**
     * 初始化布隆过滤器
     */
    void init();

    /**
     * 向布隆过滤器中添加数据
     *
     * @param obj 待添加的数据
     * @return 是否成功
     */
    boolean add(Object obj);

    /**
     * 判断数据是否存在
     *
     * @param obj 数据
     * @return 是否存在
     */
    boolean contains(Object obj);

}
