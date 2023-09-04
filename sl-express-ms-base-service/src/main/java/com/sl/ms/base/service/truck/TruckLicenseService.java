package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.truck.TruckLicenseEntity;

/**
 * 车辆行驶证表  服务类
 */
public interface TruckLicenseService extends IService<TruckLicenseEntity> {

    /**
     * 保存车辆行驶证信息
     *
     * @param truckLicenseEntity 车辆行驶证信息
     * @return 车辆行驶证信息
     */
    TruckLicenseEntity saveTruckLicense(TruckLicenseEntity truckLicenseEntity);

}
