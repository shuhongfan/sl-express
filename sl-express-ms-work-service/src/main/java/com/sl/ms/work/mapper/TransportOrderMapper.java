package com.sl.ms.work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.work.domain.dto.response.TransportOrderStatusCountDTO;
import com.sl.ms.work.entity.TransportOrderEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 运单表 Mapper 接口
 */
@Mapper
public interface TransportOrderMapper extends BaseMapper<TransportOrderEntity> {

    /**
     * 统计各个状态的数量
     *
     * @return 状态 -> 数量
     */
    List<TransportOrderStatusCountDTO> findStatusCount();
}
