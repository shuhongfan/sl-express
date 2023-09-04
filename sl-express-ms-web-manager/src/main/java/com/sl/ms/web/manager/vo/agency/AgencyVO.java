package com.sl.ms.web.manager.vo.agency;

import cn.hutool.core.annotation.Alias;
import com.sl.ms.web.manager.vo.baseCommon.AreaSimpleVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@ApiModel(value = "机构信息")
public class AgencyVO {

    @ApiModelProperty(value = "所属省份")
    private AreaSimpleVO province;

    @ApiModelProperty(value = "所属城市")
    private AreaSimpleVO city;

    @ApiModelProperty(value = "所属区县")
    private AreaSimpleVO county;

    @ApiModelProperty(value = "父级机构")
    private AgencySimpleVO parent;

    @ApiModelProperty(value = "机构id", required = true)
    @Alias("bid")
    @NotNull(message = "机构id不能为空")
    private Long id;
    @ApiModelProperty(value = "名称", required = true)
    private String name;
    @ApiModelProperty(value = "类型，1:一级转运，2：二级转运，3:网点", required = true)
    @Max(value = 3, message = "类型值必须是1、2、3")
    @Min(value = 1, message = "类型值必须是1、2、3")
    private Integer type;
    @ApiModelProperty(value = "电话", required = true)
    private String phone;
    @ApiModelProperty(value = "地址", required = true)
    private String address;
    @ApiModelProperty(value = "纬度", required = true)
    private Double latitude;
    @ApiModelProperty(value = "经度", required = true)
    private Double longitude;
    @ApiModelProperty(value = "父节点id", required = true)
    private Long parentId;
    @ApiModelProperty(value = "负责人", required = true)
    private String managerName;
    @ApiModelProperty(value = "扩展字段，以json格式存储")
    private String extra;
    @ApiModelProperty(value = "是否可用", required = true)
    private Boolean status;
}
