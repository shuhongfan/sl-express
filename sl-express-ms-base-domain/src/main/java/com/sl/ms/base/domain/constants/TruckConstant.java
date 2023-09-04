package com.sl.ms.base.domain.constants;

/**
 * 常量
 */
public class TruckConstant {
    /**
     * 数据状态-可用
     */
    public static final Integer DATA_DEFAULT_STATUS = 1;
    /**
     * 数据状态-禁用
     */
    public static final Integer DATA_DISABLE_STATUS = 0;

    /**
     * 车次周期
     */
    public enum TransportTripsPeriod {
        DAY(1, "天"), WEEK(2, "周"), MONTH(3, "月");
        private Integer period;
        private String name;

        TransportTripsPeriod(Integer period, String name) {
            this.period = period;
            this.name = name;
        }

        public Integer getPeriod() {
            return period;
        }

        public String getName() {
            return name;
        }

        public static TransportTripsPeriod getEnumByPeriod(Integer period) {
            if (null == period) {
                return null;
            }
            for (TransportTripsPeriod temp : TransportTripsPeriod.values()) {
                if (temp.getPeriod().equals(period)) {
                    return temp;
                }
            }
            return null;
        }
    }
}
