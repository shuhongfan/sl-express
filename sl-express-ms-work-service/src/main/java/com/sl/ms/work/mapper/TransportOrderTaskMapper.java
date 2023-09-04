package com.sl.ms.work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.work.entity.TransportOrderTaskEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 运单与运输任务表 Mapper 接口
 */
@Mapper
public interface TransportOrderTaskMapper extends BaseMapper<TransportOrderTaskEntity> {
}
