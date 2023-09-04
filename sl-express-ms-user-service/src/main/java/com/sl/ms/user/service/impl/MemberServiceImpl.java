package com.sl.ms.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.user.entity.MemberEntity;
import com.sl.ms.user.mapper.MemberMapper;
import com.sl.ms.user.service.MemberService;
import org.springframework.stereotype.Service;


/**
 * 用户表  服务类实现
 */
@Service
public class MemberServiceImpl extends ServiceImpl<MemberMapper, MemberEntity>
        implements MemberService {

}
