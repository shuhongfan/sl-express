package com.sl.ms.web.manager.vo.baseCommon;

import com.alibaba.excel.annotation.ExcelProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class WorkSchedulingAddVO {
    @ApiModelProperty("用户ID列表")
    private List<Long> userIdList;

    @ApiModelProperty("工作模式id")
    private Long workPatternId;

    @ApiModelProperty("工作模式类型，1:礼拜制，2：连续制")
    private Byte workPatternType;

    @ExcelProperty("用户类型：1：员工，2：快递员，3:司机")
    private Byte userType;

}
