package com.sl.ms.base.service.base;

import com.itheima.auth.sdk.dto.UserDTO;

/**
 * 权限系统对接服务
 */
public interface AuthService {

    /**
     * 根据用户id获得详细信息
     *
     * @param id 用户id
     * @return 用户信息
     */
    UserDTO getByUserId(Long id);
}
