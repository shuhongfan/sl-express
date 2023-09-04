package com.sl.ms.web.customer.service;

import com.sl.ms.web.customer.vo.base.AddressBookVO;
import com.sl.transport.common.util.PageResponse;

import java.util.List;

public interface AddressBookService {

    /**
     * 新增地址
     *
     * @param vo 地址信息
     * @return 地址信息
     */
    AddressBookVO save(AddressBookVO vo);

    /**
     * 根据id查询
     *
     * @param id 地址簿ID
     * @return 地址信息
     */
    AddressBookVO getById(Long id);

    /**
     * 根据id修改地址
     *
     * @param vo 地址信息
     * @return 地址信息
     */
    AddressBookVO update(AddressBookVO vo);

    /**
     * 保存地址 不同步地址薄
     * 下单地址
     *
     * @param vo 地址信息
     */
    void saveOrderAddressWithoutBook(AddressBookVO vo);

    /**
     * 根据id删除地址
     *
     * @param ids 地址簿ID
     */
    void deleteById(List<Long> ids);

    /**
     * 分页查询地址簿
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param keyword  关键词
     * @param type     地址簿类型  1寄件 2收件
     * @return 分页结果
     */
    PageResponse<AddressBookVO> page(Integer page, Integer pageSize, String keyword, Integer type);

    /**
     * 默认地址簿
     *
     * @return 响应
     */
    AddressBookVO defaultAddress();
}
