package com.sl.ms.web.manager.service;

import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import com.sl.ms.web.manager.vo.agency.AgencyUpdateVO;
import com.sl.ms.web.manager.vo.agency.AgencyVO;
import com.sl.ms.web.manager.vo.agency.ServiceScopeVO;

import java.util.List;

/**
 * 营业部管理
 */
public interface AgencyService {
    /**
     * 获取机构树
     *
     * @return 机构树
     */
    String treeAgency();

    /**
     * 获取机构详情
     *
     * @param id 机构id
     * @return 执行结果
     */
    AgencyVO agencyDetail(Long id);

    /**
     * 获取简要机构
     *
     * @param id 机构id
     * @return 执行结果
     */
    AgencySimpleVO agencySimple(Long id);

    /**
     * 批量获取简要机构
     *
     * @param ids 机构ids
     * @return 执行结果
     */
    List<AgencySimpleVO> batchAgencySimple(List<Long> ids);

    /**
     * 编辑机构
     *
     * @param agencyVO 机构信息
     */
    void saveAgency(AgencyUpdateVO agencyVO);


    /**
     * 删除范围
     *
     * @param id   范围ID
     * @param type 范围类型
     */
    void deleteScopeById(Long id, Integer type);


    /**
     * 保存范围
     *
     * @param vo 范围信息
     */
    void saveScope(ServiceScopeVO vo);


    /**
     * 查询范围
     *
     * @param id   范围ID
     * @param type 范围类型
     * @return 范围信息
     */
    ServiceScopeVO findScope(Long id, Integer type);


}
