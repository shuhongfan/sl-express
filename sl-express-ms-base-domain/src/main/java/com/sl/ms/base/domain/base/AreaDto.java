package com.sl.ms.base.domain.base;

import lombok.Data;

@Data
public class AreaDto {

    /**
     * id
     */
    private Long id;
    /**
     * 父级行政
     */
    private Long parentId;

    /**
     * 行政名称
     */
    private String name;
    /**
     * 行政区域编号
     */
    private String areaCode;
    /**
     * 城市编码
     */
    private String cityCode;
    /**
     * 合并名称
     */
    private String mergerName;
    /**
     * 简称
     */
    private String shortName;
    /**
     * 邮政编码
     */
    private String zipCode;

    /**
     * 行政区域等级（0: 省级 1:市级 2:县级 3:镇级 4:乡村级）
     */
    private Integer level;
    /**
     * 经度
     */
    private String lng;
    /**
     * 纬度
     */
    private String lat;

    /**
     * 拼音
     */
    private String pinyin;

    /**
     * 首字母
     */
    private String first;
}
