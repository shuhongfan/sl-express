package com.sl.ms.carriage.appi;

import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.carriage.domain.dto.WaybillDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-carriage", contextId = "Carriage", path = "/carriages")
@ApiIgnore
public interface CarriageFeign {
    /**
     * 新增/修改运费模板
     *
     * @param carriageDto 新增/修改运费对象
     *                    必填字段：templateType、transportType
     *                    更新时传入id字段
     * @return 响应结果
     */
    @PostMapping
    CarriageDTO saveOrUpdate(@RequestBody CarriageDTO carriageDto);

    /**
     * 运费模板列表
     *
     * @return 响应结果
     */
    @GetMapping
    List<CarriageDTO> findAll();

    /**
     * 删除运费模板
     *
     * @param id 运费模板id
     */
    @DeleteMapping("{id}")
    void delete(@PathVariable("id") Long id);

    /**
     * 运费计算
     *
     * @param waybillDTO 运单相关数据
     * @return 运费模板对象，不仅包含模板数据还包含：computeWeight、expense 字段
     */
    @PostMapping("compute")
    CarriageDTO compute(@RequestBody WaybillDTO waybillDTO);
}
