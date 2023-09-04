package com.sl.transport.common.service;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * 温馨提示：
 * 1.解析结果时，先判断code
 * 2.出现'无记录'时，有以下几种原因
 *     (1)现役军人、武警官兵、特殊部门人员及特殊级别官员；
 *     (2)退役不到2年的军人和士兵（根据军衔、兵种不同，时间会有所不同，一般为2年）；
 *     (3)户口迁出，且没有在新的迁入地迁入；
 *     (4)户口迁入新迁入地，当地公安系统未将迁移信息上报到公安部（上报时间地域不同而有所差异）；
 *     (5)更改姓名，当地公安系统未将更改信息上报到公安部（上报时间因地域不同而有所差异）；
 *     (6)移民；
 *     (7)未更换二代身份证；
 *     (8)死亡。
 *     (9)身份证号确实不存在
 * {
 *     "code": "0", //返回码，0：成功，非0：失败（详见错误码定义）
 *           //当code=0时，再判断下面result中的res；当code!=0时，表示调用已失败，无需再继续
 *     "message": "成功", //返回码说明
 *     "result": {
 *         "name": "冯天", //姓名
 *         "idcard": "350301198011129422", //身份证号
 *         "res": "1", //核验结果状态码，1 一致；2 不一致；3 无记录
 *         "description": "一致",  //核验结果状态描述
 *        "sex": "男",
 *         "birthday": "19940320",
 *         "address": "江西省南昌市东湖区"
 *     }
 * }
 */
@Data
@AllArgsConstructor
@Slf4j
public class RealNameVerifyService {

    private String url;
    private String appCode;

    /**
     * 实名认证
     *
     * @param name   姓名
     * @param idCard 身份证号
     * @return 是否通过认证
     * @throws IOException io异常
     */
    public boolean realNameVerify(String name, String idCard) throws IOException {
        Map<String, String> params = new HashMap<>();
        params.put("idcard", idCard);
        params.put("name", name);

        OkHttpClient client = new OkHttpClient.Builder().build();
        FormBody.Builder formbuilder = new FormBody.Builder();
        Iterator<String> it = params.keySet().iterator();
        while (it.hasNext()) {
            String key = it.next();
            formbuilder.add(key, params.get(key));
        }
        FormBody body = formbuilder.build();
        Request request = new Request.Builder().url(url).addHeader("Authorization", "APPCODE " + appCode).post(body).build();
        Response response = client.newCall(request).execute();
        log.info("返回状态码" + response.code() + ",message:" + response.message());

        if (ObjectUtil.notEqual(response.code(), 200)) {
            return false;
        }

        String flag = (String) JSONUtil.parseObj(response.body().string()).getJSONObject("result").get("res");

        return ObjectUtil.equal(flag, "1");
    }
}