package com.sl.ms.carriage.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.EnumUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.carriage.domain.constant.CarriageConstant;
import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.carriage.domain.dto.WaybillDTO;
import com.sl.ms.carriage.domain.enums.EconomicRegionEnum;
import com.sl.ms.carriage.entity.CarriageEntity;
import com.sl.ms.carriage.enums.CarriageExceptionEnum;
import com.sl.ms.carriage.mapper.CarriageMapper;
import com.sl.ms.carriage.service.CarriageService;
import com.sl.ms.carriage.utils.CarriageUtils;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.ObjectUtil;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarriageServiceImpl extends ServiceImpl<CarriageMapper, CarriageEntity> implements CarriageService {

    @Resource
    private AreaFeign areaFeign;

    private CarriageEntity carriageEntity;

    /**
     * 新增/修改运费模板
     *
     * @param carriageDto 新增/修改运费对象
     *                    必填字段：templateType、transportType
     *                    更新时传入id字段
     */
    @Override
    public CarriageDTO saveOrUpdate(CarriageDTO carriageDto) {
//        校验运费模板是否存在，如果不存在直接插入（查询条件：模板类型  运输类型  如果是修改排除当前id）
        LambdaQueryWrapper<CarriageEntity> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(CarriageEntity::getTemplateType, carriageDto.getTemplateType());
        queryWrapper.eq(CarriageEntity::getTransportType, carriageDto.getTransportType());
        queryWrapper.ne(ObjectUtils.isNotEmpty(carriageDto.getId()), CarriageEntity::getId, carriageDto.getId());

        List<CarriageEntity> carriageEntityList = super.list(queryWrapper);

//        如果没有重复的模板，可以直接插入或更新操作（DTo转entity 保存成功 entity转DTO）
        if (CollUtil.isEmpty(carriageEntityList)) {
            return saveOrUpdateCarriage(carriageDto);
        }

//        如果存在重复模板，需要判断此次插入的是否为经济区互寄，非经济区互寄不可以重复
        if (ObjectUtil.notEqual(carriageDto.getTemplateType(), CarriageConstant.ECONOMIC_ZONE)) {
            throw new SLException(CarriageExceptionEnum.NOT_ECONOMIC_ZONE_REPEAT);
        }

//        如果是京经济区互寄类型，需要进一步判断关联城市是否重复，通过集合取交集判断是否重复
        List<String> associatedCityList = carriageEntityList.stream().map(CarriageEntity::getAssociatedCity)
                .map(associatedCity -> StrUtil.splitToArray(associatedCity, ","))
                .flatMap(Arrays::stream)
                .collect(Collectors.toList());
        Collection<String> intersection = CollUtil.intersection(associatedCityList, carriageDto.getAssociatedCityList());
        if (CollUtil.isNotEmpty(intersection)) {
            throw new SLException(CarriageExceptionEnum.ECONOMIC_ZONE_CITY_REPEAT);
        }

//        如果没有重复，可以新增或更新（DTO转Entity 保存成功 entity转DTO）
        return saveOrUpdateCarriage(carriageDto);
    }

    private CarriageDTO saveOrUpdateCarriage(CarriageDTO carriageDto) {
        CarriageEntity carriageEntity = CarriageUtils.toEntity(carriageDto);
        super.saveOrUpdate(carriageEntity);
        return CarriageUtils.toDTO(carriageEntity);
    }

    /**
     * 获取全部运费模板
     *
     * @return 运费模板对象列表
     */
    @Override
    public List<CarriageDTO> findAll() {
//        构造查询条件，按创建时间倒叙
        LambdaQueryWrapper<CarriageEntity> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.orderByDesc(CarriageEntity::getCreated);

//        查询数据库
        List<CarriageEntity> list = super.list(queryWrapper);

//        将结果转换为DTO类型，使用CarriageUtils工具类
        return list.stream().map(CarriageUtils::toDTO).collect(Collectors.toList());
    }

    /**
     * 运费计算
     *
     * @param waybillDTO 运费计算对象
     * @return 运费模板对象，不仅包含模板数据还包含：computeWeight、expense 字段
     */
    @Override
    public CarriageDTO compute(WaybillDTO waybillDTO) {
//        根据参数查找运费模板 调用findCarriage方法
        CarriageEntity carriage = findCarriage(waybillDTO);

//        计算重量，最小重量为1KG，调用getComputedWeight方法
        double computeWeight = getComputeWeight(waybillDTO, carriage);

//        计算运费  运费=首重价格 + （实际重量 - 1） * 续重加格
        double price = carriage.getFirstWeight() + (computeWeight - 1) * carriage.getContinuousWeight();

//        结果保留一位小数
        BigDecimal expense = NumberUtil.round(price, 1);

//        封装运费和计算重量到CarriageDTO，并返回
        CarriageDTO carriageDTO = CarriageUtils.toDTO(carriage);
        carriageDTO.setExpense(expense.doubleValue());
        carriageDTO.setComputeWeight(computeWeight);

        return carriageDTO;
    }

    /**
     * 计算重量
     * @param waybillDTO
     * @param carriage
     * @return
     */
    private double getComputeWeight(WaybillDTO waybillDTO, CarriageEntity carriage) {
//        计算体积,如果传入体积则不需要计算
        Integer volume = waybillDTO.getVolume();
        if (ObjectUtil.isEmpty(volume)) {
            try {
                volume = waybillDTO.getMeasureHigh() * waybillDTO.getMeasureLong() * waybillDTO.getMeasureWidth();
            } catch (Exception e) {
                volume = 0;
            }
        }

//        计算体积重量 = 体积 / 轻抛系数 tips:使用NumberUtil工具类计算 保留一位小数
        BigDecimal volumeWeight = NumberUtil.div(volume, carriage.getLightThrowingCoefficient(), 1);

//        重量取最大值 = 体积重量和实际重量 tips:使用NumberUtil工具类计算 保留一位小数
        double computeWeight = NumberUtil.max(volumeWeight, NumberUtil.round(waybillDTO.getWeight(), 1)).doubleValue();

//        计算续重,规则:不满1kg,按1kg计费
        if (computeWeight <= 1) {
            return 1;
        }

//        10KG一下续重以0.1kg计量保留1位小数
        if (computeWeight <= 10) {
            return computeWeight;
        }

//        100KG 以上四舍五入取整,举例108.4kg按照108收费  108.5kg 按照109KG收费
//        tips:使用NumberUtil工具类计算
        if (computeWeight >= 100) {
            return NumberUtil.round(computeWeight, 0).doubleValue();
        }

//        10-100kg续重以0.5kg计量保留1位小数
        int intValue = NumberUtil.round(computeWeight, 0, RoundingMode.DOWN).intValue();

//        0.5为一个计量单位,举例:18.8kg按照19收费,18.4kg按照18.5收费,18.1kg按照18.5kg收费
        double sub = NumberUtil.sub(computeWeight, intValue);
        if (sub == 0) {
            return intValue;
        }
        if (sub < 0.5) {
            return NumberUtil.add(intValue, 0.5);
        }
        return NumberUtil.add(intValue, 0.5);
    }

    /**
     * 根据参数查找运费模板
     * @param waybillDTO
     * @return
     */
    private CarriageEntity findCarriage(WaybillDTO waybillDTO) {
        Long senderCityId = waybillDTO.getSenderCityId();
        Long receiverCityId = waybillDTO.getReceiverCityId();

//        如果 发件的城市id 和 收件的城市id相同，查询同城模板 调用findByTemplateType方法
        if (ObjectUtil.equal(senderCityId, receiverCityId)) {
            CarriageEntity carriageEntity = findByTemplateType(CarriageConstant.SAME_CITY);
            if (ObjectUtil.isNotEmpty(carriageEntity)) {
                return carriageEntity;
            }
        }

//        如果没有查到或不是同城，则获取收寄地址同省id，使用AreaFeign结构查询
        Long senderProvinceId = areaFeign.get(senderCityId).getParentId();
        Long receiverProvinceId = areaFeign.get(receiverCityId).getParentId();

//        如果 收发件的省份id相同，查询同省的模板，调用findByTemplate方法
        if (ObjectUtil.equal(senderProvinceId, receiverProvinceId)) {
            CarriageEntity carriageEntity = findByTemplateType(CarriageConstant.SAME_PROVINCE);
            if (ObjectUtil.isNotEmpty(carriageEntity)) {
                return carriageEntity;
            }
        }

//        如果没有查到或不是同省，则查询是否为经济区互寄  调用findEconomicCarriage方法查询
        CarriageEntity carriageEntity = findEconomicCarriage(senderProvinceId, receiverProvinceId);
        if (ObjectUtil.isNotEmpty(carriageEntity)) {
            return carriageEntity;
        }

//        如果没有查到或不是经济区互寄，直接查跨省运费模板
        carriageEntity = findByTemplateType(CarriageConstant.TRANS_PROVINCE);
        if (ObjectUtil.isNotEmpty(carriageEntity)) {
            return carriageEntity;
        }

//        如果最后没有查到，直接抛自定义异常，提示模板未找到
        throw new SLException(CarriageExceptionEnum.NOT_FOUND);
    }

    /**
     * 查询是否为经济区互寄
     * @param senderProvinceId
     * @param receiverProvinceId
     * @return
     */
    private CarriageEntity findEconomicCarriage(Long senderProvinceId, Long receiverProvinceId) {
//        通过工具类EnumUtil 获取经济区城市配置枚举
        LinkedHashMap<String, EconomicRegionEnum> enumMap = EnumUtil.getEnumMap(EconomicRegionEnum.class);

//        遍历所有经济区枚举值
        EconomicRegionEnum economicRegionEnum = null;
        for (EconomicRegionEnum regionEnum : enumMap.values()) {
//            通过ArrayUtil工具类  判断发件网点 和 收件网点是否在同一经济区
            boolean containsAll = ArrayUtil.containsAll(regionEnum.getValue(), receiverProvinceId, senderProvinceId);

//            如果在得到对应经济区枚举
            if (containsAll) {
                economicRegionEnum = regionEnum;
                break;
            }
        }
//            循环遍历未发现所属经济区，方法直接返回null
        if (ObjectUtil.isNull(economicRegionEnum)) {
            return null;
        }

//            如果有经济区 根据  模板类型=经济区，运输类型=普快  关联城市=枚举的code值 查询
        LambdaQueryWrapper<CarriageEntity> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(CarriageEntity::getTemplateType, CarriageConstant.ECONOMIC_ZONE);
        queryWrapper.eq(CarriageEntity::getTransportType, economicRegionEnum.getCode());
        return super.getOne(queryWrapper);
    }


    /**
     * 根据模板类型查询模板，经济区互寄不通过该方法查询模板
     *
     * @param templateType 模板类型：1-同城寄，2-省内寄，4-跨省
     * @return 运费模板
     */
    @Override
    public CarriageEntity findByTemplateType(Integer templateType) {
//        根据模板类型，及运输类型 = CarriageConst.REGULAR_FAST查询模板
        LambdaQueryWrapper<CarriageEntity> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(CarriageEntity::getTemplateType, templateType);
        queryWrapper.eq(CarriageEntity::getTransportType, CarriageConstant.REGULAR_FAST);
        return super.getOne(queryWrapper);
    }
}
