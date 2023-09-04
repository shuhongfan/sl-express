package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.google.common.collect.Lists;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.api.common.GoodsTypeFeign;
import com.sl.ms.base.api.common.WorkPatternFeign;
import com.sl.ms.base.api.common.WorkSchedulingFeign;
import com.sl.ms.base.api.truck.TruckTypeFeign;
import com.sl.ms.base.domain.base.*;
import com.sl.ms.base.domain.truck.TruckTypeDto;
import com.sl.ms.web.manager.enums.TruckTypeAllowableLoadEnum;
import com.sl.ms.web.manager.enums.TruckTypeAllowableVolumeEnum;
import com.sl.ms.web.manager.service.AuthService;
import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.util.ExcelUtil;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.ms.web.manager.vo.baseCommon.*;
import com.sl.ms.web.manager.vo.baseTruck.TruckTypeVO;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 基础服务
 * 文件上传 排班 工作模式 行政机构 车型 货物类型
 */
@Slf4j
@Service
public class BaseCommonServiceImpl implements BaseCommonService {

    @Resource
    private AreaFeign areaFeign;

    @Resource
    private WorkPatternFeign workPatternFeign;

    @Resource
    private WorkSchedulingFeign workSchedulingFeign;

    @Resource
    private GoodsTypeFeign goodsTypeFeign;

    @Resource
    private TruckTypeFeign truckTypeFeign;

    @Resource
    private AuthService authService;

    /**
     * 批量关联排班
     *
     * @param workSchedulingAddVO 排班
     */
    @Override
    public void batchSaveWorkScheduling(WorkSchedulingAddVO workSchedulingAddVO) {
        Map<Long, SysUserVO> sysUserVOMap = authService.users(workSchedulingAddVO.getUserIdList()).parallelStream().collect(Collectors.toMap(SysUserVO::getUserId, v -> v));
        List<WorkSchedulingExportVO> workSchedulingExportVOS = workSchedulingAddVO.getUserIdList().stream().map(v -> {
            WorkSchedulingExportVO workSchedulingExportVO = new WorkSchedulingExportVO();
            workSchedulingExportVO.setEmployeeNumber(v.toString());
            SysUserVO user = sysUserVOMap.get(v);
            if (ObjectUtil.isEmpty(user)) {
                return null;
            }
            workSchedulingExportVO.setName(user.getName());
            workSchedulingExportVO.setPhone(user.getMobile());
            workSchedulingExportVO.setAgencyId(user.getAgency().getId());
            BeanUtil.copyProperties(workSchedulingAddVO, workSchedulingExportVO);
            return workSchedulingExportVO;
        }).filter(ObjectUtil::isNotEmpty).collect(Collectors.toList());
        batchSaveWorkScheduling(workSchedulingExportVOS);
    }

    /**
     * 获取map类型车辆类型数据集合
     *
     * @param truckTypeSet 车辆类型id列表
     * @return 执行结果
     */
    @Override
    public Map<Long, TruckTypeVO> truckTypeMap(Set<Long> truckTypeSet) {

        List<TruckTypeDto> truckTypeDtoList = truckTypeFeign.findAll(new ArrayList<>(truckTypeSet));
        return truckTypeDtoList.stream()
                .map(truckTypeDto -> BeanUtil.toBean(truckTypeDto, TruckTypeVO.class))
                .collect(Collectors.toMap(TruckTypeVO::getId, vo -> vo));

    }

    /**
     * 行政机构
     * 用于地址选择 省市县三级行政机构
     * 根据父行政机构节点查询子行政机构节点
     *
     * @param parentId 父节点ID
     * @return 子节点
     */
    @Override
    public List<AreaSimpleVO> findChildrenAreaByParentId(Long parentId) {

        List<AreaDto> areas = areaFeign.findChildren(parentId);
        if (CollUtil.isEmpty(areas)) {
            return Lists.newArrayList();
        }
        List<AreaSimpleVO> areaSimpleVOS = new ArrayList<>();
        areas.forEach(area -> {
            AreaSimpleVO areaSimpleVO = BeanUtil.toBean(area, AreaSimpleVO.class);
            areaSimpleVOS.add(areaSimpleVO);
        });
        return areaSimpleVOS;
    }

    /**
     * 工作模式列表查询
     *
     * @return 工作模式列表
     */
    @Override
    public Map<Byte, List<WorkPatternDTO>> listWorkPattern() {
        return workPatternFeign.findAll().stream().collect(Collectors.groupingBy(WorkPatternDTO::getWorkPatternType));
    }

    /**
     * 工作模式分页查询
     *
     * @param workPatternQueryDTO 查询条件
     * @return 工作模式列表
     */
    @Override
    public PageResponse<WorkPatternDTO> listWorkPattern(WorkPatternQueryDTO workPatternQueryDTO) {
        log.info("workPatternQueryDTO : {}", workPatternQueryDTO);
        return workPatternFeign.list(workPatternQueryDTO);
    }

    /**
     * 获取工作模式详情
     *
     * @param id 工作模式ID
     * @return 工作模式
     */
    @Override
    public WorkPatternDTO getWorkPatternById(@PathVariable("id") Long id) {
        return workPatternFeign.getById(id);
    }

    /**
     * 删除工作模式
     *
     * @param id 工作模式ID
     */
    @Override
    public void deleteWorkPattern(@PathVariable("id") Long id) {
        workPatternFeign.delete(id);
    }

    /**
     * 添加工作模式
     *
     * @param workPatternAddDTO 工作模式
     */
    @Override
    public void addWorkPattern(WorkPatternAddDTO workPatternAddDTO) {
        //管理员
        Long managerId = UserThreadLocal.getUserId();
        workPatternAddDTO.setOperator(managerId);
        try {
            workPatternFeign.add(workPatternAddDTO);
        } catch (Exception e) {
            throw new SLWebException("新增失败");
        }

    }

    /**
     * 修改工作模式
     *
     * @param workPatternUpdateDTO 工作模式
     */
    @Override
    public void putWorkPattern(WorkPatternUpdateDTO workPatternUpdateDTO) {
        //管理员
        Long managerId = UserThreadLocal.getUserId();
        workPatternUpdateDTO.setOperator(managerId);
        try {
            workPatternFeign.put(workPatternUpdateDTO);
        } catch (Exception e) {
            throw new SLWebException("更新失败");
        }
    }

    /**
     * 分页查询排班列表
     *
     * @param workSchedulingQueryDTO 查询条件
     * @return 排班列表
     */
    @Override
    public PageResponse<WorkSchedulingDTO> listWorkScheduling(WorkSchedulingQueryDTO workSchedulingQueryDTO) {
        PageResponse<WorkSchedulingDTO> pageResponse = workSchedulingFeign.list(workSchedulingQueryDTO);
        if (ObjectUtil.isEmpty(pageResponse) || ObjectUtil.isEmpty(pageResponse.getItems())) {
            return new PageResponse<>();
        }
        // 以权限系统为主
        List<Long> userIds = pageResponse.getItems().parallelStream().map(WorkSchedulingDTO::getUserId).collect(Collectors.toList());
        Map<Long, SysUserVO> sysUserVOMap = authService.users(userIds).parallelStream().collect(Collectors.toMap(SysUserVO::getUserId, v -> v));
        List<WorkSchedulingDTO> dtoList = pageResponse.getItems().stream().map(workSchedulingDTO -> {
            SysUserVO user = sysUserVOMap.get(workSchedulingDTO.getUserId());
            if (ObjectUtil.isEmpty(user)) {
                return null;
            }
            workSchedulingDTO.setName(user.getName());
            workSchedulingDTO.setEmployeeNumber(user.getAccount());
            workSchedulingDTO.setPhone(user.getMobile());
            workSchedulingDTO.setAgencyName(user.getAgency().getName());
            return workSchedulingDTO;
        }).collect(Collectors.toList());
        pageResponse.setItems(dtoList);
        return pageResponse;
    }

    /**
     * 删除排班
     *
     * @param id       排班ID
     * @param operator 操作人
     */
    @Override
    public void deleteWorkScheduling(Long id, Long operator) {
        workSchedulingFeign.delete(id, operator);
    }

    /**
     * 更新排班
     *
     * @param workSchedulingVO 排班
     */
    @Override
    public void updateWorkScheduling(WorkSchedulingVO workSchedulingVO) {
        //管理员
        Long manage = UserThreadLocal.getUserId();
        workSchedulingVO.getUserIdList().forEach(id -> {
            WorkSchedulingUpdateDTO workSchedulingUpdateDTO = new WorkSchedulingUpdateDTO();
            workSchedulingUpdateDTO.setId(id);
            workSchedulingUpdateDTO.setOperator(manage);
            workSchedulingUpdateDTO.setWorkPatternId(workSchedulingVO.getWorkPatternId());
            workSchedulingUpdateDTO.setWorkPatternType(workSchedulingVO.getWorkPatternType());
            workSchedulingFeign.update(workSchedulingUpdateDTO);
        });
    }

    /**
     * 下载排班模板
     *
     * @return 排班模板Excel
     */
    @Override
    public ResponseEntity downExcelTemplate() {
        List<WorkSchedulingExportVO> list = new ArrayList<>();
        return ExcelUtil.export(list, WorkSchedulingExportVO.class, "排班模板");
    }

    /**
     * 导入排班
     *
     * @param list 排班列表
     */
    @Override
    public void batchSaveWorkScheduling(List<WorkSchedulingExportVO> list) {
        List<WorkSchedulingAddDTO> collect = list.stream().map(v -> BeanUtil.toBean(v, WorkSchedulingAddDTO.class)).collect(Collectors.toList());
        workSchedulingFeign.batch(collect);
    }

    /**
     * 添加货物类型
     *
     * @param vo 货物类型信息
     */
    @Override
    public void saveGoodsType(GoodsTypeVO vo) {
        GoodsTypeDto dto = BeanUtil.toBean(vo, GoodsTypeDto.class);
        //处理车辆类型关联数据
        if (ObjectUtil.isNotEmpty(vo.getTruckTypes())) {
            dto.setTruckTypeIds(vo.getTruckTypes().stream().map(TruckTypeVO::getId).collect(Collectors.toList()));
        }
        dto.setId(null);
        try {
            goodsTypeFeign.saveGoodsType(dto);
        } catch (Exception e) {
            throw new SLWebException("新增失败");
        }
    }

    /**
     * 根据id获取货物类型详情
     *
     * @param id 货物类型id
     * @return 货物类型信息
     */
    @Override
    public GoodsTypeVO fineGoodsTypeById(Long id) {
        GoodsTypeDto dto = goodsTypeFeign.fineById(id);
        return parseGoodsTypeDto2Vo(dto);
    }

    /**
     * 获取货物类型列表
     *
     * @param ids 货物类型ids
     * @return 货物类型列表
     */
    @Override
    public List<GoodsTypeVO> findGoodsTypeAll(List<Long> ids) {
        List<GoodsTypeDto> goodsTypeDtoList = goodsTypeFeign.findAll(ids);
        return goodsTypeDtoList.stream()
                .map(goodsTypeDto -> BeanUtil.toBean(goodsTypeDto, GoodsTypeVO.class))
                .collect(Collectors.toList());
    }

    /**
     * 获取分页货物类型数据
     *
     * @param page        页码
     * @param pageSize    页尺寸
     * @param name        名称
     * @param truckTypeId 车型id
     * @return 分页货物类型数据
     */
    @Override
    public PageResponse<GoodsTypeVO> findGoodsTypeByPage(Integer page, Integer pageSize, String name, Long truckTypeId) {
        PageResponse<GoodsTypeDto> goodsTypePage = goodsTypeFeign.findByPage(page, pageSize, name, truckTypeId);
        //加工数据
        return PageResponse.of(goodsTypePage, this::parseGoodsTypeDto2Vo);
    }

    /**
     * 更新货物类型信息
     *
     * @param id 货物类型id
     * @param vo 货物类型信息
     */
    @Override
    public void updateGoodsType(Long id, GoodsTypeVO vo) {
        GoodsTypeDto dto = BeanUtil.toBean(vo, GoodsTypeDto.class);
        //处理车辆类型关联数据
        if (ObjectUtil.isNotEmpty(vo.getTruckTypes())) {
            dto.setTruckTypeIds(vo.getTruckTypes().stream().map(TruckTypeVO::getId).collect(Collectors.toList()));
        }
        dto.setId(id);
        try {
            goodsTypeFeign.update(id, dto);
        } catch (Exception e) {
            throw new SLWebException("更新失败");
        }

    }

    /**
     * 删除货物类型
     *
     * @param id 货物类型id
     */
    @Override
    public void disableGoodsType(Long id) {
        goodsTypeFeign.disable(id);
    }

    /**
     * 简要行政机构信息转换
     *
     * @param area 行政机构DTO
     * @return 简要行政机构VO
     */
    @Override
    public AreaSimpleVO parseArea2Vo(AreaDto area) {
        return BeanUtil.toBean(area, AreaSimpleVO.class);
    }

    /**
     * 货物类型转换
     *
     * @param goodsTypeDtoList 货物类型DTO
     * @return 货物类型VO
     */
    public List<GoodsTypeVO> parseGoodsTypeDto2Vo(List<GoodsTypeDto> goodsTypeDtoList) {
        Set<Long> truckTypeSet = new HashSet<>();
        goodsTypeDtoList.forEach(goodsTypeDto -> {
            if (ObjectUtil.isNotEmpty(goodsTypeDto.getTruckTypeIds())) {
                truckTypeSet.addAll(goodsTypeDto.getTruckTypeIds());
            }
        });
        Map<Long, TruckTypeVO> longTruckTypeVoMap = truckTypeMap(truckTypeSet);
        return goodsTypeDtoList.stream().map(goodsTypeDto -> {
            GoodsTypeVO vo = BeanUtil.toBean(goodsTypeDto, GoodsTypeVO.class);
            if (ObjectUtil.isNotEmpty(goodsTypeDto.getTruckTypeIds())) {
                List<TruckTypeVO> truckTypeVOList = new ArrayList<>();
                for (Long typeId : goodsTypeDto.getTruckTypeIds()) {
                    truckTypeVOList.add(longTruckTypeVoMap.get(typeId));
                }
                vo.setTruckTypes(truckTypeVOList);
            }
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 货物类型转换
     *
     * @param dto 货物类型DTO
     * @return 货物类型VO
     */
    public GoodsTypeVO parseGoodsTypeDto2Vo(GoodsTypeDto dto) {
        GoodsTypeVO vo = BeanUtil.toBean(dto, GoodsTypeVO.class);
        if (ObjectUtil.isNotEmpty(dto) && ObjectUtil.isNotEmpty(dto.getTruckTypeIds())) {
            List<TruckTypeDto> truckTypeDtoList = truckTypeFeign.findAll(dto.getTruckTypeIds());
            if (ObjectUtil.isNotEmpty(truckTypeDtoList)) {
                vo.setTruckTypes(truckTypeDtoList.stream().map(truckTypeDto -> BeanUtil.toBean(truckTypeDto, TruckTypeVO.class)).collect(Collectors.toList()));
            }
        }
        return vo;
    }

    /**
     * 批量车辆类型转换
     *
     * @param truckTypeDtoList 车辆类型DTO
     * @return 车辆类型VO
     */
    public List<TruckTypeVO> parseTruckTypeDto2Vo(List<TruckTypeDto> truckTypeDtoList) {
        return truckTypeDtoList.stream().map(dto -> BeanUtil.toBean(dto, TruckTypeVO.class)).collect(Collectors.toList());
    }

    /**
     * 车辆类型转换
     *
     * @param dto 车辆类型DTO
     * @return 车辆类型VO
     */
    public TruckTypeVO parseTruckTypeDto2Vo(TruckTypeDto dto) {
        TruckTypeVO vo = BeanUtil.toBean(dto, TruckTypeVO.class);
        //处理关联数据
        if (ObjectUtil.isNotEmpty(dto.getGoodsTypeIds())) {
            List<GoodsTypeDto> goodsTypeDtoList = goodsTypeFeign.findAll(dto.getGoodsTypeIds());
            vo.setGoodsTypes(goodsTypeDtoList.stream()
                    .map(goodsTypeDto -> BeanUtil.toBean(goodsTypeDto, GoodsTypeVO.class))
                    .collect(Collectors.toList()));
        }
        return vo;
    }

    /**
     * 车型列表
     *
     * @return 车型列表
     */
    @Override
    public List<TruckTypeVO> truckTypeSimple() {
        List<TruckTypeDto> truckTypeDtoList = truckTypeFeign.findAll(null);
        return truckTypeDtoList.stream().map(truckTypeDto -> BeanUtil.toBean(truckTypeDto, TruckTypeVO.class)).collect(Collectors.toList());
    }

    /**
     * 保存车型
     *
     * @param vo 车型信息
     */
    @Override
    public void saveTruckType(TruckTypeVO vo) {
        TruckTypeDto dto = BeanUtil.toBean(vo, TruckTypeDto.class);
        if (ObjectUtil.isNotEmpty(vo.getGoodsTypes())) {
            dto.setGoodsTypeIds(vo.getGoodsTypes().stream().map(GoodsTypeVO::getId).collect(Collectors.toList()));
        }
        dto.setId(null);
        try {
            truckTypeFeign.saveTruckType(dto);
        } catch (Exception e) {
            throw new SLWebException("新增失败");
        }
    }

    /**
     * 更新车型
     *
     * @param id 车型ID
     * @param vo 车型信息
     */
    @Override
    public void updateTruckType(Long id, TruckTypeVO vo) {
        vo.setId(id);
        TruckTypeDto dto = BeanUtil.toBean(vo, TruckTypeDto.class);
        if (ObjectUtil.isNotEmpty(vo.getGoodsTypes())) {
            dto.setGoodsTypeIds(vo.getGoodsTypes().stream().map(GoodsTypeVO::getId).collect(Collectors.toList()));
        }
        try {
            truckTypeFeign.update(id, dto);
        } catch (Exception e) {
            throw new SLWebException("更新失败");
        }
    }

    /**
     * 车型分页
     *
     * @param page            页数
     * @param pageSize        页大小
     * @param name            车辆类型名称
     * @param allowableLoad   车型载重,单位：吨；左闭右开区间
     * @param allowableVolume 车型体积，单位：立方米；左闭右开区间
     * @param id              车型ID
     * @return 车型列表
     */
    @Override
    public PageResponse<TruckTypeVO> findTruckTypeByPage(Integer page,
                                                         Integer pageSize,
                                                         String name,
                                                         TruckTypeAllowableLoadEnum allowableLoad,
                                                         TruckTypeAllowableVolumeEnum allowableVolume,
                                                         Long id) {
        //构造查询条件
        BigDecimal minAllowableLoad = ObjectUtil.isNotEmpty(allowableLoad) ? allowableLoad.getValue().getMinLoad() : null;
        BigDecimal maxAllowableLoad = ObjectUtil.isNotEmpty(allowableLoad) ? allowableLoad.getValue().getMaxLoad() : null;
        BigDecimal minAllowableVolume = ObjectUtil.isNotEmpty(allowableVolume) ? allowableVolume.getValue().getMinLoad() : null;
        BigDecimal maxAllowableVolume = ObjectUtil.isNotEmpty(allowableVolume) ? allowableVolume.getValue().getMaxLoad() : null;

        //分页查询
        PageResponse<TruckTypeDto> truckTypeDtoPage = truckTypeFeign.findByPage(page, pageSize, name, minAllowableLoad, maxAllowableLoad, minAllowableVolume, maxAllowableVolume, id);
        return PageResponse.of(truckTypeDtoPage, this::parseTruckTypeDto2Vo);
    }

    /**
     * 车型详情
     *
     * @param id 车型ID
     * @return 车型详情
     */
    @Override
    public TruckTypeVO findTruckTypeById(Long id) {
        TruckTypeDto dto = truckTypeFeign.fineById(id);
        return parseTruckTypeDto2Vo(dto);
    }

    /**
     * 删除车型
     *
     * @param id 车型ID
     */
    @Override
    public void deleteTruckType(Long id) {
        truckTypeFeign.disable(id);
    }
}
