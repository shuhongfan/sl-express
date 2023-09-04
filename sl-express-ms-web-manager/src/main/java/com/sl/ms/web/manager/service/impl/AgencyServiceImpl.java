package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.OrgDTO;
import com.itheima.auth.sdk.dto.UserDTO;
import com.itheima.em.sdk.EagleMapTemplate;
import com.itheima.em.sdk.enums.ProviderEnum;
import com.itheima.em.sdk.vo.Coordinate;
import com.itheima.em.sdk.vo.GeoResult;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.scope.api.ServiceScopeFeign;
import com.sl.ms.scope.dto.ServiceScopeDTO;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.ms.web.manager.service.AgencyService;
import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import com.sl.ms.web.manager.vo.agency.AgencyUpdateVO;
import com.sl.ms.web.manager.vo.agency.AgencyVO;
import com.sl.ms.web.manager.vo.agency.ServiceScopeVO;
import com.sl.ms.web.manager.vo.baseCommon.AreaVO;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.domain.OrganDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 营业部管理
 * 机构管理 服务范围 快递员任务管理
 *
 * @author itcast
 */
@Slf4j
@Service
public class AgencyServiceImpl implements AgencyService {

    @Resource
    ServiceScopeFeign serviceScopeFeign;

    @Resource
    AreaFeign areaFeign;

    @Resource
    private OrganFeign organFeign;

    @Resource
    private EagleMapTemplate eagleMapTemplate;

    @Resource
    private BaseCommonService baseCommonService;

    /**
     * 机构编辑VO转换DTO
     *
     * @param agencyVO 机构VO
     * @return 机构DTO
     */
    public OrganDTO parseAgencyVOToDTO(AgencyUpdateVO agencyVO) {
        OrganDTO organDTO = BeanUtil.toBean(agencyVO, OrganDTO.class);
        // 设置详细地址 json
        AreaVO areaVO = new AreaVO();
        Set<Long> areaIds = new HashSet<>();
        boolean provinceOk = ObjectUtil.isNotEmpty(agencyVO.getProvinceId()) && agencyVO.getProvinceId() != 0;
        boolean cityOk = ObjectUtil.isNotEmpty(agencyVO.getCityId()) && agencyVO.getCityId() != 0;
        boolean countyOk = ObjectUtil.isNotEmpty(agencyVO.getCountyId()) && agencyVO.getCountyId() != 0;
        if (provinceOk) {
            areaIds.add(agencyVO.getProvinceId());
        }
        if (cityOk) {
            areaIds.add(agencyVO.getCityId());
        }
        if (countyOk) {
            areaIds.add(agencyVO.getCountyId());
        }
        if (!areaIds.isEmpty()) {
            List<AreaDto> result = areaFeign.findBatch(new ArrayList<>(areaIds));
            Map<Long, AreaDto> areaMap = result.stream().collect(Collectors.toMap(AreaDto::getId, area -> area));
            if (provinceOk) {
                areaVO.setProvince(baseCommonService.parseArea2Vo(areaMap.get(agencyVO.getProvinceId())));
            }
            if (cityOk) {
                areaVO.setCity(baseCommonService.parseArea2Vo(areaMap.get(agencyVO.getCityId())));
            }
            if (countyOk) {
                areaVO.setCounty(baseCommonService.parseArea2Vo(areaMap.get(agencyVO.getCountyId())));
            }
            areaVO.setAddress(agencyVO.getAddress());
            organDTO.setAddress(JSONUtil.toJsonStr(areaVO));

            if (ObjectUtil.isEmpty(agencyVO.getLatitude()) && ObjectUtil.isEmpty(agencyVO.getLongitude())) {
                // 补充经纬度
                StringBuilder address = new StringBuilder();
                address.append(areaMap.get(agencyVO.getProvinceId()).getName());
                address.append(areaMap.get(agencyVO.getProvinceId()).getName());
                address.append(areaMap.get(agencyVO.getCountyId()).getName());
                address.append(agencyVO.getAddress());
                GeoResult geoResult = eagleMapTemplate.opsForBase().geoCode(ProviderEnum.AMAP, address.toString(), null);
                Coordinate coordinate = geoResult.getLocation();

                log.info("地址和坐标-->" + address + "--" + coordinate);
                if (ObjectUtil.isEmpty(coordinate)) {
                    log.error("地址无法定位");
                    throw new SLException("地址无法定位");
                }
                // 经度
                double lng = coordinate.getLongitude();
                // 纬度
                double lat = coordinate.getLatitude();
                organDTO.setLatitude(lat);
                organDTO.setLongitude(lng);
            }
        }
        return organDTO;
    }


    /**
     * 机构数据模型转换
     *
     * @param organDTO 机构DTO
     * @return 机构VO
     */
    public AgencyVO parseOrg2Vo(OrganDTO organDTO) {
        AgencyVO agencyVO = BeanUtil.toBean(organDTO, AgencyVO.class);
        //处理父级信息
        if (ObjectUtil.isNotEmpty(organDTO.getParentId()) && organDTO.getParentId() != 0) {
            OrganDTO result = organFeign.queryById(organDTO.getParentId());
            AgencySimpleVO simpleVo = BeanUtil.toBean(result, AgencySimpleVO.class);
            simpleVo.setId(result.getId());
            agencyVO.setParent(simpleVo);
        }
        //处理省市区信息
        if (ObjectUtil.isNotEmpty(organDTO.getAddress())) {
            AreaVO areaVO = JSONUtil.toBean(organDTO.getAddress(), AreaVO.class);
            BeanUtil.copyProperties(areaVO, agencyVO);
        }
        return agencyVO;
    }

    /**
     * 获取机构树
     *
     * @return 机构树
     */
    @Override
    public String treeAgency() {
        return organFeign.findAllTree();
    }

    /**
     * 获取机构详情
     *
     * @param id 机构id
     * @return 执行结果
     */
    @Override
    public AgencyVO agencyDetail(Long id) {
        OrganDTO organDTO = organFeign.queryById(id);
        if (ObjectUtil.isNotEmpty(organDTO)) {
            return parseOrg2Vo(organDTO);
        }
        return new AgencyVO();
    }

    /**
     * 获取简要机构
     *
     * @param id 机构id
     * @return 执行结果
     */
    @Override
    public AgencySimpleVO agencySimple(Long id) {
        OrgDTO organDTO = AuthTemplateThreadLocal.get().opsForOrg().getOrgById(id).getData();
        if (ObjectUtil.isNotEmpty(organDTO)) {
            return parseOrg2SimpleVo(organDTO);
        }
        return new AgencySimpleVO();
    }

    /**
     * 批量获取简要机构
     *
     * @param ids 机构ids
     * @return 执行结果
     */
    @Override
    public List<AgencySimpleVO> batchAgencySimple(List<Long> ids) {
        List<OrgDTO> data = AuthTemplateThreadLocal.get().opsForOrg().getOrgByIds(ids).getData();
        if (CollUtil.isNotEmpty(data)) {
            return data.parallelStream().map(this::parseOrg2SimpleVo).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }


    /**
     * 简要机构信息转换
     *
     * @param organDTO 机构DTO
     * @return 简要机构VO
     */
    public AgencySimpleVO parseOrg2SimpleVo(OrgDTO organDTO) {
        return BeanUtil.toBean(organDTO, AgencySimpleVO.class);
    }

    /**
     * 编辑机构
     *
     * @param agencyVO 机构信息
     */
    @Override
    public void saveAgency(AgencyUpdateVO agencyVO) {
        OrganDTO organDTO = parseAgencyVOToDTO(agencyVO);
        organFeign.update(organDTO);
    }

    /**
     * 删除范围
     *
     * @param id   范围ID
     * @param type 范围类型
     */
    @Override
    public void deleteScopeById(Long id, Integer type) {
        try {
            serviceScopeFeign.delete(id, type);
        } catch (Exception e) {
            throw new SLWebException("删除失败，不存在的围栏");
        }
    }

    /**
     * 保存范围
     *
     * @param vo 范围信息
     */
    @Override
    public void saveScope(ServiceScopeVO vo) {
        log.info("保存快递员业务范围:{}", vo);
        ServiceScopeDTO serviceScopeDTO = BeanUtil.toBean(vo, ServiceScopeDTO.class);
        try {
            serviceScopeFeign.saveScope(serviceScopeDTO);
        } catch (Exception e) {
            throw new SLWebException("保存失败, 请正确绘制没有交叉点的规则多边形");
        }

    }

    /**
     * 查询范围
     *
     * @param id   范围ID
     * @param type 范围类型
     * @return 范围VO
     */
    @Override
    public ServiceScopeVO findScope(Long id, Integer type) {
        //查询服务范围信息
        ServiceScopeDTO serviceScopeDTO = serviceScopeFeign.queryServiceScope(id, type);
        ServiceScopeVO serviceScopeVO = new ServiceScopeVO();
        if (ObjectUtil.isNotEmpty(serviceScopeDTO)) {
            BeanUtil.copyProperties(serviceScopeDTO, serviceScopeVO);
        }

        //获取机构id
        Long organId = id;
        if (type == 2) {
            //type为2是快递员，查询快递员所在机构的id
            Result<UserDTO> result = AuthTemplateThreadLocal.get().opsForUser().getUserById(id);
            if (ObjectUtil.isEmpty(result.getData())) {
                throw new SLWebException("id为" + id + "的快递员不存在！");
            }
            organId = result.getData().getOrgId();
        }

        //查询机构的经纬度坐标
        OrganDTO organDTO = organFeign.queryById(organId);
        serviceScopeVO.setLatitude(organDTO.getLatitude());
        serviceScopeVO.setLongitude(organDTO.getLongitude());
        return serviceScopeVO;
    }
}
