package com.sl.ms.base.api.truck;

import com.sl.ms.base.domain.truck.TruckLicenseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

@FeignClient(name = "sl-express-ms-base", contextId = "TruckLicense", path = "base/truck/license")
@ApiIgnore
public interface TruckLicenseFeign {
    /**
     * 保存车辆行驶证信息
     *
     * @param dto 车辆行驶证信息
     * @return 车辆行驶证信息
     */
    @PostMapping
    TruckLicenseDto saveTruckLicense(@RequestBody TruckLicenseDto dto);

    /**
     * 根据id获取车辆行驶证详情
     *
     * @param id 车辆行驶证id
     * @return 车辆行驶证信息
     */
    @GetMapping("/{id}")
    TruckLicenseDto fineById(@PathVariable(name = "id") Long id);
}
