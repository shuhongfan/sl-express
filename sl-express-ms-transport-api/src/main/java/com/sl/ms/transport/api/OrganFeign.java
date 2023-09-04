package com.sl.ms.transport.api;

import com.sl.transport.domain.OrganDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-transport", contextId = "Organ", path = "/organs")
@ApiIgnore
public interface OrganFeign {

    /**
     * 根据id查询机构数据
     *
     * @param id 机构id
     * @return 机构数据
     */
    @GetMapping("{id}")
    OrganDTO queryById(@PathVariable("id") Long id);

    /**
     * 根据ids查询机构数据
     *
     * @param ids 机构id
     * @return 机构数据
     */
    @GetMapping("/ids")
    List<OrganDTO> queryByIds(@RequestParam("ids") List<Long> ids);

    /**
     * 更新机构数据，id、type参数是必填的
     *
     * @param organDTO 机构数据
     */
    @PutMapping
    void update(@RequestBody OrganDTO organDTO);

    /**
     * 查询所有的机构，如果name不为空的按照name模糊查询
     *
     * @param name 机构名称
     * @return 机构数据列表
     */
    @GetMapping("all")
    List<OrganDTO> findAll(@RequestParam(value = "name", required = false) String name);

    /**
     * 查询机构树
     *
     * @return 机构树，json格式，例如：[{"id":987328060552418593,"parentId":0,"name":"上海市转运中心","type":1,"status":true,"children":[{"id":987328165208692129,"parentId":987328060552418593,"name":"浦东新区分拣中心","type":2,"status":true,"children":[{"id":987328223597598241,"parentId":987328165208692129,"name":"航头营业部","type":3,"status":true}]}]},{"id":987327492140340001,"parentId":0,"name":"北京市转运中心","type":1,"latitude":39.762879,"longitude":116.390892,"status":true,"children":[{"id":987327680636556193,"parentId":987327492140340001,"name":"昌平区分拣中心","type":2,"status":true,"children":[{"id":987327807359063073,"parentId":987327680636556193,"name":"回龙观营业部","type":3,"status":true}]},{"id":987327971847083169,"parentId":987327492140340001,"name":"海淀区分拣中心","type":2,"latitude":39.959893,"longitude":116.2977,"status":true}]}]
     */
    @GetMapping("tree")
    String findAllTree();

}
