package com.sl.transport.entity.node;

import com.sl.transport.enums.OrganTypeEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.geo.Point;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;

/**
 * @author zzj
 * @version 1.0
 */
@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {

    @Id
    @GeneratedValue
    @ApiModelProperty(value = "Neo4j ID", hidden = true)
    private Long id;
    @ApiModelProperty(value = "父节点id", required = true)
    private Long parentId;
    @ApiModelProperty(value = "业务id", required = true)
    private Long bid;
    @ApiModelProperty(value = "名称", required = true)
    private String name;
    @ApiModelProperty(value = "负责人", required = true)
    private String managerName;
    @ApiModelProperty(value = "电话", required = true)
    private String phone;
    @ApiModelProperty(value = "地址", required = true)
    private String address;
    @ApiModelProperty(value = "位置坐标, x: 纬度，y: 经度", required = true)
    private Point location;
    @ApiModelProperty(value = "是否可用", required = true)
    private Boolean status;
    @ApiModelProperty(value = "扩展字段，以json格式存储")
    private String extra;

    //机构类型
    public abstract OrganTypeEnum getAgencyType();

}
