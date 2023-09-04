package com.sl.ms.trade.handler.wechat.response;

import cn.hutool.core.util.CharsetUtil;
import lombok.Data;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;

/**
 * @author zzj
 * @version 1.0
 */
@Data
public class WeChatResponse {

    private int status; //响应状态码
    private String body; //响应体数据

    public WeChatResponse() {

    }

    public WeChatResponse(CloseableHttpResponse response) {
        this.status = response.getStatusLine().getStatusCode();
        try {
            this.body = EntityUtils.toString(response.getEntity(), CharsetUtil.UTF_8);
        } catch (Exception e) {
            // 如果出现异常，响应体为null
        }
    }

    public Boolean isOk() {
        return this.status == 200;
    }

}
