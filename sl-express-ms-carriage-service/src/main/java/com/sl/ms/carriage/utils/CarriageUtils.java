package com.sl.ms.carriage.utils;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.carriage.entity.CarriageEntity;

import java.util.List;

/**
 * 运费模板工具类
 */
public class CarriageUtils {

    private CarriageUtils() {

    }

    public static CarriageEntity toEntity(CarriageDTO carriageDTO) {
        CarriageEntity carriage = BeanUtil.toBean(carriageDTO, CarriageEntity.class);
        //关联城市以逗号分割存储到数据库
        String associatedCity = CollUtil.join(carriageDTO.getAssociatedCityList(), ",");
        carriage.setAssociatedCity(associatedCity);
        return carriage;
    }

    public static CarriageDTO toDTO(CarriageEntity carriage) {
        CarriageDTO carriageDTO = BeanUtil.toBean(carriage, CarriageDTO.class);
        //按照逗号分割成集合放入DTO对象中
        List<String> associatedCityList = StrUtil.split(carriage.getAssociatedCity(), ',');
        carriageDTO.setAssociatedCityList(associatedCityList);
        return carriageDTO;
    }
}
