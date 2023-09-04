package com.sl.ms.web.manager.controller.agency;

import com.sl.ms.web.manager.service.AgencyService;
import com.sl.ms.web.manager.service.AuthService;
import com.sl.ms.web.manager.vo.agency.AgencyUpdateVO;
import com.sl.ms.web.manager.vo.agency.AgencyVO;
import com.sl.ms.web.manager.vo.agency.ServiceScopeVO;
import com.sl.ms.web.manager.vo.auth.CourierVO;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 网点管理
 */
@RestController
@Api(tags = "网点管理")
@RequestMapping("business-hall")
@Slf4j
public class AgencyController {
    @Resource
    private AgencyService agencyService;

    @Resource
    private AuthService authService;

    @ApiOperation(value = "获取树状机构信息")
    @GetMapping("/tree")
    public R<String> treeAgency() {
        return R.success(agencyService.treeAgency());
    }

    @ApiOperation(value = "获取机构详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "机构id", required = true, example = "1")
    })
    @GetMapping("/{id}")
    public R<AgencyVO> findAgencyById(@PathVariable(name = "id") Long id) {
        return R.success(agencyService.agencyDetail(id));
    }

    @ApiOperation(value = "编辑机构")
    @PostMapping
    public R<AgencyVO> save(@RequestBody AgencyUpdateVO agencyVO) {
        agencyService.saveAgency(agencyVO);
        return R.success();
    }

    @ApiOperation(value = "获取员工详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "员工id", required = true, example = "1")
    })
    @GetMapping("/user/{id}")
    public R<SysUserVO> findById(@PathVariable(name = "id") Long id) {
        return R.success(authService.user(id));
    }

    @ApiOperation(value = "获取员工分页数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1"),
            @ApiImplicitParam(name = "pageSize", value = "页尺寸", required = true, example = "10"),
            @ApiImplicitParam(name = "name", value = "司机名称"),
            @ApiImplicitParam(name = "account", value = "司机编号 账号"),
            @ApiImplicitParam(name = "agencyId", value = "机构ID"),
            @ApiImplicitParam(name = "phone", value = "电话")
    })
    @GetMapping("/user/page")
    public R<PageResponse<SysUserVO>> findUserByPage(@RequestParam(name = "page") Integer page,
                                                     @RequestParam(name = "pageSize") Integer pageSize,
                                                     @RequestParam(name = "name", required = false) String name,
                                                     @RequestParam(name = "account", required = false) String account,
                                                     @RequestParam(name = "agencyId", required = false) Long agencyId,
                                                     @RequestParam(name = "phone", required = false) String phone) {
        return R.success(authService.findUserByPage(page, pageSize, agencyId, account, name, phone));

    }

    @ApiOperation(value = "获取快递员分页数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1"),
            @ApiImplicitParam(name = "pageSize", value = "页尺寸", required = true, example = "10"),
            @ApiImplicitParam(name = "name", value = "司机名称"),
            @ApiImplicitParam(name = "account", value = "司机编号 账号"),
            @ApiImplicitParam(name = "agentId", value = "机构ID"),
            @ApiImplicitParam(name = "phone", value = "电话")
    })
    @GetMapping("/courier/page")
    public R<PageResponse<SysUserVO>> findCourierByPage(@RequestParam(name = "page") Integer page,
                                                        @RequestParam(name = "pageSize") Integer pageSize,
                                                        @RequestParam(name = "name", required = false) String name,
                                                        @RequestParam(name = "account", required = false) String account,
                                                        @RequestParam(name = "agentId", required = false) Long agentId,
                                                        @RequestParam(name = "phone", required = false) String phone) {
        return R.success(authService.findCourierByPage(page, pageSize, name, phone, account, agentId));
    }

    @ApiOperation(value = "获取快递员详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "快递员id", required = true, example = "1")
    })
    @GetMapping("/courier/{id}")
    public R<SysUserVO> findCourierById(@PathVariable(name = "id") String id) {
        return R.success(authService.user(Long.valueOf(id)));
    }

    @ApiOperation(value = "删除作业范围")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "id", required = true, example = "1"),
            @ApiImplicitParam(name = "type", value = "type", required = true, example = "1")
    })
    @DeleteMapping("/scope/{id}/{type}")
    public R<Void> deleteScopeById(@PathVariable(name = "id") Long id, @PathVariable(name = "type") Integer type) {
        agencyService.deleteScopeById(id, type);
        return R.success();
    }

    @ApiOperation(value = "保存业务范围")
    @PostMapping("/scope")
    public R<Void> saveScope(@RequestBody ServiceScopeVO vo) {
        agencyService.saveScope(vo);
        return R.success();
    }

    @ApiOperation(value = "获取业务范围")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "id", required = true, example = "1"),
            @ApiImplicitParam(name = "type", value = "type", required = true, example = "1")
    })
    @GetMapping("/scope/{id}/{type}")
    public R<ServiceScopeVO> findScope(@PathVariable(name = "id") Long id, @PathVariable(name = "type") Integer type) {
        return R.success(agencyService.findScope(id, type));
    }

    @ApiOperation(value = "根据机构查询快递员")
    @ApiImplicitParams({@ApiImplicitParam(name = "agencyId", value = "机构ID")})
    @GetMapping("/courier/findByAgencyId/{agencyId}")
    public R<List<CourierVO>> findByAgencyId(@PathVariable(name = "agencyId") Long agencyId) {
        return R.success(authService.findByAgencyId(agencyId));
    }
}
