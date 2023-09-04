package com.sl.ms.web.manager.util;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.alibaba.excel.exception.ExcelDataConvertException;
import com.google.common.collect.Lists;
import com.sl.ms.web.manager.vo.baseCommon.WorkSchedulingExportVO;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 导入Excel监听器
 */
@Slf4j
@Data
public class ImportVOListener extends AnalysisEventListener<WorkSchedulingExportVO> {

    List<WorkSchedulingExportVO> list = Lists.newLinkedList();

    List<ExcelDataConvertException> listException = new ArrayList<>();

    Map<Integer, String> excelHeadMap = new HashMap<>(10);

    @Override
    public void invoke(WorkSchedulingExportVO vo, AnalysisContext analysisContext) {
        if (!StrUtil.equals(JSONUtil.toJsonStr(vo), "{}")) {
            log.info("解析到一条数据:{}", JSONUtil.toJsonStr(vo));
            list.add(vo);
        }
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {
        log.info("所有数据解析完成！");
    }


    @Override
    public void invokeHeadMap(Map<Integer, String> headMap, AnalysisContext context) {
        excelHeadMap = headMap;
    }

    @Override
    public void onException(Exception exception, AnalysisContext context) {
        log.error("解析失败，但是继续解析下一行:{}", exception.getMessage());
        // 如果是某一个单元格的转换异常 能获取到具体行号
        // 如果要获取头的信息 配合invokeHeadMap使用
        if (exception instanceof ExcelDataConvertException) {
            ExcelDataConvertException excelDataConvertException = (ExcelDataConvertException) exception;
            log.error("第{}行，第{}列解析异常", excelDataConvertException.getRowIndex(),
                    excelDataConvertException.getColumnIndex());
            listException.add(excelDataConvertException);
        }
    }
}
