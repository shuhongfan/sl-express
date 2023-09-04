package com.sl.ms.web.driver.vo.request;

import com.sl.ms.base.domain.enums.TruckAccidentTypeEnum;
import com.sl.ms.base.domain.enums.TruckBreakRulesTypeEnum;
import com.sl.ms.base.domain.enums.TruckFaultTypeEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;


@Data
public class DriverReturnRegisterVO {

    @ApiModelProperty(value = "运输任务id", required = true)
    private String id;

    @ApiModelProperty(value = "出车时间", required = true, example = "2022-07-18 17:00:00")
    private String startTime;

    @ApiModelProperty(value = "回车时间", required = true, example = "2022-07-18 17:00:00")
    private String endTime;

    @ApiModelProperty(value = "车辆是否违章", required = true)
    private Boolean isBreakRules;

    @ApiModelProperty(value = "违章类型，1-闯红灯，2-无证驾驶，3-超载，4-酒后驾驶，5-超速行驶，6-其他")
    private TruckBreakRulesTypeEnum breakRulesType;

    @ApiModelProperty(value = "违章说明，类型为“其他”时填写")
    private String breakRulesDescription;

    @ApiModelProperty(value = "罚款金额")
    private BigDecimal penaltyAmount;

    @ApiModelProperty(value = "扣分数据")
    private Integer deductPoints;

    @ApiModelProperty(value = "车辆是否故障", required = true)
    private Boolean isFault;

    @ApiModelProperty(value = "车辆是否可用")
    private Boolean isAvailable;

    @ApiModelProperty(value = "故障类型，1-发动机启动困难，2-不着车，3-漏油，4-漏水，5-照明失灵，6-有异响，7-排烟异常，8-温度异常，9-其他")
    private TruckFaultTypeEnum faultType;

    @ApiModelProperty(value = "故障说明，类型为“其他”时填写")
    private String faultDescription;

    @ApiModelProperty(value = "故障图片")
    private String faultImages;

    @ApiModelProperty(value = "是否出现事故", required = true)
    private Boolean isAccident;

    @ApiModelProperty(value = "事故类型，1-直行事故，2-追尾事故，3-超车事故，4-左转弯事故，5-右转弯事故，6-弯道事故，7-坡道事故，8-会车事故，9-其他")
    private TruckAccidentTypeEnum accidentType;

    @ApiModelProperty(value = "事故说明，类型为“其他”时填写")
    private String accidentDescription;

    @ApiModelProperty(value = "事故图片")
    private String accidentImages;
}
