package com.sl.ms.oms.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@ApiModel("订单模糊搜索参数")
@Data
public class OrderSearchDTO extends OrderDTO {

    /**
     * 页码
     */
    @ApiModelProperty(value = "页码", required = true, example = "1")
    private Integer page;


    /**
     * 总页数
     */
    @ApiModelProperty(value = "总页数", required = true, example = "10")
    private Integer pageSize;

    /**
     * 订单编号
     */
    @ApiModelProperty(value = "订单编号", required = false)
    private String orderId;

    /**
     * 发件人姓名
     */
    @ApiModelProperty(value = "发件人姓名", required = false)
    private String senderName;

    /**
     * 发件人电话
     */
    @ApiModelProperty(value = "发件人电话", required = false)
    private String senderPhone;

    /**
     * 发件人所在省份Id
     */
    @ApiModelProperty(value = "发件人所在省份Id", required = false)
    private Long senderProvinceId;


    /**
     * 发件人所在市Id
     */
    @ApiModelProperty(value = "发件人所在市Id", required = false)
    private Long senderCityId;

    /**
     * 发件人所在区Id 集合
     */
    @ApiModelProperty(value = "发件人所在区Id集合", required = false)
    private List<Long> senderCountyIds;

    /**
     * 收件人姓名
     */
    @ApiModelProperty(value = "收件人姓名", required = false)
    private String receiverName;

    /**
     * 收件人电话
     */
    @ApiModelProperty(value = "收件人电话", required = false)
    private String receiverPhone;


    /**
     * 收件人所在省份Id
     */
    @ApiModelProperty(value = "收件人所在省份Id", required = false)
    private Long receiverProvinceId;


    /**
     * 收件人所在市Id
     */
    @ApiModelProperty(value = "收件人所在市Id", required = false)
    private Long receiverCityId;

    /**
     * 收件人所在区Id 集合
     */
    @ApiModelProperty(value = "收件人所在区Id集合", required = false)
    private List<Long> receiverCountyIds;

    /**
     * 订单状态
     */
    @ApiModelProperty(value = "订单状态", required = true, example = "0")
    private Integer orderStatus;

    /**
     * 客户id
     */
    @ApiModelProperty(value = "客户id")
    private Long memberId;

    /**
     * 公用搜索字段
     */
    @ApiModelProperty(value = "公用搜索字段")
    private String keyword;

    public Integer getPage() {
        return page == null ? 1 : page;
    }

    public Integer getPageSize() {
        return pageSize == null ? 10 : pageSize;
    }

}
