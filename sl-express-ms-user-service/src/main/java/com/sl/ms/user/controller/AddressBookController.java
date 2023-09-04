package com.sl.ms.user.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sl.ms.user.domain.dto.AddressBookDTO;
import com.sl.ms.user.domain.enums.AddressBookShowStatus;
import com.sl.ms.user.entity.AddressBookEntity;
import com.sl.ms.user.service.AddressBookService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * 地址簿
 */
@Api(tags = "地址簿")
@Slf4j
@RestController
@RequestMapping("addressBook")
public class AddressBookController {

    @Resource
    private AddressBookService addressBookService;

    /**
     * 分页查询
     *
     * @param page 页码
     * @param pageSize 页大小
     * @param userId 用户ID
     * @return 地址簿
     */
    @ApiOperation(value = "地址簿分页查询")
    @GetMapping("page")
    public PageResponse<AddressBookEntity> page(Integer page, Integer pageSize, Long userId, String keyword, Integer type) {
        Page<AddressBookEntity> iPage = new Page<>(page, pageSize);
        Page<AddressBookEntity> pageResult = addressBookService.lambdaQuery()
                // 用户ID
                .eq(ObjectUtil.isNotEmpty(userId), AddressBookEntity::getUserId, userId)
                // 地址薄类型
                .eq(ObjectUtil.isNotEmpty(type), AddressBookEntity::getType, type)
                // 是否展示 不同步地址薄的下单地址不展示
                .eq(AddressBookEntity::getIsShow, AddressBookShowStatus.SHOW_STATUS.getCode())
                // 其他关键词
                .and(StrUtil.isNotEmpty(keyword), wrapper ->
                        wrapper.like(AddressBookEntity::getName, keyword).or()
                                .like(AddressBookEntity::getPhoneNumber, keyword).or()
                                .like(AddressBookEntity::getCompanyName, keyword))
                .orderByDesc(AddressBookEntity::getCreated)
                .page(iPage);

        return PageResponse.<AddressBookEntity>builder()
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
     * @param dto 地址簿
     * @return 地址簿
     */
    @ApiOperation(value = "新增")
    @PostMapping
    public AddressBookDTO save(@Valid @RequestBody AddressBookDTO dto) {
        AddressBookEntity entity = BeanUtil.toBean(dto, AddressBookEntity.class);
        if (1 == entity.getIsDefault()) {
            addressBookService.lambdaUpdate()
                    .set(AddressBookEntity::getIsDefault, 0)
                    .eq(AddressBookEntity::getUserId, entity.getUserId())
                    .update();
        }
        addressBookService.save(entity);
        return BeanUtil.toBean(entity, AddressBookDTO.class);
    }

    /**
     * 修改
     *
     * @param id 地址簿ID
     * @param dto 地址簿
     * @return 地址簿
     */
    @ApiOperation(value = "修改")
    @PutMapping("/{id}")
    public AddressBookDTO update(@PathVariable(name = "id") Long id, @RequestBody AddressBookDTO dto) {
        AddressBookEntity entity = BeanUtil.toBean(dto, AddressBookEntity.class);
        entity.setId(id);
        if (1 == entity.getIsDefault()) {
            addressBookService.lambdaUpdate()
                    .set(AddressBookEntity::getIsDefault, 0)
                    .eq(AddressBookEntity::getUserId, entity.getUserId())
                    .update();
        }
        addressBookService.updateById(entity);
        return BeanUtil.toBean(entity, AddressBookDTO.class);
    }

    /**
     * 删除
     *
     * @param id 地址簿ID
     */
    @ApiOperation(value = "删除")
    @DeleteMapping("/{id}")
    public void del(@PathVariable(name = "id") Long id) {
        addressBookService.removeById(id);
    }

    /**
     * 详情
     *
     * @param id 地址簿ID
     * @return 地址簿
     */
    @ApiOperation(value = "明细")
    @ApiImplicitParam(name = "id", value = "主键", required = true)
    @GetMapping("detail/{id}")
    public AddressBookDTO detail(@PathVariable(name = "id") Long id) {
        AddressBookEntity entity = addressBookService.getById(id);
        return BeanUtil.toBean(entity, AddressBookDTO.class);
    }

}
