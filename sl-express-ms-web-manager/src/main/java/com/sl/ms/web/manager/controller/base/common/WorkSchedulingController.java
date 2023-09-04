package com.sl.ms.web.manager.controller.base.common;

import com.alibaba.excel.exception.ExcelDataConvertException;
import com.alibaba.excel.util.CollectionUtils;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.base.WorkSchedulingQueryDTO;
import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.util.ExcelUtil;
import com.sl.ms.web.manager.util.ImportVOListener;
import com.sl.ms.web.manager.vo.baseCommon.WorkSchedulingAddVO;
import com.sl.ms.web.manager.vo.baseCommon.WorkSchedulingExportVO;
import com.sl.ms.web.manager.vo.baseCommon.WorkSchedulingVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 排班管理
 */
@RequestMapping("work-schedulings")
@Api(tags = "工作排班相关接口")
@RestController
@Slf4j
public class WorkSchedulingController {

    @Resource
    private BaseCommonService baseCommonService;

    @GetMapping
    @ApiOperation("分页查询排班")
    public R<PageResponse<WorkSchedulingDTO>> list(WorkSchedulingQueryDTO workSchedulingQueryDTO) {
        return R.success(baseCommonService.listWorkScheduling(workSchedulingQueryDTO));
    }

    @DeleteMapping("{id}/{operator}")
    @ApiOperation("删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "排班id"),
            @ApiImplicitParam(name = "operator", value = "操作人")
    })
    public R<Void> delete(@PathVariable("id") Long id, @PathVariable("operator") Long operator) {
        baseCommonService.deleteWorkScheduling(id, operator);
        return R.success();
    }

    @ApiOperation("人工调整")
    @PutMapping
    public R<Void> update(@RequestBody WorkSchedulingVO workSchedulingVO) {
        baseCommonService.updateWorkScheduling(workSchedulingVO);
        return R.success();
    }

    @ApiOperation("批量关联排班")
    @PostMapping
    public R<Void> batchSaveWorkScheduling(@RequestBody WorkSchedulingAddVO workSchedulingAddVO) {
        baseCommonService.batchSaveWorkScheduling(workSchedulingAddVO);
        return R.success();
    }

    @ApiOperation("下载排班模板")
    @GetMapping("/downExcelTemplate")
    ResponseEntity downExcelTemplate() {
        return baseCommonService.downExcelTemplate();
    }

    @ApiOperation("导入排班")
    @PostMapping("/uploadExcel")
    R uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            ImportVOListener ImportVOListener = new ImportVOListener();
            ExcelUtil.readExcel(file, WorkSchedulingExportVO.class, ImportVOListener);

            List<ExcelDataConvertException> listException = ImportVOListener.getListException();
            Set<String> infoSet = listException.stream().map(e -> "第" + (e.getRowIndex() + 1) + "行  第" + (e.getColumnIndex() + 1) + "列，").collect(Collectors.toSet());
            List<WorkSchedulingExportVO> list = ImportVOListener.getList();

            if (CollectionUtils.isEmpty(list)) {
                return R.error(-1, "上传文件为空");
            }

            if (list.size() > 2000) {
                return R.error(-1, "上传文件数不能超过2000");
            }

            if (CollectionUtils.isEmpty(infoSet)) {
                baseCommonService.batchSaveWorkScheduling(list);
                return R.success();
            }
            return R.error(-1, infoSet.toString() + "存在非法数据");

        } catch (Exception e) {
            log.error("上传Excel excelService-> uploadExcel 异常", e);
            return R.error(-1, "上传失败");
        }
    }
}
