package com.sl.ms.sms.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.sms.entity.SmsThirdChannelEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 三方平台发送通道mapper接口
 */
@Mapper
public interface SmsThirdChannelMapper extends BaseMapper<SmsThirdChannelEntity> {
}
