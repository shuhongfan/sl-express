package com.sl.ms.trade.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.trade.entity.TradingEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 交易订单表Mapper接口
 */
@Mapper
public interface TradingMapper extends BaseMapper<TradingEntity> {

}
