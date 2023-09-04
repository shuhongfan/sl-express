package com.sl.ms.scope.service;

import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;

import java.util.List;

/**
 * 服务范围Service
 */
public interface ScopeService {

    /**
     * 新增或更新服务范围
     *
     * @param bid     业务id
     * @param type    类型
     * @param polygon 多边形坐标点
     * @return 是否成功
     */
    Boolean saveOrUpdate(Long bid, ServiceTypeEnum type, GeoJsonPolygon polygon);

    /**
     * 根据主键id删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    Boolean delete(String id);

    /**
     * 根据业务id和类型删除数据
     *
     * @param bid  业务id
     * @param type 类型
     * @return 是否成功
     */
    Boolean delete(Long bid, ServiceTypeEnum type);

    /**
     * 根据主键查询数据
     *
     * @param id 主键
     * @return 服务范围数据
     */
    ServiceScopeEntity queryById(String id);

    /**
     * 根据业务id和类型查询数据
     *
     * @param bid  业务id
     * @param type 类型
     * @return 服务范围数据
     */
    ServiceScopeEntity queryByBidAndType(Long bid, ServiceTypeEnum type);

    /**
     * 根据坐标点查询所属的服务对象
     *
     * @param type  类型
     * @param point 坐标点
     * @return 服务范围数据
     */
    List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, GeoJsonPoint point);

    /**
     * 根据详细地址查询所属的服务对象
     *
     * @param type    类型
     * @param address 详细地址，如：北京市昌平区金燕龙办公楼传智教育总部
     * @return 服务范围数据
     */
    List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, String address);
}
