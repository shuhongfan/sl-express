package com.sl.ms.web.courier.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.ObjectUtil;
import com.itheima.auth.sdk.dto.UserDTO;
import com.sl.ms.base.api.common.WorkSchedulingFeign;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.enums.WorkUserTypeEnum;
import com.sl.ms.scope.api.ServiceScopeFeign;
import com.sl.ms.scope.dto.ServiceScopeDTO;
import com.sl.ms.web.courier.service.UserService;
import com.sl.ms.web.courier.vo.user.ServiceScopeVO;
import com.sl.ms.web.courier.vo.user.UserSimpleInfoVO;
import com.sl.ms.web.courier.vo.user.UsersInfoVO;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Resource
    private WorkSchedulingFeign workSchedulingFeign;

    @Resource
    private ServiceScopeFeign serviceScopeFeign;

    /**
     * 通过token获取用户信息
     *
     * @return 用户信息
     */
    @Override
    public UsersInfoVO get() {
        //获取快递员详细信息
        UserDTO userDTO = AuthTemplateThreadLocal.get().opsForUser().getUserById(UserThreadLocal.getUserId()).getData();
        WorkSchedulingDTO workSchedulingDTO = workSchedulingFeign.currentSchedule(userDTO.getId());

        //组装vo
        UsersInfoVO vo = BeanUtil.toBean(userDTO, UsersInfoVO.class);
        vo.setPhone(userDTO.getMobile());//手机号码
        vo.setAgencyName(userDTO.getOrgName());//所在网点

        if (ObjectUtil.isNotEmpty(workSchedulingDTO) && ObjectUtil.notEqual(workSchedulingDTO.getWorkPatternId(), 0L)) {
            vo.setStartTime(LocalDateTime.of(LocalDate.now(), LocalTime.MIN).plusMinutes(workSchedulingDTO.getWorkStartMinute1()));//上班时间
            vo.setEndTime(LocalDateTime.of(LocalDate.now(), LocalTime.MIN).plusMinutes(workSchedulingDTO.getWorkEndMinute1()));//下班时间
        }
        return vo;
    }

    /**
     * 查询今天同网点有排班的其他快递员列表
     *
     * @param page     页码
     * @param pageSize 页面大小
     * @param keyword  关键词
     * @return 快递员列表
     */
    @Override
    public PageResponse<UserSimpleInfoVO> sameAgency(Integer page, Integer pageSize, String keyword) {
        //1.获取快递员详细信息
        UserDTO userDTO = AuthTemplateThreadLocal.get().opsForUser().getUserById(UserThreadLocal.getUserId()).getData();
        log.info("快递员详细信息:{}", userDTO);

        //2.获取同网点今天有排班的员工
        List<WorkSchedulingDTO> workSchedulingDTOList = workSchedulingFeign.monthScheduleByAgencyId(userDTO.getOrgId());
        log.info("同网点今天有排班的员工位数:{}", CollUtil.isEmpty(workSchedulingDTOList) ? 0 : workSchedulingDTOList.size());
        if (ObjectUtil.isEmpty(workSchedulingDTOList)) {
            return new PageResponse<>();
        }

        //4.筛选出今天同网点的有排班的其他快递员，并封装为vo
        List<UserSimpleInfoVO> userSimpleInfoVOList = workSchedulingDTOList.stream()
                .filter(x -> ObjectUtil.equal(x.getUserType().intValue(), WorkUserTypeEnum.COURIER.getCode())//快递员角色
                        && ObjectUtil.notEqual(x.getUserId(), userDTO.getId()))//不是当前快递员
                .map(x -> BeanUtil.toBean(x, UserSimpleInfoVO.class))
                .collect(Collectors.toList());
        log.info("今天同网点的有排班的其他快递员位数:{}", CollUtil.isEmpty(userSimpleInfoVOList) ? 0 : userSimpleInfoVOList.size());
        if (ObjectUtil.isEmpty(userSimpleInfoVOList)) {
            return new PageResponse<>();
        }

        //5.根据关键词筛选
        if (CharSequenceUtil.isNotBlank(keyword)) {
            userSimpleInfoVOList = userSimpleInfoVOList.stream()
                    .filter(x -> x.getEmployeeNumber().contains(keyword)
                            || x.getName().contains(keyword))
                    .collect(Collectors.toList());
        }

        //6.进行分页
        int startPosition = (page - 1) * pageSize;//起始位置
        long pageCounts = userSimpleInfoVOList.size();//总条目数
        long pages = (long) Math.ceil(pageCounts * 1.0 / pageSize);//总页数
        //6.1根据起始位置和页面大小取当前页面数据列表
        userSimpleInfoVOList = userSimpleInfoVOList.stream()
                .skip(startPosition)
                .limit(pageSize)
                .collect(Collectors.toList());

        //6.2.返回分页结果
        return PageResponse.<UserSimpleInfoVO>builder()
                .items(userSimpleInfoVOList)//数据列表
                .pages(pages)//总条目数
                .counts(pageCounts)//总页数
                .build();
    }

    /**
     * 获取作业范围
     *
     * @return 作业范围数据
     */
    @Override
    public ServiceScopeVO findScope() {
        ServiceScopeDTO serviceScopeDTO = serviceScopeFeign.queryServiceScope(UserThreadLocal.getUserId(), 2);
        return BeanUtil.toBean(serviceScopeDTO, ServiceScopeVO.class);
    }
}
