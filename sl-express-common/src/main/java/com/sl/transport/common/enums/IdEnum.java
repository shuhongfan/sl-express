package com.sl.transport.common.enums;

/**
 * @author zzj
 * @version 1.0
 */
public enum IdEnum implements BaseEnum {

    TRANSPORT_ORDER(1, "运单号", "transport_order", "segment", "SL");

    private Integer code;
    private String value;
    private String biz; //业务名称
    private String type; //类型：自增长（segment），雪花id（snowflake）
    private String prefix;//id前缀

    IdEnum(Integer code, String value, String biz, String type, String prefix) {
        this.code = code;
        this.value = value;
        this.biz = biz;
        this.type = type;
        this.prefix = prefix;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.value;
    }

    public String getBiz() {
        return biz;
    }

    public String getType() {
        return type;
    }

    public String getPrefix() {
        return prefix;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("IdEnum{");
        sb.append("code=").append(code);
        sb.append(", value='").append(value).append('\'');
        sb.append(", biz='").append(biz).append('\'');
        sb.append(", type='").append(type).append('\'');
        sb.append(", prefix='").append(prefix).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
