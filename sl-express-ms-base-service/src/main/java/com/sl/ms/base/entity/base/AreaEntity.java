package com.sl.ms.base.entity.base;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 实体类
 * 行政区域
 * </p>
 *
 */

@Data

@TableName("sl_area")

public class AreaEntity extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * 父级行政区域id
     */
    private Long parentId;

    /**
     * 行政区域名称
     */
    private String name;

    /**
     * 行政区域编码
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
