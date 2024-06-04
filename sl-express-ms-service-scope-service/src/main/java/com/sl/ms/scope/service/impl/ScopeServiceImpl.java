package com.sl.ms.scope.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.itheima.em.sdk.EagleMapTemplate;
import com.itheima.em.sdk.enums.ProviderEnum;
import com.itheima.em.sdk.vo.Coordinate;
import com.itheima.em.sdk.vo.GeoResult;
import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import com.sl.ms.scope.service.ScopeService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ScopeServiceImpl implements ScopeService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private EagleMapTemplate eagleMapTemplate;

    /**
     * 新增或更新服务范围
     *
     * @param bid     业务id
     * @param type    类型
     * @param polygon 多边形坐标点
     * @return 是否成功
     */
    @Override
    public Boolean saveOrUpdate(Long bid, ServiceTypeEnum type, GeoJsonPolygon polygon) {
//        1.构建Mogo查询条件 bid type
        Query query = Query.query(Criteria.where("bid").is(bid).and("type").is(type.getCode()));
        ServiceScopeEntity serviceScopeEntity = mongoTemplate.findOne(query, ServiceScopeEntity.class);

//        2.根据查询条件查询对于作业范围
        if (ObjectUtil.isEmpty(serviceScopeEntity)) {
            serviceScopeEntity = new ServiceScopeEntity();
            serviceScopeEntity.setId(new ObjectId());
            serviceScopeEntity.setBid(bid);
            serviceScopeEntity.setType(type.getCode());
            serviceScopeEntity.setPolygon(polygon);
            serviceScopeEntity.setCreated(System.currentTimeMillis());
            serviceScopeEntity.setUpdated(System.currentTimeMillis());
        } else {
            serviceScopeEntity.setPolygon(polygon);
            serviceScopeEntity.setUpdated(System.currentTimeMillis());
        }

//        3.如果作业范围为空==》新建作业范围保存
//        4.如果作业范围存在 ==> 修改多边形字段 和 updated时间
        try {
            mongoTemplate.save(serviceScopeEntity);
            return true;
        } catch (Exception e) {
            log.error("新增/更新服务范围数据失败！ bid = {}, type = {}, points = {}", bid, type, polygon.getPoints(), e);
        }
        return false;
    }

    /**
     * 根据主键id删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public Boolean delete(String id) {
        Query query = Query.query(Criteria.where("id").is(new ObjectId(id)));
        return mongoTemplate.remove(query, ServiceScopeEntity.class).getDeletedCount() > 0;
    }

    /**
     * 根据业务id和类型删除数据
     *
     * @param bid  业务id
     * @param type 类型
     * @return 是否成功
     */
    @Override
    public Boolean delete(Long bid, ServiceTypeEnum type) {
        Query query = Query.query(Criteria.where("bid").is(bid).and("type").is(type.getCode()));
        return mongoTemplate.remove(query, ServiceScopeEntity.class).getDeletedCount()>0;
    }

    /**
     * 根据主键查询数据
     *
     * @param id 主键
     * @return 服务范围数据
     */
    @Override
    public ServiceScopeEntity queryById(String id) {
        return mongoTemplate.findById(new ObjectId(id), ServiceScopeEntity.class);
    }

    /**
     * 根据业务id和类型查询数据
     *
     * @param bid  业务id
     * @param type 类型
     * @return 服务范围数据
     */
    @Override
    public ServiceScopeEntity queryByBidAndType(Long bid, ServiceTypeEnum type) {
        Query query = Query.query(Criteria.where("bid").is(bid).and("type").is(type.getCode()));
        return mongoTemplate.findOne(query, ServiceScopeEntity.class);
    }

    /**
     * 根据坐标点查询所属的服务对象
     *
     * @param type  类型
     * @param point 坐标点
     * @return 服务范围数据
     */
    @Override
    public List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, GeoJsonPoint point) {
//        根据类型和坐标点查询有交集的作业范围  tips:intersects 查询传入坐标点和mongo库中多边形相交的数据
        Query query = Query.query(Criteria.where("type").is(type.getCode()).and("polygon").intersects(point));
        return mongoTemplate.find(query, ServiceScopeEntity.class);
    }

    /**
     * 根据详细地址查询所属的服务对象
     *
     * @param type    类型
     * @param address 详细地址，如：北京市昌平区金燕龙办公楼传智教育总部
     * @return 服务范围数据
     */
    @Override
    public List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, String address) {
        GeoResult geoResult = eagleMapTemplate.opsForBase().geoCode(ProviderEnum.AMAP, address, null);
        Coordinate coordinate = geoResult.getLocation();
        return queryListByPoint(type, new GeoJsonPoint(coordinate.getLongitude(), coordinate.getLatitude()));
    }
}
