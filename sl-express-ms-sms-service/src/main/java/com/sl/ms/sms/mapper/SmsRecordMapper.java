package com.sl.ms.sms.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.sms.entity.SmsRecordEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 短信发送记录 Mapper 接口
 */
@Mapper
public interface SmsRecordMapper extends BaseMapper<SmsRecordEntity> {
}
