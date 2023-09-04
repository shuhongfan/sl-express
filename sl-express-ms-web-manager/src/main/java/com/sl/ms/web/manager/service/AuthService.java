package com.sl.ms.web.manager.service;

import com.itheima.auth.sdk.dto.LoginDTO;
import com.itheima.auth.sdk.dto.LoginParamDTO;
import com.itheima.auth.sdk.dto.UserDTO;
import com.sl.ms.web.manager.vo.auth.CourierVO;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 鉴权服务
 */
@SuppressWarnings("ALL")
public interface AuthService {
    /**
     * 登录获取token
     *
     * @param account  账号
     * @param password 密码
     * @return 登录信息
     */
    R<LoginDTO> login(String account, String password);

    /**
     * 生成验证码
     *
     * @param key      验证码 uuid
     * @param response HttpServletResponse
     * @throws IOException
     */
    void create(String key, HttpServletResponse response) throws IOException;

    /**
     * 校验验证码
     *
     * @param key   前端上送 key
     * @param value 前端上送待校验值
     * @return 通过
     */
    boolean check(String key, String value);

    /**
     * 转换用户
     *
     * @param userDTO 用户DTO
     * @return 用户VO
     */
    SysUserVO parseUser2Vo(UserDTO userDTO);

    /**
     * 获取用户信息
     *
     * @param id 用户id
     * @return 执行结果
     */
    SysUserVO user(Long id);

    /**
     * 批量获取用户信息
     *
     * @param ids 用户id
     * @return 执行结果
     */
    List<SysUserVO> users(List<Long> ids);

    /**
     * 员工分页
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param agencyId 机构ID
     * @return 员工列表
     */
    PageResponse<SysUserVO> findUserByPage(Integer page,
                                           Integer pageSize,
                                           Long agencyId,
                                           String account,
                                           String name,
                                           String mobile);


    /**
     * 快递员分页
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param name     名称
     * @param mobile   手机号
     * @return 快递员列表
     */
    PageResponse<SysUserVO> findCourierByPage(Integer page,
                                              Integer pageSize,
                                              String name,
                                              String mobile,
                                              String account,
                                              Long orgId);


    /**
     * 根据机构查询快递员
     *
     * @param agencyId 机构id
     * @return 快递员列表
     */
    List<CourierVO> findByAgencyId(Long agencyId);

    /**
     * 登录
     * @param login 用户登录信息
     * @return 登录结果
     */
    R<LoginDTO> login(LoginParamDTO login);
}
