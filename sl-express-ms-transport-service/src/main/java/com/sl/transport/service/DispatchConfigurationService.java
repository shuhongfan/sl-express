package com.sl.transport.service;

import com.sl.transport.domain.DispatchConfigurationDTO;

/**
 * 调度配置相关业务
 *
 * @author zzj
 * @version 1.0
 */
public interface DispatchConfigurationService {
    /**
     * 查询调度配置
     *
     * @return 调度配置
     */
    DispatchConfigurationDTO findConfiguration();

    /**
     * 保存调度配置
     * @param dto 调度配置
     */
    void saveConfiguration(DispatchConfigurationDTO dto);
}
