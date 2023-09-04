package com.sl.transport.info.service;

import com.sl.transport.info.domain.TransportInfoDTO;
import com.sl.transport.info.entity.TransportInfoDetail;
import com.sl.transport.info.entity.TransportInfoEntity;

/**
 * 物流信息服务
 */
public interface TransportInfoService {


    /**
     * 如果运单数据不存在，就新增，否则更新数据
     *
     * @param transportOrderId 运单id
     * @param infoDetail       信息详情
     * @return 运输信息数据
     */
    TransportInfoEntity saveOrUpdate(String transportOrderId, TransportInfoDetail infoDetail);

    /**
     * 根据运单id查询运输信息
     *
     * @param transportOrderId 运单id
     * @return 运输信息数据
     */
    TransportInfoEntity queryByTransportOrderId(String transportOrderId);

}
