package com.sl.ms.oms.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.entity.HotGoodEntity;
import com.sl.ms.oms.service.HotGoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 热门货物
 */
@RestController
@RequestMapping("/good")
@Slf4j
public class HotGoodController {

    @Resource
    private HotGoodService hotGoodService;


    /**
     * 批量查询货物信息表
     *
     * @param name 热门货品名称
     * @return 货品信息
     */
    @GetMapping("/hot")
    List<OrderCargoDTO> list(@RequestParam(name = "name", required = false) String name) {
        return hotGoodService.list(Wrappers.<HotGoodEntity>lambdaQuery()
                        .like(ObjectUtil.isNotEmpty(name), HotGoodEntity::getName, name)
                        // 没有名称查询条件 则按照类型分组返回
                        .groupBy(ObjectUtil.isEmpty(name), HotGoodEntity::getGoodsTypeId)
                        .last("limit 20")
                )
                .stream()
                .map(hotGoodEntity -> BeanUtil.toBean(hotGoodEntity, OrderCargoDTO.class))
                .collect(Collectors.toList());
    }

}
