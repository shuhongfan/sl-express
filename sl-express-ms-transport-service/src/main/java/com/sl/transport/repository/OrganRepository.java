package com.sl.transport.repository;

import com.sl.transport.domain.OrganDTO;

import java.util.List;

/**
 * 通用机构查询
 *
 * @author zzj
 * @version 1.0
 */
public interface OrganRepository {

    /**
     * 无需指定type，根据id查询
     *
     * @param bid 业务id
     * @return 机构数据
     */
    OrganDTO findByBid(Long bid);

    /**
     * 无需指定type，根据ids查询
     *
     * @param bids 业务id
     * @return 机构数据
     */
    List<OrganDTO> findByBids(List<Long> bids);

    /**
     * 查询所有的机构，如果name不为空的按照name模糊查询
     *
     * @param name 机构名称
     * @return 机构列表
     */
    List<OrganDTO> findAll(String name);
}
