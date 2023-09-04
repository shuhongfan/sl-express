package com.sl.ms.base.service.base;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.base.entity.base.AreaEntity;

import java.util.List;

/**
 * <p>
 * 业务接口
 * 行政区域
 * </p>
 */
public interface AreaService extends IService<AreaEntity> {

    /**
     * 根据编码查询行政区域
     *
     * @param code 行政编码
     * @return 行政区域
     */
    AreaEntity getByCode(String code);

    /**
     * 根据父级id查询子级行政区域
     *
     * @param parentId 父级id
     * @return 子级行政区域列表
     */
    List<AreaDto> findChildren(Long parentId);

    /**
     * 根据id批量查询
     *
     * @param ids id列表
     * @return 行政区域列表
     */
    List<AreaDto> findBatch(List<Long> ids);
}
