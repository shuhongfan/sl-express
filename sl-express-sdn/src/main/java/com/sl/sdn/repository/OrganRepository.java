package com.sl.sdn.repository;

import com.sl.sdn.dto.OrganDTO;

import java.util.List;

/**
 * 通过机构查询
 */
public interface OrganRepository {

    /**
     * 无需指定type，根据id查询
     * @param bid
     * @return
     */
    OrganDTO findByBid(Long bid);


    /**
     * 查询所有的机构，如果name不为空的按照name模糊查询
     * @param name
     * @return
     */
    List<OrganDTO> findAll(String name);
}
