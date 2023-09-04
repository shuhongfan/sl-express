package com.sl.ms.web.manager.service;

import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.web.manager.vo.carriage.CarriageVO;

import java.util.List;

/**
 * 运费服务相关
 */
public interface CarriageService {
    /**
     * 查询所有运费模板
     *
     * @return 运费模板列表
     */
    List<CarriageVO> findAll();

    /**
     * 新增/修改运费模板
     *
     * @param carriageDto 源运费模板对象
     * @return 新增或修改后的运费模板对象
     */
    CarriageVO saveOrUpdate(CarriageDTO carriageDto);

    /**
     * 删除运费模板
     *
     * @param id 运费模板id
     */
    void delete(Long id);
}
