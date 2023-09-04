package com.sl.ms.base.mapper.base;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WorkSchedulingMapper extends BaseMapper<WorkSchedulingEntity> {

    void batchInsert(@Param("entities") List<WorkSchedulingEntity> workSchedulingEntities);
}
