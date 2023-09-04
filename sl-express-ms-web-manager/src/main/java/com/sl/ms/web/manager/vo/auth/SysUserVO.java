package com.sl.ms.web.manager.vo.auth;

import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(value = "用户信息")
public class SysUserVO {
    @ApiModelProperty(value = "用户id")
    private Long userId;

    @ApiModelProperty(value = "员工账号")
    private String account;

    @ApiModelProperty(value = "员工姓名")
    private String name;

    @ApiModelProperty(value = "密码")
    private String password;

    @ApiModelProperty(value = "工号")
    private String workNumber;

    @ApiModelProperty(value = "邮箱")
    private String email;

    @ApiModelProperty(value = "所属机构信息")
    private AgencySimpleVO agency;

    @ApiModelProperty(value = "手机号")
    private String mobile;

    @ApiModelProperty(value = "岗位 1为员工 2为快递员 3为司机")
    private Integer station;

    @ApiModelProperty(value = "岗位名称")
    private String stationName;

    @ApiModelProperty(value = "头像")
    private String avatar;

    @ApiModelProperty(value = "账号状态 0：禁用   1：正常")
    private Integer status;

    @ApiModelProperty(value = "创建者信息")
    private SysUserVO creator;

    @ApiModelProperty(value = "创建时间,格式: yyyy-MM-dd HH:mm:ss")
    private String createTime;

    @ApiModelProperty(value = "角色信息")
    private List<String> roleNames;

    @ApiModelProperty(value = "工作状态 0休息 1上班")
    private Integer workStatus;

    @ApiModelProperty(value = "年龄")
    private Integer age;

    @ApiModelProperty("工作日期")
    private String workDate;

}
