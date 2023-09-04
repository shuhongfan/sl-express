package com.sl.ms.web.courier.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.sl.ms.base.api.common.MessageFeign;
import com.sl.ms.base.domain.base.LatestMessageDTO;
import com.sl.ms.base.domain.base.MessageDTO;
import com.sl.ms.base.domain.base.MessageQueryDTO;
import com.sl.ms.base.domain.constants.MessageConstants;
import com.sl.ms.base.domain.enums.MessageBussinessTypeEnum;
import com.sl.ms.base.domain.enums.MessageContentTypeEnum;
import com.sl.ms.web.courier.service.MessageService;
import com.sl.ms.web.courier.vo.message.MessageQueryVO;
import com.sl.ms.web.courier.vo.message.MessageVO;
import com.sl.ms.web.courier.vo.message.MessagesHomeVO;
import com.sl.ms.web.courier.vo.message.NewNoticeInfoVO;
import com.sl.ms.work.api.PickupDispatchTaskFeign;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    @Resource
    private MessageFeign messageFeign;
    @Resource
    private PickupDispatchTaskFeign pickupDispatchTaskFeign;

    /**
     * 首页相关消息
     *
     * @return 首页消息对象
     */
    @Override
    public MessagesHomeVO homeMessage() {
        MessagesHomeVO messagesHomeVO = new MessagesHomeVO();

        //构件查询条件
        MessageQueryDTO messageQueryDTO = new MessageQueryDTO();
        messageQueryDTO.setBussinessType(MessageBussinessTypeEnum.COURIER.getCode());
        messageQueryDTO.setUserId(UserThreadLocal.get().getUserId());
        messageQueryDTO.setIsRead(MessageConstants.UNREAD);

        //查询未读消息数量
        Integer noReadRes = messageFeign.countType(messageQueryDTO);
        messagesHomeVO.setUnRead(ObjectUtil.notEqual(noReadRes, 0));
        messagesHomeVO.setNewsNum(noReadRes);

        //查询最新未读消息
        if (ObjectUtil.equal(noReadRes, 0)) {
            return messagesHomeVO;
        }

        LatestMessageDTO latestMessageDTO = messageFeign.latestMessage(messageQueryDTO);
        messagesHomeVO.setMinutes((int) Duration.between(latestMessageDTO.getCreated(), LocalDateTime.now()).toMinutes());
        messagesHomeVO.setContentType(latestMessageDTO.getContentType());
        assembleRecentMsg(messagesHomeVO, latestMessageDTO.getContentType());
        return messagesHomeVO;
    }

    /**
     * 封装消息类型对应的内容
     *
     * @param messagesHomeVO 首页消息相关模型
     * @param contentType    消息类型
     */
    private static void assembleRecentMsg(MessagesHomeVO messagesHomeVO, Integer contentType) {
        switch (MessageContentTypeEnum.codeOf(contentType)) {
            //公告消息
            case COURIER_BULLETIN:
                messagesHomeVO.setRecentMsg(MessageConstants.MessageTitle.BULLETIN);
                break;
            //取件消息
            case COURIER_PICKUP:
                messagesHomeVO.setRecentMsg(MessageConstants.MessageTitle.PICKUP);
                break;
            //签收相关消息
            case COURIER_SIGN:
                messagesHomeVO.setRecentMsg(MessageConstants.MessageTitle.SIGN);
                break;
            //快件取消相关消息
            case COURIER_CANCEL:
                messagesHomeVO.setRecentMsg(MessageConstants.MessageTitle.CANCEL);
                break;
            //派件相关消息
            case COURIER_DISPATCH:
                messagesHomeVO.setRecentMsg(MessageConstants.MessageTitle.DISPATCH);
                break;
            default:
                throw new SLWebException("Unexpected value: " + contentType);
        }
    }

    /**
     * 获取新系统通知信息
     *
     * @return 新系统通知消息
     */
    @Override
    public NewNoticeInfoVO notice() {
        //统计未读消息
        NewNoticeInfoVO newNoticeInfoVO = this.unreadMessageStatistics();

        //构件查询条件
        MessageQueryDTO dto = new MessageQueryDTO();
        dto.setUserId(UserThreadLocal.getUserId());
        dto.setBussinessType(MessageBussinessTypeEnum.COURIER.getCode());

        //获取寄件相关最新消息
        dto.setContentType(MessageContentTypeEnum.COURIER_PICKUP.getCode());
        LatestMessageDTO pickupDTO = messageFeign.latestMessage(dto);

        //获取签收相关最新消息
        dto.setContentType(MessageContentTypeEnum.COURIER_SIGN.getCode());
        LatestMessageDTO signDTO = messageFeign.latestMessage(dto);

        //获取快件取消相关最新消息
        dto.setContentType(MessageContentTypeEnum.COURIER_CANCEL.getCode());
        LatestMessageDTO cancelDTO = messageFeign.latestMessage(dto);

        //获取派件相关最新消息
        dto.setContentType(MessageContentTypeEnum.COURIER_DISPATCH.getCode());
        LatestMessageDTO dispatchDTO = messageFeign.latestMessage(dto);

        //组装最新消息时间
        newNoticeInfoVO.setNewSendNoticeTime(ObjectUtil.isNotEmpty(pickupDTO) ? pickupDTO.getCreated() : null);
        newNoticeInfoVO.setNewReceiveNoticeTime(ObjectUtil.isNotEmpty(signDTO) ? signDTO.getCreated() : null);
        newNoticeInfoVO.setNewCancelNoticeTime(ObjectUtil.isNotEmpty(cancelDTO) ? cancelDTO.getCreated() : null);
        newNoticeInfoVO.setNewDispatchNoticeTime(ObjectUtil.isNotEmpty(dispatchDTO) ? dispatchDTO.getCreated() : null);
        return newNoticeInfoVO;
    }

    /**
     * 按照消息类型统计未读消息数量
     *
     * @return 未读消息通知
     */
    private NewNoticeInfoVO unreadMessageStatistics() {
        //1.构建查询条件
        MessageQueryDTO dto = new MessageQueryDTO();
        dto.setUserId(UserThreadLocal.getUserId());
        dto.setBussinessType(MessageBussinessTypeEnum.COURIER.getCode());
        dto.setIsRead(MessageConstants.UNREAD);

        //2.分页查询
        List<MessageDTO> list = messageFeign.list(dto);

        //3.组装新未读消息数据
        NewNoticeInfoVO newNoticeInfoVO = new NewNoticeInfoVO();
        if (ObjectUtil.isNotEmpty(list)) {
            //按照消息类型统计数量
            Map<Integer, Long> contentTypeMap = list.stream().collect(Collectors.groupingBy(MessageDTO::getContentType, Collectors.counting()));

            newNoticeInfoVO.setHaveNewSendNotice(convertLong2Int(contentTypeMap.get(MessageContentTypeEnum.COURIER_PICKUP.getCode())) > 0);
            newNoticeInfoVO.setHaveNewReceiveNotice(convertLong2Int(contentTypeMap.get(MessageContentTypeEnum.COURIER_SIGN.getCode())) > 0);
            newNoticeInfoVO.setHaveNewCancelNotice(convertLong2Int(contentTypeMap.get(MessageContentTypeEnum.COURIER_CANCEL.getCode())) > 0);
            newNoticeInfoVO.setHaveNewDispatchNotice(convertLong2Int(contentTypeMap.get(MessageContentTypeEnum.COURIER_DISPATCH.getCode())) > 0);
        }
        return newNoticeInfoVO;
    }

    /**
     * 类型转换：Long-->int
     *
     * @param number Long类型
     * @return int类型
     */
    private int convertLong2Int(Long number) {
        return Math.toIntExact(number == null ? 0 : number);
    }

    /**
     * 标记已读
     *
     * @param id 消息id
     */
    @Override
    public void update2Read(Long id) {
        messageFeign.update2Read(id);
    }

    /**
     * 全部已读
     *
     * @param contentType 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，304派件消息
     */
    @Override
    public void readAll(Integer contentType) {
        Long userId = UserThreadLocal.get().getUserId();
        messageFeign.readAll(userId, contentType);
    }

    /**
     * 分页查询消息列表
     *
     * @param messageQueryVO 消息查询对象
     * @return 分页数据
     */
    @Override
    public PageResponse<MessageVO> page(MessageQueryVO messageQueryVO) {
        //1.构造查询条件
        MessageQueryDTO messageQueryDTO = BeanUtil.toBean(messageQueryVO, MessageQueryDTO.class);
        messageQueryDTO.setBussinessType(MessageBussinessTypeEnum.COURIER.getCode());
        messageQueryDTO.setUserId(UserThreadLocal.getUserId());

        //2.分页查询
        PageResponse<MessageDTO> pageResponse = messageFeign.page(messageQueryDTO);
        if (ObjectUtil.isEmpty(pageResponse.getItems())) {
            return new PageResponse<>();
        }

        //3.组装分页结果
        return PageResponse.of(pageResponse, MessageVO.class);
    }
}
