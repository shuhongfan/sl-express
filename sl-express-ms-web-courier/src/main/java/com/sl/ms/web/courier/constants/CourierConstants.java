package com.sl.ms.web.courier.constants;

public class CourierConstants {

    /**
     * 订单信息字段
     */
    public interface OrderInfo {
        /**
         * 寄/收件人姓名
         */
        String NAME = "name";

        /**
         * 寄/收件人电话
         */
        String PHONE = "phone";

        /**
         * 寄/收件人地址
         */
        String ADDRESS = "address";

        /**
         * 寄/收件人坐标
         */
        String LOCATION = "location";
    }
}
