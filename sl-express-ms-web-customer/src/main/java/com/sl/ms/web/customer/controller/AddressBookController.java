package com.sl.ms.web.customer.controller;


import com.sl.ms.user.domain.dto.AddressBookDTO;
import com.sl.ms.web.customer.service.AddressBookService;
import com.sl.ms.web.customer.vo.base.AddressBookVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 地址簿服务
 */
@Slf4j
@Api(tags = "地址簿")
@RestController
@RequestMapping("address")
public class AddressBookController {

    @Resource
    private AddressBookService addressBookService;

    /**
     * 分页查询地址簿
     * @param page 页数
     * @param pageSize 页大小
     * @param keyword 关键词
     * @return 分页结果
     */
    @ApiOperation(value = "地址簿分页查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "当前页数", required = true, example = "1"),
            @ApiImplicitParam(name = "pageSize", value = "每页条数", required = true, example = "10"),
            @ApiImplicitParam(name = "keyword", value = "搜索条件", required = false, example = "17303491111"),
            @ApiImplicitParam(name = "type", value = "地址薄类型 1寄件 2收件", required = false, example = "1")
    })
    @GetMapping("page")
    public R<PageResponse<AddressBookVO>> page(Integer page, Integer pageSize, String keyword, Integer type) {
        // todo
        PageResponse<AddressBookVO> result = addressBookService.page(page, pageSize, keyword, type);
        return R.success(result);
    }

    /**
     * 默认地址簿
     * @return 响应
     */
    @PostMapping("defaultAddress")
    @ApiOperation(value = "默认")
    public R<AddressBookVO> defaultAddress() {
        return R.success(addressBookService.defaultAddress());
    }

    /**
     * 新增
     *
     * @param vo 地址信息
     * @return 响应
     */
    @PostMapping
    @ApiOperation(value = "新增")
    public R<AddressBookVO> save(@RequestBody AddressBookVO vo) {
        return R.success(addressBookService.save(vo));
    }

    /**
     * 修改
     *
     * @param vo 地址信息
     * @return  响应
     */
    @PutMapping("")
    @ApiOperation(value = "修改")
    public R<AddressBookVO> update(@RequestBody AddressBookVO vo) {
        AddressBookVO update = addressBookService.update(vo);
        return R.success(update);
    }

    /**
     * 删除
     *
     * @param ids 地址ID
     * @return 响应
     */
    @DeleteMapping("")
    @ApiOperation(value = "删除")
    public R<Void> del(@RequestBody List<Long> ids) {
        addressBookService.deleteById(ids);
        return R.success();
    }

    /**
     * 详情
     *
     * @param id 地址簿ID
     * @return 地址信息
     */
    @ApiOperation(value = "明细")
    @ApiImplicitParam(name = "id", value = "主键", required = true)
    @GetMapping("detail/{id}")
    public R<AddressBookDTO> detail(@PathVariable(name = "id") Long id) {
        AddressBookDTO addressBook = addressBookService.getById(id);
        return R.success(addressBook);
    }

    /**
     * 保存地址 不同步地址薄
     * 下单地址
     * @param addressBook 地址信息
     */
    @PutMapping("/orderAddress")
    @ApiOperation("下单地址保存")
    public R<Void> saveOrderAddress(@RequestBody AddressBookVO addressBook) {
        addressBookService.saveOrderAddressWithoutBook(addressBook);
        return R.success();
    }
}
