package com.sl.transport.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.sl.transport.domain.DispatchConfigurationDTO;
import com.sl.transport.service.DispatchConfigurationService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 调度服务相关业务
 *
 * @author zzj
 * @version 1.0
 */
@Service
public class DispatchConfigurationServiceImpl implements DispatchConfigurationService {
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 调度时间配置
     */
    static final String DISPATCH_TIME_REDIS_KEY = "DISPATCH_CONFIGURATION:TIME";

    /**
     * 调度方式配置
     */
    static final String DISPATCH_METHOD_REDIS_KEY = "DISPATCH_CONFIGURATION:METHOD";

    @Override
    public DispatchConfigurationDTO findConfiguration() {
        //调度时间配置
        String dispatchTime = stringRedisTemplate.opsForValue().get(DISPATCH_TIME_REDIS_KEY);

        //调度方式配置
        String dispatchMethod = stringRedisTemplate.opsForValue().get(DISPATCH_METHOD_REDIS_KEY);

        //组装响应结果
        return DispatchConfigurationDTO.builder()
                //如果查不到调度时间，默认值为2小时
                .dispatchTime(Integer.parseInt(ObjectUtil.defaultIfBlank(dispatchTime, "2")))
                //如果查不到调度方式，默认值为2成本最低
                .dispatchMethod(Integer.parseInt(ObjectUtil.defaultIfBlank(dispatchMethod, "2")))
                .build();
    }

    @Override
    public void saveConfiguration(DispatchConfigurationDTO dto) {
        //调度时间配置
        stringRedisTemplate.opsForValue().set(DISPATCH_TIME_REDIS_KEY, String.valueOf(dto.getDispatchTime()));

        //调度方式配置
        stringRedisTemplate.opsForValue().set(DISPATCH_METHOD_REDIS_KEY, String.valueOf(dto.getDispatchMethod()));
    }
}
