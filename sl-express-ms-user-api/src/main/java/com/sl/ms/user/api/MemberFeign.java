package com.sl.ms.user.api;

import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@FeignClient(name = "sl-express-ms-user", path = "member", contextId = "Member")
@ApiIgnore
public interface MemberFeign {
    /**
     * 分页查询
     *
     * @param page
     * @param pageSize
     * @return
     */
    @GetMapping("page")
    PageResponse<MemberDTO> page(@RequestParam("page") Integer page, @RequestParam("pageSize") Integer pageSize);

    /**
     * 新增
     *
     * @param entity
     * @return
     */
    @PostMapping
    void save(@RequestBody MemberDTO entity);

    /**
     * 修改
     *
     * @param id
     * @param entity
     * @return
     */
    @PutMapping("/{id}")
    void update(@PathVariable(name = "id") Long id, @RequestBody MemberDTO entity);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    void del(@PathVariable(name = "id") Long id);

    /**
     * 详情
     *
     * @param id
     * @return
     */
    @GetMapping("detail/{id}")
    MemberDTO detail(@PathVariable(name = "id") Long id);

    /**
     * 详情
     *
     * @param openId
     * @return
     */
    @GetMapping("openId/{openId}")
    MemberDTO detailByOpenId(@PathVariable(name = "openId") String openId);
}
