package com.sl.ms.user.api;

import com.sl.ms.user.domain.dto.AddressBookDTO;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@FeignClient(name = "sl-express-ms-user", path = "addressBook", contextId = "AddressBook")
@ApiIgnore
public interface AddressBookFeign {

    /**
     * 分页查询
     *
     * @param page 页码
     * @param pageSize 页大小
     * @param userId 用户ID
     * @return 地址簿
     */
    @GetMapping("page")
    PageResponse<AddressBookDTO> page(@RequestParam("page") Integer page,
                                      @RequestParam("pageSize") Integer pageSize,
                                      @RequestParam("userId")Long userId,
                                      @RequestParam("keyword") String keyword,
                                      @RequestParam("type") Integer type);

    /**
     * 新增
     *
     * @param dto 地址簿
     * @return 地址簿
     */
    @PostMapping
    AddressBookDTO save(@RequestBody AddressBookDTO dto);

    /**
     * 修改
     *
     * @param id 地址簿ID
     * @param dto 地址簿
     * @return 地址簿
     */
    @PutMapping("/{id}")
    AddressBookDTO update(@PathVariable(name = "id") Long id, @RequestBody AddressBookDTO dto);

    /**
     * 删除
     *
     * @param id 地址簿ID
     * @return 地址簿
     */
    @DeleteMapping("/{id}")
    AddressBookDTO del(@PathVariable(name = "id") Long id);

    /**
     * 详情
     *
     * @param id 地址簿ID
     * @return 地址簿
     */
    @GetMapping("detail/{id}")
    AddressBookDTO detail(@PathVariable(name = "id") Long id);
}
