package com.sl.ms.web.manager.vo.baseTruck;

import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "司机基本信息")
public class DriverVO {

    @ApiModelProperty(value = "司机ID")
    private Long id;

    @ApiModelProperty(value = "用户ID")
    private Long userId;

    @ApiModelProperty(value = "司机姓名")
    private String name;

    @ApiModelProperty(value = "工号")
    private String account;

    @ApiModelProperty(value = "所属机构信息")
    private AgencySimpleVO agency;

    @ApiModelProperty(value = "手机号")
    private String mobile;

    @ApiModelProperty(value = "使用车辆")
    private TruckVO truck;

    @ApiModelProperty(value = "工作状态 0休息 1上班")
    private Integer workStatus;

    @ApiModelProperty(value = "年龄")
    private Integer age;

    @ApiModelProperty("工作日期")
    private String workDate;

    /**
     * 图片信息
     */
    @ApiModelProperty(value = "图片信息")
    private String picture;

}
