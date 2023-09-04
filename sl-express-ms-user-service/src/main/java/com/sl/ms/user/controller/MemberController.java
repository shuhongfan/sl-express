package com.sl.ms.user.controller;


import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.ms.user.entity.MemberEntity;
import com.sl.ms.user.service.MemberService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 用户表
 */
@Api(tags = "用户")
@Slf4j
@RestController
@RequestMapping("member")
public class MemberController {

    @Resource
    private MemberService memberService;

    /**
     * 分页查询
     *
     * @param page
     * @param pageSize
     * @return
     */
    @ApiOperation(value = "分页查询")
    @GetMapping("page")
    public PageResponse<MemberEntity> page(Integer page, Integer pageSize) {
        Page<MemberEntity> iPage = new Page(page, pageSize);
        LambdaQueryWrapper<MemberEntity> queryWrapper = new LambdaQueryWrapper<>();
        Page<MemberEntity> pageResult = memberService.page(iPage, queryWrapper);

        return PageResponse.<MemberEntity>builder()
                .items(pageResult.getRecords())
                .page(page)
                .pageSize(pageSize)
                .pages(pageResult.getPages())
                .counts(pageResult.getTotal())
                .build();
    }

    /**
     * 新增
     *
     * @param dto
     * @return
     */
    @ApiOperation(value = "新增")
    @PostMapping
    public void save(@RequestBody MemberDTO dto) {
        MemberEntity entity = BeanUtil.toBean(dto, MemberEntity.class);
        memberService.saveOrUpdate(entity);
    }

    /**
     * 修改
     *
     * @param id
     * @param dto
     * @return
     */
    @ApiOperation(value = "更新个人信息")
    @PutMapping("/{id}")
    public void update(@PathVariable(name = "id") Long id, @RequestBody MemberDTO dto) {
        MemberEntity entity = BeanUtil.toBean(dto, MemberEntity.class);
        entity.setId(id);
        memberService.updateById(entity);
    }

    /**
     * 删除
     *
     * @param id
     * @return
     */
    @ApiOperation(value = "解除我的信息")
    @DeleteMapping("/{id}")
    public void del(@PathVariable(name = "id") Long id) {
        memberService.removeById(id);
    }

    /**
     * 详情
     *
     * @param id
     * @return
     */
    @ApiOperation(value = "详情")
    @GetMapping("detail/{id}")
    public MemberDTO detail(@PathVariable(name = "id") Long id) {
        MemberEntity entity = memberService.getById(id);
        return BeanUtil.toBean(entity, MemberDTO.class);
    }

    /**
     * 详情
     *
     * @param openId
     * @return
     */
    @ApiOperation(value = "详情 -openId")
    @GetMapping("openId/{openId}")
    MemberDTO detailByOpenId(@PathVariable(name = "openId") String openId) {
        MemberEntity one = memberService.getOne(Wrappers.<MemberEntity>lambdaQuery().eq(MemberEntity::getOpenId, openId));
        return BeanUtil.toBean(one, MemberDTO.class);
    }
}
