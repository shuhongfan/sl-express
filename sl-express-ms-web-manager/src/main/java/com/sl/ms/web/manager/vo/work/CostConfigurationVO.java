package com.sl.ms.web.manager.vo.work;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("成本配置")
public class CostConfigurationVO {
    @ApiModelProperty(value = "线路类型，    TRUNK_LINE(1, \"干线\", \"一级转运中心到一级转运中心\"),\n" +
            "    BRANCH_LINE(2, \"支线\", \"一级转运中心与二级转运中心之间线路\"),\n" +
            "    CONNECT_LINE(3, \"接驳路线\", \"二级转运中心到网点\"),", required = true)
    @NotNull(message = "线路类型不能为空！")
    @Min(value = 1, message = "线路类型最小为1！")
    @Max(value = 3, message = "线路类型最大为3！")
    private Integer transportLineType;

    @ApiModelProperty(value = "成本，只支持输入数字，小数点后2位，不能为空\n" +
            "默认值：干线0.8元、支线1.2元、接驳1.5", required = true)
    @NotNull(message = "成本不能为空！")
    private Double cost;
}
