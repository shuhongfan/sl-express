package com.sl.ms.base.mapper.base;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.base.entity.base.MessageEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 消息表 mapper接口
 */
@Mapper
public interface MessageMapper extends BaseMapper<MessageEntity> {

}
