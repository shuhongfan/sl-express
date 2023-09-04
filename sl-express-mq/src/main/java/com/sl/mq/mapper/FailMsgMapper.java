package com.sl.mq.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.mq.entity.FailMsgEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 失败消息记录mapper
 *
 * @author zzj
 * @version 1.0
 */
@Mapper
public interface FailMsgMapper extends BaseMapper<FailMsgEntity> {
}
