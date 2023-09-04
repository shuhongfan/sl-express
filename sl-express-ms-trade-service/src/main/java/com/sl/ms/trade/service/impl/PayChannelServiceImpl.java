package com.sl.ms.trade.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.trade.constant.Constants;
import com.sl.ms.trade.domain.PayChannelDTO;
import com.sl.ms.trade.entity.PayChannelEntity;
import com.sl.ms.trade.mapper.PayChannelMapper;
import com.sl.ms.trade.service.PayChannelService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * @Description： 服务实现类
 */
@Service
public class PayChannelServiceImpl extends ServiceImpl<PayChannelMapper, PayChannelEntity> implements PayChannelService {

    @Override
    public Page<PayChannelEntity> findPayChannelPage(PayChannelDTO payChannelDTO, int pageNum, int pageSize) {
        Page<PayChannelEntity> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<PayChannelEntity> queryWrapper = new LambdaQueryWrapper<>();

        //设置条件
        queryWrapper.eq(StrUtil.isNotEmpty(payChannelDTO.getChannelLabel()), PayChannelEntity::getChannelLabel, payChannelDTO.getChannelLabel());
        queryWrapper.likeRight(StrUtil.isNotEmpty(payChannelDTO.getChannelName()), PayChannelEntity::getChannelName, payChannelDTO.getChannelName());
        queryWrapper.eq(StrUtil.isNotEmpty(payChannelDTO.getEnableFlag()), PayChannelEntity::getEnableFlag, payChannelDTO.getEnableFlag());
        //设置排序
        queryWrapper.orderByAsc(PayChannelEntity::getCreated);

        return super.page(page, queryWrapper);
    }

    @Override
    public PayChannelEntity findByEnterpriseId(Long enterpriseId, String channelLabel) {
        LambdaQueryWrapper<PayChannelEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(PayChannelEntity::getEnterpriseId, enterpriseId)
                .eq(PayChannelEntity::getChannelLabel, channelLabel)
                .eq(PayChannelEntity::getEnableFlag, Constants.YES);
        //TODO 缓存
        return super.getOne(queryWrapper);
    }

    @Override
    public PayChannelEntity createPayChannel(PayChannelDTO payChannelDTO) {
        PayChannelEntity payChannel = BeanUtil.toBean(payChannelDTO, PayChannelEntity.class);
        boolean flag = super.save(payChannel);
        if (flag) {
            return payChannel;
        }
        return null;
    }

    @Override
    public Boolean updatePayChannel(PayChannelDTO payChannelDTO) {
        PayChannelEntity payChannel = BeanUtil.toBean(payChannelDTO, PayChannelEntity.class);
        return super.updateById(payChannel);
    }

    @Override
    public Boolean deletePayChannel(String[] checkedIds) {
        List<String> ids = Arrays.asList(checkedIds);
        return super.removeByIds(ids);
    }

    @Override
    public List<PayChannelEntity> findPayChannelList(String channelLabel) {
        LambdaQueryWrapper<PayChannelEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(PayChannelEntity::getChannelLabel, channelLabel)
                .eq(PayChannelEntity::getEnableFlag, Constants.YES);
        return list(queryWrapper);
    }
}
