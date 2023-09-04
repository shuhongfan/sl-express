package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.entity.truck.TruckEntity;
import com.sl.ms.base.entity.truck.TruckLicenseEntity;
import com.sl.ms.base.mapper.truck.TruckLicenseMapper;
import com.sl.ms.base.service.truck.TruckLicenseService;
import com.sl.ms.base.service.truck.TruckService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * 车辆行驶证表  服务类
 */
@Service
public class TruckLicenseServiceImpl extends ServiceImpl<TruckLicenseMapper, TruckLicenseEntity> implements TruckLicenseService {

    @Resource
    private TruckService truckService;

    /**
     * 保存车辆行驶证信息
     *
     * @param truckLicenseEntity 车辆行驶证信息
     * @return 车辆行驶证信息
     */
    @Transactional
    @Override
    public TruckLicenseEntity saveTruckLicense(TruckLicenseEntity truckLicenseEntity) {
        if (truckLicenseEntity.getId() == null) {
            super.save(truckLicenseEntity);
            // 处理车辆信息中的关联字段
            if (ObjectUtil.isNotEmpty(truckLicenseEntity.getTruckId())) {
                TruckEntity truckEntity = truckService.getById(truckLicenseEntity.getTruckId());
                truckEntity.setTruckLicenseId(truckLicenseEntity.getId());
                truckService.updateById(truckEntity);
            }
        } else {
            super.updateById(truckLicenseEntity);
        }
        return truckLicenseEntity;
    }
}
