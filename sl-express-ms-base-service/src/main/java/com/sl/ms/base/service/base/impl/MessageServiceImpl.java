package com.sl.ms.base.service.base.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.domain.base.LatestMessageDTO;
import com.sl.ms.base.domain.base.MessageAddDTO;
import com.sl.ms.base.domain.base.MessageDTO;
import com.sl.ms.base.domain.base.MessageQueryDTO;
import com.sl.ms.base.domain.constants.MessageConstants;
import com.sl.ms.base.entity.base.MessageEntity;
import com.sl.ms.base.mapper.base.MessageMapper;
import com.sl.ms.base.service.base.MessageService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 消息相关业务
 */
@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, MessageEntity> implements MessageService {

    /**
     * 新增消息
     *
     * @param messageAddDTO 消息新增对象
     */
    @Override
    public void add(MessageAddDTO messageAddDTO) {
        MessageEntity entity = BeanUtil.toBean(messageAddDTO, MessageEntity.class);
        entity.setIsRead(MessageConstants.UNREAD);
        entity.setIsDelete(MessageConstants.NOT_DELETED);

        this.save(entity);
    }

    /**
     * 标记已读
     *
     * @param id 消息id
     */
    @Override
    @Transactional(rollbackFor = {SLException.class, Exception.class})
    public void update2Read(Long id) {
        //根据id查询消息是否存在
        MessageEntity entity = this.getById(id);
        if (entity == null) {
            throw new SLException("消息不存在");
        }

        //更新消息已读状态、读时间、更新时间字段
        LambdaUpdateWrapper<MessageEntity> updateWrapper = Wrappers.<MessageEntity>lambdaUpdate()
                .eq(MessageEntity::getId, id)
                .set(MessageEntity::getIsRead, MessageConstants.IS_READ)
                .set(MessageEntity::getReadTime, LocalDateTime.now());
        this.update(updateWrapper);
    }

    /**
     * 批量已读
     *
     * @param ids 消息id列表
     */
    @Override
    public void batchRead(List<Long> ids) {
        //id列表为空则不操作
        if (CollUtil.isEmpty(ids)) {
            return;
        }

        //根据id查询消息对象
        List<MessageEntity> entities = this.listByIds(ids);

        //更新消息已读状态和已读时间
        entities.forEach(message -> {
            message.setIsRead(MessageConstants.IS_READ);
            message.setReadTime(LocalDateTime.now());
        });

        //批量更新
        this.updateBatchById(entities);
    }

    /**
     * 全部已读
     *
     * @param userId      用户id
     * @param contentType 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知
     */
    @Override
    public void readAll(Long userId, Integer contentType) {
        //条件查询未读消息
        LambdaQueryWrapper<MessageEntity> queryWrapper = Wrappers.<MessageEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(userId), MessageEntity::getUserId, userId)
                .eq(ObjectUtil.isNotEmpty(contentType), MessageEntity::getContentType, contentType)
                .eq(MessageEntity::getIsRead, MessageConstants.UNREAD);
        List<MessageEntity> entities = this.list(queryWrapper);
        if (CollUtil.isEmpty(entities)) {
            return;
        }

        //更新消息已读状态、读时间、更新时间字段
        entities.forEach(message -> {
            message.setIsRead(MessageConstants.IS_READ);
            message.setReadTime(LocalDateTime.now());
        });

        //批量更新
        this.updateBatchById(entities);
    }

    /**
     * 查询消息列表
     *
     * @param messageQueryDTO 消息查询对象
     * @return 消息列表
     */
    @Override
    public List<MessageDTO> queryList(MessageQueryDTO messageQueryDTO) {
        //根据功能端、消息类型、用户id、创建时间构造查询条件
        LambdaQueryWrapper<MessageEntity> queryWrapper = Wrappers.<MessageEntity>lambdaQuery()
                .eq(MessageEntity::getBussinessType, messageQueryDTO.getBussinessType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getContentType()), MessageEntity::getContentType, messageQueryDTO.getContentType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getUserId()), MessageEntity::getUserId, messageQueryDTO.getUserId())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getIsRead()), MessageEntity::getIsRead, messageQueryDTO.getIsRead())
                .eq(MessageEntity::getIsDelete, MessageConstants.NOT_DELETED)
                //查询近一个月的消息列表
                .ge(MessageEntity::getCreated, LocalDateTime.now().plusMonths(-1))
                .orderByDesc(MessageEntity::getCreated);

        //判断消息列表是否为空，不为空，将其转换为dto返回
        List<MessageEntity> entityList = this.list(queryWrapper);
        if (CollUtil.isEmpty(entityList)) {
            return Collections.emptyList();
        }

        return entityList.stream().map(message -> BeanUtil.toBean(message, MessageDTO.class)).collect(Collectors.toList());
    }

    /**
     * 根据类型查询消息数量
     *
     * @param messageQueryDTO 消息查询对象
     * @return 消息条数
     */
    @Override
    public Integer countType(MessageQueryDTO messageQueryDTO) {
        //根据功能端、消息类型、用户id、未读状态构造查询条件
        LambdaQueryWrapper<MessageEntity> queryWrapper = Wrappers.<MessageEntity>lambdaQuery()
                .eq(MessageEntity::getBussinessType, messageQueryDTO.getBussinessType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getContentType()), MessageEntity::getContentType, messageQueryDTO.getContentType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getUserId()), MessageEntity::getUserId, messageQueryDTO.getUserId())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getIsRead()), MessageEntity::getIsRead, messageQueryDTO.getIsRead());

        //消息计数
        return (int) this.count(queryWrapper);
    }

    /**
     * 最新消息查询
     *
     * @param messageQueryDTO 消息查询对象
     * @return 最新消息对象
     */
    @Override
    public LatestMessageDTO latestMessage(MessageQueryDTO messageQueryDTO) {
        //根据功能端、消息类型、用户id构造查询条件
        LambdaQueryWrapper<MessageEntity> queryWrapper = Wrappers.<MessageEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getBussinessType()), MessageEntity::getBussinessType, messageQueryDTO.getBussinessType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getContentType()), MessageEntity::getContentType, messageQueryDTO.getContentType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getUserId()), MessageEntity::getUserId, messageQueryDTO.getUserId())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getIsRead()), MessageEntity::getIsRead, messageQueryDTO.getIsRead())
                .orderByDesc(MessageEntity::getCreated)
                .last("LIMIT 1");

        //查询出最近一条消息
        MessageEntity messageEntity = this.getOne(queryWrapper);
        if (ObjectUtil.isEmpty(messageEntity)) {
            return null;
        }

        //entity转为dto
        return BeanUtil.toBean(messageEntity, LatestMessageDTO.class);
    }

    /**
     * 分页查询消息列表
     *
     * @param messageQueryDTO 消息查询对象
     * @return 分页数据
     */
    @Override
    public PageResponse<MessageDTO> pageQuery(MessageQueryDTO messageQueryDTO) {
        //根据功能端、消息类型、用户id、创建时间构造查询条件
        Page<MessageEntity> iPage = new Page<>(messageQueryDTO.getPage(), messageQueryDTO.getPageSize());
        LambdaQueryWrapper<MessageEntity> queryWrapper = Wrappers.<MessageEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getBussinessType()), MessageEntity::getBussinessType, messageQueryDTO.getBussinessType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getContentType()), MessageEntity::getContentType, messageQueryDTO.getContentType())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getUserId()), MessageEntity::getUserId, messageQueryDTO.getUserId())
                .eq(ObjectUtil.isNotEmpty(messageQueryDTO.getIsRead()), MessageEntity::getIsRead, messageQueryDTO.getIsRead())
                //查询近一个月的消息列表
                .ge(MessageEntity::getCreated, LocalDateTime.now().plusMonths(-1))
                .eq(MessageEntity::getIsDelete, MessageConstants.NOT_DELETED)
                .orderByDesc(MessageEntity::getCreated);

        //分页查询
        Page<MessageEntity> pageResult = this.page(iPage, queryWrapper);
        if (ObjectUtil.isEmpty(pageResult.getRecords())) {
            return new PageResponse<>(pageResult);
        }

        //封装分页数据
        return new PageResponse<>(pageResult, MessageDTO.class);
    }
}
