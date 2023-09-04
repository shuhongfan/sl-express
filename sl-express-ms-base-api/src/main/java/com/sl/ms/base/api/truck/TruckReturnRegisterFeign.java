package com.sl.ms.base.api.truck;

import com.sl.ms.base.domain.truck.TruckReturnRegisterDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterListDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterPageQueryDTO;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

@FeignClient(name = "sl-express-ms-base", contextId = "TruckReturnRegister", path = "base/returnRegister")
@ApiIgnore
public interface TruckReturnRegisterFeign {
    /**
     * 新增回车登记
     *
     * @param truckReturnRegisterDTO 回车登记对象
     */
    @PostMapping
    void save(@RequestBody TruckReturnRegisterDTO truckReturnRegisterDTO);

    /**
     * 分页查询回车登记列表
     *
     * @param truckReturnRegisterPageQueryDTO 分页查询条件
     * @return 回车登记分页结果
     */
    @PostMapping("pageQuery")
    PageResponse<TruckReturnRegisterListDTO> pageQuery(@RequestBody TruckReturnRegisterPageQueryDTO truckReturnRegisterPageQueryDTO);

    /**
     * 根据id查询回车登记详情
     *
     * @param id 回车登记id
     * @return 回车登记详情
     */
    @GetMapping("/{id}")
    TruckReturnRegisterDTO findById(@PathVariable("id") Long id);
}
