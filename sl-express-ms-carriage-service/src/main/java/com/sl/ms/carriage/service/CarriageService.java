package com.sl.ms.carriage.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.carriage.domain.dto.WaybillDTO;
import com.sl.ms.carriage.entity.CarriageEntity;

import java.util.List;

/**
 * 运费管理表 服务类
 */
public interface CarriageService extends IService<CarriageEntity> {

    /**
     * 新增/修改运费模板
     *
     * @param carriageDto 新增/修改运费对象
     *                    必填字段：templateType、transportType
     *                    更新时传入id字段
     */
    CarriageDTO saveOrUpdate(CarriageDTO carriageDto);

    /**
     * 获取全部运费模板
     *
     * @return 运费模板对象列表
     */
    List<CarriageDTO> findAll();

    /**
     * 运费计算
     *
     * @param waybillDTO 运费计算对象
     * @return 运费模板对象，不仅包含模板数据还包含：computeWeight、expense 字段
     */
    CarriageDTO compute(WaybillDTO waybillDTO);


    /**
     * 根据模板类型查询模板，经济区互寄不通过该方法查询模板
     *
     * @param templateType 模板类型：1-同城寄，2-省内寄，4-跨省
     * @return 运费模板
     */
    CarriageEntity findByTemplateType(Integer templateType);

}
