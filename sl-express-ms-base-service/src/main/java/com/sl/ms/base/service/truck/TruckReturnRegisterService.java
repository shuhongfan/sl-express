package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.truck.TruckReturnRegisterDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterListDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterPageQueryDTO;
import com.sl.ms.base.entity.truck.TruckReturnRegisterEntity;
import com.sl.transport.common.util.PageResponse;

/**
 * 回车登记 服务类
 */
public interface TruckReturnRegisterService extends IService<TruckReturnRegisterEntity> {
    /**
     * 分页查询回车登记列表
     *
     * @param dto 分页查询条件
     * @return 回车登记分页结果
     */
    PageResponse<TruckReturnRegisterListDTO> pageQuery(TruckReturnRegisterPageQueryDTO dto);

    /**
     * 根据id查询回车登记详情
     *
     * @param id 回车登记id
     * @return 回车登记详情
     */
    TruckReturnRegisterDTO findById(Long id);
}
