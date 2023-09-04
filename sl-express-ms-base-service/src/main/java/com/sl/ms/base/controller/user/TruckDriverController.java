package com.sl.ms.base.controller.user;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sl.ms.base.domain.user.TruckDriverDto;
import com.sl.ms.base.domain.user.TruckDriverLicenseDto;
import com.sl.ms.base.entity.user.TruckDriverEntity;
import com.sl.ms.base.entity.user.TruckDriverLicenseEntity;
import com.sl.ms.base.service.user.TruckDriverLicenseService;
import com.sl.ms.base.service.user.TruckDriverService;
import com.sl.transport.common.util.PageResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 司机相关
 */
@RestController
@RequestMapping("sys/driver")
public class TruckDriverController {

    @Resource
    private TruckDriverService truckDriverService;
    @Resource
    private TruckDriverLicenseService truckDriverLicenseService;

    /**
     * 保存司机基本信息
     *
     * @param dto 司机基本信息
     * @return 返回信息
     */
    @PostMapping
    public TruckDriverDto saveDriver(@RequestBody TruckDriverDto dto) {
        return truckDriverService.saveDriver(dto);
    }

    /**
     * 获取司机基本信息列表
     *
     * @param userIds 司机id列表
     * @return 司机基本信息列表
     */
    @GetMapping
    public List<TruckDriverDto> findAllDriver(@RequestParam(name = "userIds", required = false) List<Long> userIds) {
        return truckDriverService.findAll(userIds)
                .stream()
                .map(pdTruckDriver -> BeanUtil.toBean(pdTruckDriver, TruckDriverDto.class))
                .collect(Collectors.toList());
    }

    /**
     * 获取司机基本信息
     *
     * @param id 司机id
     * @return 司机基本信息
     */
    @GetMapping("/{id}")
    public TruckDriverDto findOneDriver(@PathVariable(name = "id") Long id) {
        TruckDriverEntity truckDriverEntity = truckDriverService.findOne(id);
        return BeanUtil.toBean(truckDriverEntity, TruckDriverDto.class);
    }

    /**
     * 保存司机驾驶证信息
     *
     * @param dto 司机驾驶证信息
     * @return 返回信息
     */
    @PostMapping("/driverLicense")
    public TruckDriverLicenseDto saveDriverLicense(@RequestBody TruckDriverLicenseDto dto) {
        TruckDriverLicenseEntity driverLicense = BeanUtil.toBean(dto, TruckDriverLicenseEntity.class);
        truckDriverLicenseService.saveOrUpdate(driverLicense);
        BeanUtil.copyProperties(driverLicense, dto);
        return dto;
    }

    /**
     * 获取司机驾驶证信息
     *
     * @param id 司机id
     * @return 司机驾驶证信息
     */
    @GetMapping("/{id}/driverLicense")
    public TruckDriverLicenseDto findOneDriverLicense(@PathVariable(name = "id") Long id) {
        TruckDriverLicenseEntity driverLicense = truckDriverLicenseService.findOne(id);
        return BeanUtil.toBean(driverLicense, TruckDriverLicenseDto.class);
    }

    /**
     * 绑定司机列表
     * @param truckId 车辆ID
     * @return 司机数量
     */
    @GetMapping("/count")
    public List<TruckDriverDto> findByTruckId(@RequestParam(name = "truckId", required = false) Long truckId) {
        return  truckDriverService.findByTruckId(truckId)
                .stream()
                .map(truckDriverEntity -> BeanUtil.toBean(truckDriverEntity, TruckDriverDto.class))
                .collect(Collectors.toList());
    }

    /**
     * 获取司机分页数据
     *
     * @param page     页码
     * @param pageSize 页尺寸
     * @return 司机分页数据
     */
    @GetMapping("/page")
    public PageResponse<TruckDriverDto> findByPage(@RequestParam(name = "page") Integer page,
                                                   @RequestParam(name = "pageSize") Integer pageSize) {
        IPage<TruckDriverEntity> truckPage = truckDriverService.findByPage(page, pageSize);
        List<TruckDriverDto> dtoList = truckPage.getRecords()
                .stream()
                .map(truckDriverEntity -> BeanUtil.toBean(truckDriverEntity, TruckDriverDto.class))
                .collect(Collectors.toList());

        return PageResponse.<TruckDriverDto>builder()
                .items(dtoList)
                .pageSize(pageSize)
                .page(page)
                .counts(truckPage.getTotal())
                .pages(truckPage.getPages()).build();
    }


    @GetMapping("/findAll")
    public List<TruckDriverDto> findAll(@RequestParam(name = "ids", required = false) List<Long> ids) {
        LambdaQueryWrapper<TruckDriverEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(CollUtil.isNotEmpty(ids), TruckDriverEntity::getId, ids);
        return truckDriverService.list(wrapper)
                .stream()
                .map(truckDriver -> BeanUtil.toBean(truckDriver, TruckDriverDto.class))
                .collect(Collectors.toList());
    }

}
