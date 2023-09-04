package com.sl.ms.web.manager.service;

import com.sl.ms.base.domain.base.*;
import com.sl.ms.web.manager.enums.TruckTypeAllowableLoadEnum;
import com.sl.ms.web.manager.enums.TruckTypeAllowableVolumeEnum;
import com.sl.ms.web.manager.vo.baseCommon.*;
import com.sl.ms.web.manager.vo.baseTruck.TruckTypeVO;
import com.sl.transport.common.util.PageResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 基础服务
 * 文件上传 排班 工作模式 行政机构
 */
public interface BaseCommonService {
    /**
     * 行政机构
     * 用于地址选择 省市县三级行政机构
     * 根据父行政机构节点查询子行政机构节点
     *
     * @param parentId 父节点ID
     * @return 子节点
     */
    List<AreaSimpleVO> findChildrenAreaByParentId(Long parentId);


    /**
     * 工作模式列表查询
     *
     * @return 工作模式列表
     */
    Map<Byte, List<WorkPatternDTO>> listWorkPattern();

    /**
     * 工作模式分页查询
     *
     * @param workPatternQueryDTO 查询条件
     * @return 工作模式列表
     */
    PageResponse<WorkPatternDTO> listWorkPattern(WorkPatternQueryDTO workPatternQueryDTO);

    /**
     * 获取工作模式详情
     *
     * @param id 工作模式ID
     * @return 工作模式
     */
    WorkPatternDTO getWorkPatternById(Long id);

    /**
     * 删除工作模式
     *
     * @param id 工作模式ID
     */
    void deleteWorkPattern(Long id);

    /**
     * 添加工作模式
     *
     * @param workPatternAddDTO 工作模式
     */
    void addWorkPattern(WorkPatternAddDTO workPatternAddDTO);

    /**
     * 修改工作模式
     *
     * @param workPatternUpdateDTO 工作模式
     */
    void putWorkPattern(WorkPatternUpdateDTO workPatternUpdateDTO);

    /**
     * 更新排班
     *
     * @param workSchedulingVO 排班
     */
    void updateWorkScheduling(WorkSchedulingVO workSchedulingVO);

    /**
     * 下载排班模板
     *
     * @return 排班模板Excel
     */
    ResponseEntity downExcelTemplate();

    /**
     * 导入排班
     *
     * @param list 排班列表
     */
    void batchSaveWorkScheduling(List<WorkSchedulingExportVO> list);

    /**
     * 删除排班
     *
     * @param id       排班ID
     * @param operator 操作人
     */
    void deleteWorkScheduling(Long id, Long operator);

    /**
     * 分页查询排班列表
     *
     * @param workSchedulingQueryDTO 查询条件
     * @return 排班列表
     */
    PageResponse<WorkSchedulingDTO> listWorkScheduling(WorkSchedulingQueryDTO workSchedulingQueryDTO);

    /**
     * 添加货物类型
     *
     * @param vo 货物类型信息
     */
    void saveGoodsType(GoodsTypeVO vo);

    /**
     * 根据id获取货物类型详情
     *
     * @param id 货物类型id
     * @return 货物类型信息
     */
    GoodsTypeVO fineGoodsTypeById(Long id);

    /**
     * 获取货物类型列表
     *
     * @param ids 货物类型ids
     * @return 货物类型列表
     */
    List<GoodsTypeVO> findGoodsTypeAll(List<Long> ids);

    /**
     * 获取分页货物类型数据
     *
     * @param page          页码
     * @param pageSize      页尺寸
     * @param name          名称
     * @param truckTypeId   车型id
     * @return 分页货物类型数据
     */
    PageResponse<GoodsTypeVO> findGoodsTypeByPage(
            Integer page,
            Integer pageSize,
            String name,
            Long truckTypeId);

    /**
     * 更新货物类型信息
     *
     * @param id 货物类型id
     * @param vo 货物类型信息
     */
    void updateGoodsType(Long id, GoodsTypeVO vo);

    /**
     * 删除货物类型
     *
     * @param id 货物类型id
     */
    void disableGoodsType(Long id);

    /**
     * 简要行政机构信息转换
     *
     * @param area 行政机构DTO
     * @return 简要行政机构VO
     */
    AreaSimpleVO parseArea2Vo(AreaDto area);

    /**
     * 车型列表
     *
     * @return 车型列表
     */
    List<TruckTypeVO> truckTypeSimple();


    /**
     * 保存车型
     *
     * @param vo 车型信息
     */
    void saveTruckType(TruckTypeVO vo);


    /**
     * 更新车型
     *
     * @param id 车型ID
     * @param vo 车型信息
     */
    void updateTruckType(Long id, TruckTypeVO vo);


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
    PageResponse<TruckTypeVO> findTruckTypeByPage(Integer page,
                                                  Integer pageSize,
                                                  String name,
                                                  TruckTypeAllowableLoadEnum allowableLoad,
                                                  TruckTypeAllowableVolumeEnum allowableVolume,
                                                  Long id);

    /**
     * 车型详情
     *
     * @param id 车型ID
     * @return 车型详情
     */
    TruckTypeVO findTruckTypeById(Long id);

    /**
     * 删除车型
     *
     * @param id 车型ID
     */
    void deleteTruckType(Long id);

    /**
     * 获取map类型车辆类型数据集合
     *
     * @param truckTypeSet 车辆类型id列表
     * @return 执行结果
     */
    Map<Long, TruckTypeVO> truckTypeMap(Set<Long> truckTypeSet);

    /**
     * 批量关联排班
     *
     * @param workSchedulingAddVO 排班
     */
    void batchSaveWorkScheduling(WorkSchedulingAddVO workSchedulingAddVO);
}
