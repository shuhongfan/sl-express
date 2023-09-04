package com.sl.ms.web.driver.vo.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 司机作业单详情
 * @author ZJL
 */
@Data
@ApiModel("司机作业单详情")
public class DriverJobDetailVO {

    @ApiModelProperty(value = "司机作业单id")
    private String id;

    @ApiModelProperty(value = "起始机构id")
    private String startAgencyId;

    @ApiModelProperty(value = "起始省份")
    private String startProvince;

    @ApiModelProperty(value = "起始市")
    private String startCity;

    @ApiModelProperty(value = "起始机构详细地址")
    private String startAddress;

    @ApiModelProperty(value = "目的机构id")
    private String endAgencyId;

    @ApiModelProperty(value = "目的省份")
    private String endProvince;

    @ApiModelProperty(value = "目的市")
    private String endAddress;

    @ApiModelProperty(value = "目的机构详细地址")
    private String endCity;

    @ApiModelProperty(value = "作业状态，1为待提货）、2为在途）、3为改派）、4为已交付）、5为已作废")
    private Integer status;

    @ApiModelProperty(value = "司机id")
    private String driverId;

    @ApiModelProperty(value = "运输任务id")
    private String transportTaskId;

    @ApiModelProperty(value = "提货对接人")
    private String startHandover;

    @ApiModelProperty(value = "提货对接人电话")
    private String startHandoverPhone;

    @ApiModelProperty(value = "交付对接人")
    private String finishHandover;

    @ApiModelProperty(value = "交付对接人电话")
    private String finishHandoverPhone;

    @ApiModelProperty(value = "计划发车时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planDepartureTime;

    @ApiModelProperty(value = "实际发车时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime actualDepartureTime;

    @ApiModelProperty(value = "计划到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planArrivalTime;

    @ApiModelProperty(value = "实际到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime actualArrivalTime;

    @ApiModelProperty(value = "车牌号码")
    private String licensePlate;

    @ApiModelProperty(value = "司机姓名")
    private String driverName;

    @ApiModelProperty(value = "提货凭证")
    private List<String> cargoPickUpPicture;

    @ApiModelProperty(value = "提货图片")
    private List<String> cargoPicture;

    @ApiModelProperty(value = "回单凭证")
    private List<String> transportCertificate;

    @ApiModelProperty(value = "回单图片")
    private List<String> deliverPicture;
}
