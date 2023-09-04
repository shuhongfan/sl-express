package com.sl.transport.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 运输路线对象
 */
@Data
public class TransportLineNodeDTO {

    @ApiModelProperty(value = "节点列表", required = true)
    private List<OrganDTO> nodeList = new ArrayList<>();
    @ApiModelProperty(value = "路线成本", required = true)
    private Double cost = 0d;

}
