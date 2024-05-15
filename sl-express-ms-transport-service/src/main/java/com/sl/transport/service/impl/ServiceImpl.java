package com.sl.transport.service.impl;

import com.sl.transport.entity.node.BaseEntity;
import com.sl.transport.repository.BaseRepository;
import com.sl.transport.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 基础服务的实现
 * @param <R>
 * @param <T>
 */
public class ServiceImpl<R extends BaseRepository,T extends BaseEntity> implements IService<T> {

    @Autowired
    private R repository;

    @Override
    public T queryByBid(Long bid) {
        return (T) this.repository.findByBid(bid).orElse(null);
    }

    @Override
    public T create(T t) {
        return (T) this.repository.save(t);
    }

    @Override
    public T update(T t) {
//        id由neo4j自动生成
        t.setId(null);
        return (T) this.repository.save(t);
    }

    @Override
    public Boolean deleteByBid(Long bid) {
        return this.repository.deleteByBid(bid) > 0;
    }
}
