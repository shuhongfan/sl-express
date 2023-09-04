package com.sl.ms.trade.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.trade.domain.PayChannelDTO;
import com.sl.ms.trade.entity.PayChannelEntity;

import java.util.List;

/**
 * @Description： 支付通道服务类
 */
public interface PayChannelService extends IService<PayChannelEntity> {

    /**
     * @param payChannelDTO 查询条件
     * @param pageNum       当前页
     * @param pageSize      当前页
     * @return Page<PayChannel> 分页对象
     * @Description 支付通道列表
     */
    Page<PayChannelEntity> findPayChannelPage(PayChannelDTO payChannelDTO, int pageNum, int pageSize);

    /**
     * 根据商户id查询渠道配置，该配置会被缓存10分钟
     *
     * @param enterpriseId 商户id
     * @param channelLabel 通道唯一标记
     * @return PayChannelEntity 交易渠道对象
     */
    PayChannelEntity findByEnterpriseId(Long enterpriseId, String channelLabel);

    /**
     * @param payChannelDTO 对象信息
     * @return PayChannelEntity 交易渠道对象
     * @Description 创建支付通道
     */
    PayChannelEntity createPayChannel(PayChannelDTO payChannelDTO);

    /**
     * @param payChannelDTO 对象信息
     * @return Boolean 是否成功
     * @Description 修改支付通道
     */
    Boolean updatePayChannel(PayChannelDTO payChannelDTO);

    /**
     * @param checkedIds 选择的支付通道ID
     * @return Boolean 是否成功
     * @Description 删除支付通道
     */
    Boolean deletePayChannel(String[] checkedIds);

    /**
     * @param channelLabel 支付通道标识
     * @return 支付通道列表
     * @Description 查找渠道标识
     */
    List<PayChannelEntity> findPayChannelList(String channelLabel);
}
