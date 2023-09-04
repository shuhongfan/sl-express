package com.sl.ms.oms.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.oms.entity.OrderEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单状态  Mapper 接口
 */
@Mapper
public interface OrderMapper extends BaseMapper<OrderEntity> {

}
