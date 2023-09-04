package com.sl.ms.web.manager.vo.baseCommon;

import com.alibaba.excel.annotation.ExcelProperty;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel("排班分页查询")
@Data
public class WorkSchedulingExportVO {

    @ExcelProperty("用户类型：1：员工，2：快递员，3:司机")
    private Byte userType;

    @ExcelProperty("网点")
    private Long agencyId;

    @ExcelProperty("员工名称")
    private String name;

    @ExcelProperty("员工编号")
    private String employeeNumber;

    @ExcelProperty("电话")
    private String phone;

    @ExcelProperty("工作模式id")
    private Long workPatternId;

    @ExcelProperty("工作模式类型，1:礼拜制，2：连续制")
    private Byte workPatternType;
}
