package com.sl.transport.service;

import com.sl.transport.entity.node.BaseEntity;

/**
 * 基础服务实现
 *
 * @author zzj
 * @version 1.0
 */
public interface IService<T extends BaseEntity> {

    /**
     * 根据业务id查询数据
     *
     * @param bid 业务id
     * @return 节点数据
     */
    T queryByBid(Long bid);

    /**
     * 新增节点
     *
     * @param t 节点数据
     * @return 新增的节点数据
     */
    T create(T t);

    /**
     * 更新节点
     *
     * @param t 节点数据
     * @return 更新的节点数据
     */
    T update(T t);

    /**
     * 根据业务id删除数据
     *
     * @param bid 业务id
     * @return 是否删除成功
     */
    Boolean deleteByBid(Long bid);

}
