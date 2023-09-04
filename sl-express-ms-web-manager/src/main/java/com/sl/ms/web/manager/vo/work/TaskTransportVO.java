package com.sl.ms.web.manager.vo.work;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.ms.web.manager.vo.baseTruck.TransportTripsVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@ApiModel(value = "运输任务信息")
public class TaskTransportVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "车次")
    private TransportTripsVO transportTrips;

    @ApiModelProperty(value = "起始机构")
    private AgencySimpleVO startAgency;

    @ApiModelProperty(value = "目的机构")
    private AgencySimpleVO endAgency;

    @ApiModelProperty(value = "任务状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为待确认（保留状态）、4为已完成（对应 已交付）、5为已取消")
    private Integer status;

    @ApiModelProperty(value = "任务分配状态(2已分配3待人工分配)")
    private Integer assignedStatus;

    @ApiModelProperty(value = "满载状态(1.半载2.满载3.空载)")
    private Integer loadingStatus;

    @ApiModelProperty(value = "车辆")
    private TruckVO truck;

    @ApiModelProperty(value = "提货凭证")
    private String cargoPickUpPicture;

    @ApiModelProperty(value = "货物照片")
    private String cargoPicture;

    @ApiModelProperty(value = "运回单凭证")
    private String transportCertificate;

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


    @ApiModelProperty(value = "交付货物照片")
    private String deliverPicture;

    @ApiModelProperty(value = "提货纬度")
    private String deliveryLatitude;

    @ApiModelProperty(value = "提货经度")
    private String deliveryLongitude;

    @ApiModelProperty(value = "交付纬度")
    private String deliverLatitude;

    @ApiModelProperty(value = "交付经度")
    private String deliverLongitude;

    @ApiModelProperty(value = "任务创建时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime createTime;

    @ApiModelProperty(value = "运单列表")
    private List<TransportOrderVO> transportOrders;

    @ApiModelProperty(value = "司机列表")
    private List<SysUserVO> drivers;

    @ApiModelProperty(value = "运单数量")
    private Integer transportOrderCount;

    @ApiModelProperty(value = "司机姓名，查询条件")
    private String driverName;

    @ApiModelProperty(value = "剩余时间")
    private String remainingTime;

    @ApiModelProperty(value = "线路名称")
    private String transportLineName;

    @ApiModelProperty(value = "线路Id")
    private Long transportLineId;

    @ApiModelProperty("更新时间")
    private LocalDateTime updated;

}
