package com.sl.ms.base.api.common;

import com.sl.ms.base.domain.base.AreaDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 角色API
 */
@FeignClient(name = "sl-express-ms-base", contextId = "Area", path = "/area")
@ApiIgnore
public interface AreaFeign {
    /**
     * 根据id获取行政区域详情
     *
     * @param id 行政区域id
     * @return 行政区域id
     */
    @GetMapping("/{id}")
    AreaDto get(@PathVariable(value = "id") Long id);

    /**
     * 根据区域编码获取区域
     *
     * @param code 行政编码
     * @return 行政区域
     */
    @GetMapping("/code/{code}")
    AreaDto getByCode(@PathVariable(value = "code") String code);

    /**
     * 根据父级id查询子级行政区域
     *
     * @param parentId 父级id
     * @return 子级行政区域列表
     */
    @GetMapping("/children")
    public List<AreaDto> findChildren(@RequestParam("parentId") Long parentId);

    /**
     * 根据id批量查询
     *
     * @param ids id列表
     * @return 行政区域列表
     */
    @GetMapping("/batch")
    public List<AreaDto> findBatch(@RequestParam("ids") List<Long> ids);
}
