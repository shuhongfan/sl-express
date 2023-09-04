package com.sl.transport.entity.line;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 运输路线实体
 * @author zzj
 * @version 1.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportLine {

    private Long id;
    private String number; // 编号
    private Double cost; //成本
    private Integer type; //类型
    private String name; //路线名称
    private Double distance; //距离，单位：米
    private Long time; //时间，单位：秒
    private Long created; //创建时间
    private Long updated; //修改时间
    private String extra; //扩展字段，以json格式存储
    private Long startOrganId; //起点机构id
    private String startOrganName; //起点机构名称，只有在查询时返回
    private Long endOrganId; //终点机构id
    private String endOrganName; //终点机构名称，只有在查询时返回

}
