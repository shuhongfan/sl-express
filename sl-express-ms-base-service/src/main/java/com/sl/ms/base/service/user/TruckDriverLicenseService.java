package com.sl.ms.base.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.user.TruckDriverLicenseEntity;

/**
 * 司机驾驶证表  服务类
 */
public interface TruckDriverLicenseService extends IService<TruckDriverLicenseEntity> {

    /**
     * 获取司机驾驶证信息
     *
     * @param userId 司机id
     * @return 司机驾驶证信息
     */
    TruckDriverLicenseEntity findOne(Long userId);
}
