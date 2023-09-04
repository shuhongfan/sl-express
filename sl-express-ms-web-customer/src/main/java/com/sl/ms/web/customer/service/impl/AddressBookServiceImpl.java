package com.sl.ms.web.customer.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.user.api.AddressBookFeign;
import com.sl.ms.user.domain.dto.AddressBookDTO;
import com.sl.ms.user.domain.enums.AddressBookShowStatus;
import com.sl.ms.web.customer.service.AddressBookService;
import com.sl.ms.web.customer.vo.base.AddressBookVO;
import com.sl.ms.web.customer.vo.base.AreaSimpleVO;
import com.sl.transport.common.util.BeanUtil;
import com.sl.transport.common.util.ObjectUtil;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AddressBookServiceImpl implements AddressBookService {

    @Resource
    private AddressBookFeign addressBookFeign;

    @Resource
    private AreaFeign areaFeign;

    /**
     * 新增地址
     *
     * @param vo 地址信息
     * @return 地址信息
     */
    @Override
    public AddressBookVO save(AddressBookVO vo) {
        AddressBookDTO addressBookDTO = BeanUtil.toBean(vo, AddressBookDTO.class);
        addressBookDTO.setUserId(UserThreadLocal.getUserId());
        if (ObjectUtil.isEmpty(addressBookDTO.getIsDefault())) {
            addressBookDTO.setIsDefault(0);
        }
        AddressBookDTO save = addressBookFeign.save(addressBookDTO);
        return BeanUtil.toBean(save, AddressBookVO.class);
    }

    /**
     * 根据id查询
     *
     * @param id 地址簿ID
     * @return 地址信息
     */
    @Override
    public AddressBookVO getById(Long id) {
        AddressBookDTO addressBook = addressBookFeign.detail(id);
        Set<Long> areaSet = new HashSet<>(Arrays.asList(addressBook.getProvinceId(), addressBook.getCityId(), addressBook.getCountyId()));
        List<AreaDto> result = areaFeign.findBatch(new ArrayList<>(areaSet));
        Map<Long, AreaDto> areaMap = result.stream().collect(Collectors.toMap(AreaDto::getId, area -> area));
        return BeanUtil.toBean(addressBook, AddressBookVO.class, (dto, vo) -> {
            parseDTO2VO(vo, areaMap);
        });
    }

    /**
     * 简要行政机构信息转换
     *
     * @param area 行政机构DTO
     * @return 简要行政机构VO
     */
    public AreaSimpleVO parseArea2Vo(AreaDto area) {
        return BeanUtil.toBean(area, AreaSimpleVO.class);
    }

    /**
     * 转换
     *
     * @param addressBookVO vo
     * @param areaMap       行政机构map
     * @return vo
     */
    private AddressBookVO parseDTO2VO(AddressBookVO addressBookVO, Map<Long, AreaDto> areaMap) {
        addressBookVO.setProvince(parseArea2Vo(areaMap.get(addressBookVO.getProvinceId())));
        addressBookVO.setCity(parseArea2Vo(areaMap.get(addressBookVO.getCityId())));
        addressBookVO.setCounty(parseArea2Vo(areaMap.get(addressBookVO.getCountyId())));
        return addressBookVO;
    }


    /**
     * 根据id修改地址
     *
     * @param vo 地址信息
     * @return 地址信息
     */
    @Override
    public AddressBookVO update(AddressBookVO vo) {
        AddressBookDTO addressBookDTO = BeanUtil.toBean(vo, AddressBookDTO.class);
        //获取userid
        addressBookDTO.setUserId(UserThreadLocal.getUserId());
        if (ObjectUtil.isEmpty(addressBookDTO.getIsDefault())) {
            addressBookDTO.setIsDefault(0);
        }
        AddressBookDTO update = addressBookFeign.update(addressBookDTO.getId(), addressBookDTO);
        return BeanUtil.toBean(update, AddressBookVO.class);
    }

    /**
     * 保存地址 不同步地址薄
     * 下单地址
     *
     * @param vo 地址信息
     */
    @Override
    public void saveOrderAddressWithoutBook(AddressBookVO vo) {
        AddressBookDTO addressBookDTO = BeanUtil.toBean(vo, AddressBookDTO.class);
        addressBookDTO.setIsShow(AddressBookShowStatus.NOT_SHOW_STATUS.getCode());
        addressBookDTO.setUserId(UserThreadLocal.getUserId());
        addressBookFeign.save(addressBookDTO);
    }

    /**
     * 根据id删除地址
     *
     * @param ids 地址簿ID
     */
    @Override
    public void deleteById(List<Long> ids) {
        ids.forEach(id -> addressBookFeign.del(id));
    }

    /**
     * 分页查询地址簿
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param keyword  关键词
     * @param type     地址簿类型  1寄件 2收件
     * @return 分页结果
     */
    @Override
    public PageResponse<AddressBookVO> page(Integer page, Integer pageSize, String keyword, Integer type) {
        //获取userid
        Long userId = UserThreadLocal.getUserId();
        PageResponse<AddressBookDTO> result = addressBookFeign.page(page, pageSize, userId, keyword, type);
        Set<Long> areaSet = new HashSet<>();
        areaSet.addAll(result.getItems().stream().map(AddressBookDTO::getProvinceId).collect(Collectors.toSet()));
        areaSet.addAll(result.getItems().stream().map(AddressBookDTO::getCityId).collect(Collectors.toSet()));
        areaSet.addAll(result.getItems().stream().map(AddressBookDTO::getCountyId).collect(Collectors.toSet()));
        List<AreaDto> areaDtoList = areaFeign.findBatch(new ArrayList<>(areaSet));
        Map<Long, AreaDto> areaMap = areaDtoList.stream().collect(Collectors.toMap(AreaDto::getId, area -> area));

        return PageResponse.of(result, AddressBookVO.class, (dto, vo) -> parseDTO2VO(vo, areaMap));
    }

    /**
     * 默认地址簿
     *
     * @return 响应
     */
    @Override
    public AddressBookVO defaultAddress() {
        PageResponse<AddressBookVO> page = page(0, 100, null, null);
        if (CollUtil.isEmpty(page.getItems())) {
            return null;
        }

        List<AddressBookVO> addressBookVOS = page.getItems().stream().filter(v -> v.getIsDefault().equals(1)).collect(Collectors.toList());
        if (CollUtil.isNotEmpty(addressBookVOS)) {
            return addressBookVOS.get(0);
        }
        return null;
    }
}
