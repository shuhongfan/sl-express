# 课程安排
- 单token存在的问题
- 双token三验证
- 用户端token校验与鉴权
- 对接三方支付平台
- 分布式锁
# 1、场景说明
新入职的你加入了开发一组，也接到了开发任务，并且你也顺利的修复了bug，完成了快递员、司机的鉴权，现在的你已经对项目的业务功能、开发环境以及网关代码设计都有了一定的了解，但是对于**用户端**的校验和鉴权并没有涉及，接下来你需要完成用户端的校验和鉴权。另外，需要你了解下如何与三方支付平台对接，因为后面你需要接手支付微服务的开发。
![w.gif](https://cdn.nlark.com/yuque/0/2022/gif/27683667/1671185096594-ebd98065-3ca5-4a7e-8293-25983f51ebf3.gif#averageHue=%23ece2cd&clientId=ufc346088-d017-4&from=paste&height=160&id=uc483ff31&name=w.gif&originHeight=240&originWidth=240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87315&status=done&style=none&taskId=u62aa2117-2ad5-4bfc-8866-7d7cf1da605&title=&width=160)
# 2、单token存在的问题
在司机端、快递员端和管理管，登录成功后会生成jwt的token，前端将此token保存起来，当请求后端服务时，在请求头中携带此token，服务端需要对token进行校验以及鉴权操作，这种模式就是【单token模式】。
该模式存在什么问题吗？
其实是有问题的，主要是token有效期设置长短的问题，如果设置的比较短，用户会频繁的登录，如果设置的比较长，会不太安全，因为token一旦被黑客截取的话，就可以通过此token与服务端进行交互了。
另外一方面，token是无状态的，也就是说，服务端一旦颁发了token就无法让其失效（除非过了有效期），这样的话，如果我们检测到token异常也无法使其失效，所以这也是无状态token存在的问题。
为了解决此问题，我们将采用【双token三验证】的解决方案来解决此问题。
# 3、双token三验证
为了解决单token模式下存在的问题，所以我们可以通过【双token三验证】的模式进行改进实现，主要解决的两个问题如下：

- token有效期长不安全
   - 登录成功后，生成2个token，分别是：access_token、refresh_token，前者有效期短（如：5分钟），后者的有效期长（如：24小时）
   - 正常请求后端服务时，携带access_token，如果发现access_token失效，就通过refresh_token到后台服务中换取新的access_token和refresh_token，这个可以理解为token的续签
   - 以此往复，直至refresh_token过期，需要用户重新登录
- token的无状态性
   - 为了使token有状态，也就是后端可以控制其提前失效，需要将refresh_token设计成只能**使用一次**
   - 需要将refresh_token存储到redis中，并且要设置过期时间
   - 这样的话，服务端如果检测到用户token有安全隐患（如：异地登录），只需要将refresh_token失效即可

详细流程如下：
![](https://cdn.nlark.com/yuque/__puml/93e665920cbae23c15b75940115d20b3.svg#lake_card_v2=eyJ0eXBlIjoicHVtbCIsImNvZGUiOiJAc3RhcnR1bWxcblxuYXV0b251bWJlclxuXG5hY3RvciBcIuWJjeerr1wiIGFzIHVzZXJcbnBhcnRpY2lwYW50IFwi55m75b2V57O757ufXCIgYXMgbG9naW5cbnBhcnRpY2lwYW50IFwi5Lia5Yqh57O757ufXCIgYXMgbXNcbnBhcnRpY2lwYW50IFwiUmVkaXNcIiBhcyByZWRpc1xuXG51c2VyIC0-IGxvZ2luIC0tKys6IOeUqOaIt-WQjeWvhueggVxubG9naW4gLT4gbG9naW46IOeUn-aIkGFjY2Vzc190b2tlbuOAgVxcbnJlZnJlc2hfdG9rZW5cbmxvZ2luIC0-IHJlZGlzOiDlrZjlgqhyZWZyZXNoX3Rva2Vu5YiwcmVkaXNcbmxvZ2luIC0tPiB1c2VyIC0tOiDov5Tlm55hY2Nlc3NfdG9rZW7jgIFcXG5yZWZyZXNoX3Rva2VuXG51c2VyIC0-IG1zIC0tKys6IOivt-axguaVsOaNruaOpeWPo-aQuuW4pmFjY2Vzc190b2tlblxubXMgLT4gbXM6IOagoemqjHRva2Vu77yI5LiA5qyh5qCh6aqM77yJXG5tcyAtLT4gdXNlcjog5ZON5bqU57uT5p6cXG51c2VyIC0tPiBtczog6K-35rGC5pWw5o2u5o6l5Y-j5pC65bimYWNjZXNzX3Rva2VuXG5tcyAtPiBtczog5qCh6aqMdG9rZW7vvIjkuIDmrKHmoKHpqozvvIlcbm1zIC0tPiB1c2VyIC0tOiBhY2Nlc3NfdG9rZW7lpLHmlYjvvIzlk43lupQ0MDFcbnVzZXIgLT4gbG9naW4gLS0rKzog5Yi35pawdG9rZW7vvIzmkLrluKZyZWZyZXNoX3Rva2VuXG5sb2dpbiAtPiBsb2dpbjog5qCh6aqMdG9rZW7vvIjkuozmrKHmoKHpqozvvIlcbmxvZ2luIC0tPiB1c2VyOiB0b2tlbuaXoOaViO-8jOmHjeaWsOeZu-W9lVxubG9naW4gLT4gcmVkaXM6IHRva2Vu5pyJ5pWI77yM5LuOcmVkaXPkuK3mn6Xor6JcbmxvZ2luIC0-IGxvZ2luOiDliKTmlq1yZWRpc-S4reWtmOWCqOeahHJlZnJlc2hfdG9rZW5cXG7mmK_lkKblt7Lnu4_kvb_nlKjvvIjkuInmrKHmoKHpqozvvIlcbmxvZ2luIC0tPiB1c2VyOiB0b2tlbuaXoOaViO-8jOmHjeaWsOeZu-W9lVxubG9naW4gLT4gbG9naW46IHRva2Vu5pyJ5pWI77yM6YeN5paw55Sf5oiQYWNjZXNzX3Rva2Vu44CBXFxucmVmcmVzaF90b2tlblxubG9naW4gLT4gcmVkaXM6IOWIoOmZpOaXp-eahHJlZnJlc2hfdG9rZW7vvIzlrZjlgqjmlrDnmoRyZWZyZXNoX3Rva2Vu5YiwcmVkaXNcbmxvZ2luIC0tPiB1c2VyIC0tOiDov5Tlm57mlrDnmoRhY2Nlc3NfdG9rZW7jgIFcXG5yZWZyZXNoX3Rva2VuXG5cblxuQGVuZHVtbCIsInVybCI6Imh0dHBzOi8vY2RuLm5sYXJrLmNvbS95dXF1ZS9fX3B1bWwvOTNlNjY1OTIwY2JhZTIzYzE1Yjc1OTQwMTE1ZDIwYjMuc3ZnIiwiaWQiOiJkRkZjaiIsIm1hcmdpbiI6eyJ0b3AiOnRydWUsImJvdHRvbSI6dHJ1ZX0sImNhcmQiOiJkaWFncmFtIn0=)# 4、用户端token校验与鉴权
客户端的token是采用了【双token三验证】解决方案来实现的。
## 4.1、微信小程序登录流程
首先参考[前端部署文档](https://www.yuque.com/zhangzhijun-91vgw/xze2gr/rhyie35xipdqk9dg) 中的用户端部署步骤进行部署。
用户端是采用微信小程序开发的，所以需要整合小程序的登录，具体的登录流程如下：
![](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1671450361623-0b1d7cba-382b-4b1b-9def-3475cfd57021.jpeg#averageHue=%23f7f7f7&clientId=uf5900014-1e77-4&from=paste&id=uaf6dce75&originHeight=720&originWidth=710&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&taskId=ufa9c200c-468f-4c59-b4e4-11a3479916b&title=%E5%9B%BE%E7%89%87%E6%9D%A5%E8%87%AA%EF%BC%9Ahttps%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fframework%2Fopen-ability%2Flogin.html)
更多内容参考微信小程序官方文档：[点击查看](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
## 4.2、基本流程
![](https://cdn.nlark.com/yuque/__puml/2be8c02d10efadc6e633250642bba57a.svg#lake_card_v2=eyJ0eXBlIjoicHVtbCIsImNvZGUiOiJAc3RhcnR1bWxcblxuYXV0b251bWJlclxuXG5hY3RvciBcIueUqOaIt-err1wiIGFzIHVzZXJcbnBhcnRpY2lwYW50IFwic2wtZXhwcmVzcy1nYXRld2F5XCIgYXMgZ2F0ZXdheVxucGFydGljaXBhbnQgXCJzbC1leHByZXNzLW1zLXdlYi1jdXN0b21lclwiIGFzIGN1c3RvbWVyXG5wYXJ0aWNpcGFudCBcIlJlZGlzXCIgYXMgcmVkaXNcblxudXNlciAtPiBjdXN0b21lciAtLSsrOiDnlKjmiLflkI3lr4bnoIFcbmN1c3RvbWVyIC0-IGN1c3RvbWVyOiDnlJ_miJBhY2Nlc3NfdG9rZW7jgIFcXG5yZWZyZXNoX3Rva2VuXG5jdXN0b21lciAtPiByZWRpczog5a2Y5YKocmVmcmVzaF90b2tlbuWIsHJlZGlzXG5jdXN0b21lciAtLT4gdXNlciAtLTog6L-U5ZueYWNjZXNzX3Rva2Vu44CBXFxucmVmcmVzaF90b2tlblxudXNlciAtPiBnYXRld2F5IC0tKys6IOivt-axguaVsOaNruaOpeWPo-aQuuW4pmFjY2Vzc190b2tlblxuZ2F0ZXdheSAtPiBnYXRld2F5OiDmoKHpqox0b2tlbu-8iOS4gOasoeagoemqjO-8iVxuZ2F0ZXdheSAtLT4gdXNlcjogYWNjZXNzX3Rva2Vu5aSx5pWI77yM5ZON5bqUNDAxXG5nYXRld2F5IC0-IGN1c3RvbWVyIC0tKys6IOagoemqjOmAmui_h--8jOi9rOWPkeivt-axglxuY3VzdG9tZXIgLT4gY3VzdG9tZXI6IOWkhOeQhuS4muWKoVxuY3VzdG9tZXIgLS0-IHVzZXIgLS06IOWTjeW6lOe7k-aenFxuXG51c2VyIC0-IGN1c3RvbWVyIC0tKys6IOWIt-aWsHRva2Vu77yM5pC65bimcmVmcmVzaF90b2tlblxuY3VzdG9tZXIgLT4gY3VzdG9tZXI6IOagoemqjHRva2Vu77yI5LqM5qyh5qCh6aqM77yJXG5jdXN0b21lciAtPiByZWRpczogdG9rZW7mnInmlYjvvIzku45yZWRpc-S4reafpeivolxuY3VzdG9tZXIgLT4gY3VzdG9tZXI6IOWIpOaWrXJlZGlz5Lit5a2Y5YKo55qEcmVmcmVzaF90b2tlblxcbuaYr-WQpuW3sue7j-S9v-eUqO-8iOS4ieasoeagoemqjO-8iVxuY3VzdG9tZXIgLS0-IHVzZXI6IHRva2Vu5peg5pWI77yM6YeN5paw55m75b2VXG5jdXN0b21lciAtPiBjdXN0b21lcjogdG9rZW7mnInmlYjvvIzph43mlrDnlJ_miJBhY2Nlc3NfdG9rZW7jgIFcXG5yZWZyZXNoX3Rva2VuXG5jdXN0b21lciAtPiByZWRpczog5Yig6Zmk5pen55qEcmVmcmVzaF90b2tlbu-8jOWtmOWCqOaWsOeahHJlZnJlc2hfdG9rZW7liLByZWRpc1xuY3VzdG9tZXIgLS0-IHVzZXIgLS06IOi_lOWbnuaWsOeahGFjY2Vzc190b2tlbuOAgVxcbnJlZnJlc2hfdG9rZW5cblxuQGVuZHVtbCIsInVybCI6Imh0dHBzOi8vY2RuLm5sYXJrLmNvbS95dXF1ZS9fX3B1bWwvMmJlOGMwMmQxMGVmYWRjNmU2MzMyNTA2NDJiYmE1N2Euc3ZnIiwiaWQiOiJBVER2YSIsIm1hcmdpbiI6eyJ0b3AiOnRydWUsImJvdHRvbSI6dHJ1ZX0sImNhcmQiOiJkaWFncmFtIn0=)## 4.3、阅读代码
在`sl-express-gateway`中将用户端的登录和刷新token地址设置到白名单中：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671499550068-7808b420-289b-48c7-bd18-9d44bd287926.png#averageHue=%23faf9f7&clientId=ua6671163-a00f-4&from=paste&height=53&id=u4cf81805&name=image.png&originHeight=80&originWidth=506&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3690&status=done&style=shadow&taskId=u18478d09-a00f-4986-81a5-d77d21bc409&title=&width=337.3333333333333)
### 4.3.1、登录
在登录接口中接收`com.sl.ms.web.customer.vo.user.UserLoginRequestVO`对象，该对象中包含了【登录临时凭证】和【手机号临时凭证】，其中【手机号临时凭证】是用于用户授权获取手机号的凭证，否则获取不到手机号。
```java
/**
 * C端用户登录
 */
@Data
public class UserLoginRequestVO {

    @ApiModelProperty("登录临时凭证")
    private String code;

    @ApiModelProperty("手机号临时凭证")
    private String phoneCode;
}
```
Controller方法定义如下：
```java
    /**
     * C端用户登录--微信登录
     *
     * @param userLoginRequestVO 用户登录信息
     * @return 登录结果
     */
    @PostMapping("/login")
    @ApiOperation("登录")
    public R<UserLoginVO> login(@RequestBody UserLoginRequestVO userLoginRequestVO) throws IOException {
        UserLoginVO login = memberService.login(userLoginRequestVO);
        return R.success(login);
    }
```
在MemberServiceImpl实现类中，主要完对于登录业务的实现，首先根据【登录临时凭证】通过微信开放平台接口进行查询，如果用户不存在就需要通过【手机号临时凭证】查询手机号，完成用户注册。
最终通过`com.sl.ms.web.customer.service.TokenService`生成token，分别生成了长短令牌。
```java
    /**
     * 登录
     *
     * @param userLoginRequestVO 登录code
     * @return 用户信息
     */
    @Override
    public UserLoginVO login(UserLoginRequestVO userLoginRequestVO) throws IOException {
        // 1 调用微信开放平台小程序的api，根据code获取openid
        JSONObject jsonObject = wechatService.getOpenid(userLoginRequestVO.getCode());
        // 2 若code不正确，则获取不到openid，响应失败
        if (ObjectUtil.isNotEmpty(jsonObject.getInt("errcode"))) {
            throw new SLWebException(jsonObject.getStr("errmsg"));
        }
        String openid = jsonObject.getStr("openid");

        /*
        * 3 根据openid从数据库查询用户
        * 3.1 如果为新用户，此处返回为null
        * 3.2 如果为已经登录过的老用户，此处返回为user对象 （包含openId,phone,unionId等字段）
         */
        MemberDTO user = getByOpenid(openid);

        /*
         * 4 构造用户数据，设置openId,unionId
         * 4.1 如果user为null，则为新用户，需要构建新的user对象，并设置openId,unionId
         * 4.2 如果user不为null，则为老用户，无需设置openId,unionId
         */
        user = ObjectUtil.isNotEmpty(user) ? user : MemberDTO.builder()
                // openId
                .openId(openid)
                // 平台唯一ID
                .authId(jsonObject.getStr("unionid"))
                .build();


        // 5 调用微信开放平台小程序的api获取微信绑定的手机号
        String phone = wechatService.getPhone(userLoginRequestVO.getPhoneCode());

        /*
         * 6 新用户绑定手机号或者老用户更新手机号
         * 6.1 如果user.getPhone()为null，则为新用户，需要设置手机号，并保存数据库
         * 6.2 如果user.getPhone()不为null，但是与微信获取到的手机号不一样 则表示用户改了微信绑定的手机号，需要设置手机号，并保存数据库
         * 以上俩种情况，都需要重新设置手机号，并保存数据库
         */
        if (ObjectUtil.notEqual(user.getPhone(), phone)) {
            user.setPhone(phone);
            save(user);
        }


        // 7 如果为新用户，查询数据库获取用户ID
        if (ObjectUtil.isEmpty(user.getId())) {
            user = getByOpenid(openid);
        }

        // 8 将用户ID存入token
        Map<String, Object> claims = MapUtil.<String, Object>builder()
                .put(Constants.GATEWAY.USER_ID, user.getId()).build();

        // 9 封装用户信息和双token，响应结果
        return UserLoginVO
                .builder()
                .openid(openid)
                .accessToken(this.tokenService.createAccessToken(claims))
                .refreshToken(this.tokenService.createRefreshToken(claims))
                .binding(StatusEnum.NORMAL.getCode())
                .build();
    }
```
### 4.3.2、TokenService
在TokenService中定义了3个方法，分别是：

- 创建AccessToken，短令牌时间单位为分钟
- 创建RefreshToken，长令牌时间单位为小时，需要将refreshToken转md5后存储到redis中，变成有状态的token
- 刷新token
   - 校验token的有效性
   - 校验redis中是否存在，如果不存在说明失效或已经使用过
   - 校验通过后，需要将原token删除
   - 重新生成长短令牌

代码实现如下：
```java
package com.sl.ms.web.customer.service.impl;

import cn.hutool.core.date.DateField;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.sl.ms.web.customer.properties.JwtProperties;
import com.sl.ms.web.customer.service.TokenService;
import com.sl.ms.web.customer.vo.user.UserLoginVO;
import com.sl.transport.common.util.JwtUtils;
import com.sl.transport.common.util.ObjectUtil;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.Duration;
import java.util.Map;

@Service
public class TokenServiceImpl implements TokenService {

    @Resource
    private JwtProperties jwtProperties;
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    public static final String REDIS_REFRESH_TOKEN_PREFIX = "SL_CUSTOMER_REFRESH_TOKEN_";

    @Override
    public String createAccessToken(Map<String, Object> claims) {
        //生成短令牌的有效期时间单位为：分钟
        return JwtUtils.createToken(claims, jwtProperties.getPrivateKey(), jwtProperties.getAccessTtl(),
                DateField.MINUTE);
    }

    @Override
    public String createRefreshToken(Map<String, Object> claims) {
        //生成长令牌的有效期时间单位为：小时
        Integer ttl = jwtProperties.getRefreshTtl();
        String refreshToken = JwtUtils.createToken(claims, jwtProperties.getPrivateKey(), ttl);

        //长令牌只能使用一次，需要将其存储到redis中，变成有状态的
        String redisKey = this.getRedisRefreshToken(refreshToken);
        this.stringRedisTemplate.opsForValue().set(redisKey, refreshToken, Duration.ofHours(ttl));

        return refreshToken;
    }

    @Override
    public UserLoginVO refreshToken(String refreshToken) {
        if (StrUtil.isEmpty(refreshToken)) {
            return null;
        }

        Map<String, Object> originClaims = JwtUtils.checkToken(refreshToken, this.jwtProperties.getPublicKey());
        if (ObjectUtil.isEmpty(originClaims)) {
            //token无效
            return null;
        }

        //通过redis校验，原token是否使用过，来确保token只能使用一次
        String redisKey = this.getRedisRefreshToken(refreshToken);
        Boolean bool = this.stringRedisTemplate.hasKey(redisKey);
        if (ObjectUtil.notEqual(bool, Boolean.TRUE)) {
            //原token过期或已经使用过
            return null;
        }
        //删除原token
        this.stringRedisTemplate.delete(redisKey);

        //重新生成长短令牌
        String newRefreshToken = this.createRefreshToken(originClaims);
        String accessToken = this.createAccessToken(originClaims);

        return UserLoginVO.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    private String getRedisRefreshToken(String refreshToken) {
        //md5是为了缩短key的长度
        return REDIS_REFRESH_TOKEN_PREFIX + SecureUtil.md5(refreshToken);
    }
}

```
生成token使用的私钥配置在nacos中：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671505640679-63b187ac-0205-49b1-99e7-82487b0263c1.png#averageHue=%23a6a6a6&clientId=ua6671163-a00f-4&from=paste&height=538&id=u4d757361&name=image.png&originHeight=807&originWidth=1540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=113081&status=done&style=shadow&taskId=uc6c3841d-e7a0-4759-9a72-c3d4ef49f42&title=&width=1026.6666666666667)
### 4.3.3、刷新token
刷新token接收请求头中的`refresh_token`参数，用此参数来刷新新的长短令牌。具体代码如下：
```java
    /**
     * 刷新token，校验请求头中的长令牌，生成新的长短令牌
     *
     * @param refreshToken 原令牌
     * @return 登录结果
     */
    @PostMapping("/refresh")
    @ApiOperation("刷新token")
    public R<UserLoginVO> refresh(@RequestHeader(Constants.GATEWAY.REFRESH_TOKEN) String refreshToken) {
        UserLoginVO loginVO = memberService.refresh(refreshToken);
        if (ObjectUtil.isEmpty(loginVO)) {
            return R.error("刷新token失败，请重新登录.");
        }
        return R.success(loginVO);
    }
```
```java
    @Override
    public UserLoginVO refresh(String refreshToken) {
        return this.tokenService.refreshToken(refreshToken);
    }
```
## 4.4、网关校验
在网关中需要配置校验token的公钥，同样也是配置在nacos中：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671506553051-4e1b8737-e8ec-47a5-9ce9-da026b44c767.png#averageHue=%23242424&clientId=ua6671163-a00f-4&from=paste&height=78&id=u47067050&name=image.png&originHeight=117&originWidth=1301&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22559&status=done&style=shadow&taskId=u86d81387-9411-4cfc-83cf-9642f7b85d4&title=&width=867.3333333333334)
有了公钥就可以对token的合法性进行校验了，具体的代码实现：
```java
    @Override
    public AuthUserInfoDTO check(String token) {
        // 普通用户的token没有对接权限系统，需要自定实现
        // 鉴权逻辑在用户端自行实现 网关统一放行
        log.info("开始解析token {}", token);
        Map<String, Object> claims = JwtUtils.checkToken(token, jwtProperties.getPublicKey());
        if (ObjectUtil.isEmpty(claims)) {
            //token失效
            return null;
        }

        Long userId = MapUtil.get(claims, Constants.GATEWAY.USER_ID, Long.class);
        //token解析成功，放行
        AuthUserInfoDTO authUserInfoDTO = new AuthUserInfoDTO();
        authUserInfoDTO.setUserId(userId);
        return authUserInfoDTO;
    }
```
对于用户端只需要校验token即可，不需要鉴权。
## 4.5、测试
基于小程序进行功能测试即可。
# 5、对接三方支付平台
## 5.1、了解三方支付平台
第三方支付平台是指平台提供商通过通信、计算机和信息安全技术，在商家和银行之间建立连接，从而实现消费者、金融机构以及商家之间货币支付、现金流转、资金清算、查询统计的一个平台。
国内主流的三方支付平台有：支付宝、微信支付、京东支付、银联商务、拉卡拉、快钱支付、易宝支付等。
在课程中，我们主要是会对接**支付宝**和**微信支付**。
## 5.2、支付宝支付
### 5.2.1、开放平台
对接支付宝支付是通过支付宝的开放平台对接的，地址：[https://open.alipay.com/](https://open.alipay.com/)
通过开放平台可以基于支付宝完成各种应用开发：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671528219954-d4e35fa3-49e2-4c15-a8b2-65f120ff9811.png#averageHue=%23fcfcfc&clientId=u5aa83c24-f0b8-4&from=paste&height=467&id=ufb01bbdc&name=image.png&originHeight=701&originWidth=1749&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162784&status=done&style=shadow&taskId=u18360535-5533-4ab2-b526-45ac0493aff&title=&width=1166)
我们主要关注的是API，地址：[https://open.alipay.com/api](https://open.alipay.com/api)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671528283180-56ea3da6-4f2c-4184-9b72-e8b02bc576bd.png#averageHue=%23ded5b1&clientId=u5aa83c24-f0b8-4&from=paste&height=474&id=u5b25b5e4&name=image.png&originHeight=711&originWidth=1764&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79418&status=done&style=shadow&taskId=u2f746938-8080-450a-99ef-2fd02ad1759&title=&width=1176)
在支付API中，我们重点关注【当面付】这个API。
在当面付中，有两种支付场景，一种是【付款码支付】，另一种是【扫码支付】：
![付款码支付](https://cdn.nlark.com/yuque/0/2022/png/179989/1667186733330-d6872548-6955-4d9d-90b2-f8efd0868ac4.png?x-oss-process=image%2Fresize%2Cw_1800#averageHue=%23c7bba5&from=url&id=siylh&originHeight=1207&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=true&status=done&style=shadow&title=%E4%BB%98%E6%AC%BE%E7%A0%81%E6%94%AF%E4%BB%98 "付款码支付")
![扫码支付](https://cdn.nlark.com/yuque/0/2022/png/179989/1670205793965-8ee75812-1d7f-4155-bad7-8a8685badc9b.png?x-oss-process=image%2Fresize%2Cw_1800#averageHue=%23cacac9&from=url&id=UOja9&originHeight=941&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=true&status=done&style=shadow&title=%E6%89%AB%E7%A0%81%E6%94%AF%E4%BB%98 "扫码支付")
在这两种支付中，我们更关注【扫码支付】，因为在我们项目的业务场景中使用的就是【扫码支付】，业务场景是这样的：用户下单 → 快递员上门取件 → 取件成功 → 快递员出示收款二维码 → 用户拿出手机，打开支付宝APP，扫一扫进行支付
更多关于【当面付】内容请参阅[开发文档](https://opendocs.alipay.com/open/194/105072?ref=api)。
### 5.2.2、沙箱环境
对接支付宝，首先需要支付账号，而申请账号是有条件的：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671536454490-8c7d6303-ed16-4dcb-8681-0e0ea6270158.png#averageHue=%23f8f7f6&clientId=u5aa83c24-f0b8-4&from=paste&height=335&id=uc7a9870d&name=image.png&originHeight=502&originWidth=1000&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47531&status=done&style=shadow&taskId=u2c26794f-f539-471c-af24-3c717deaa98&title=&width=666.6666666666666)
所以，对于学生而言是比较难申请自己账号的。
支付宝为开发者提供了【沙箱环境】，沙箱环境是支付宝开放平台为开发者提供的与生产环境完全隔离的联调测试环境，开发者在沙箱环境中完成的接口调用不会对生产环境中的数据造成任何影响。
按照[开发文档](https://opendocs.alipay.com/common/02kkv7)配置沙箱环境账号。
设置完成后的账号信息（开启公钥加密模式）：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671537875910-d0c527c7-ea94-4555-901e-07ab212ea5bf.png#averageHue=%23faf9f9&clientId=u5aa83c24-f0b8-4&from=paste&height=534&id=u44195ce0&name=image.png&originHeight=801&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60209&status=done&style=shadow&taskId=u1e16528c-bfec-4c82-bae1-4f07901d813&title=&width=657.3333333333334)
沙箱环境对应的APP，自行下载并安装到手机中使用。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671593392632-e2e5979b-3864-41dd-a98e-66aa86cf0c58.png#averageHue=%23f9f8f8&clientId=u5aa83c24-f0b8-4&from=paste&height=480&id=uf47d1c41&name=image.png&originHeight=720&originWidth=1330&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72698&status=done&style=shadow&taskId=u25758fe7-15d1-4e7f-8aa6-6dce0c289f4&title=&width=886.6666666666666)
### 5.2.3、扫码支付
参考[扫码支付快速接入](https://opendocs.alipay.com/open/194/106078?ref=api)文档。
接入流程：
![](https://yuque.antfin.com/images/lark/0/2022/jpeg/210044/1668698883088-cfe7db2b-ab80-4de4-ac6e-c2551c101047.jpeg#from=url&id=pvNlb&originHeight=856&originWidth=1968&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
系统交互流程：
![](https://gw.alipayobjects.com/zos/skylark-tools/public/files/0dd5f9ae0c3da01ce2b9d6019efde979.png#from=url&id=qgxUe&originHeight=925&originWidth=837&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)

1. 商家系统调用[ alipay.trade.precreate](https://opendocs.alipay.com/open/02ekfg?scene=19)（统一收单线下交易预创建接口），获得该订单的二维码串 qr_code，开发者需要利用二维码生成工具获得最终的订单二维码图片。
2. 发起轮询获得支付结果：等待 5 秒后调用 [alipay.trade.query](https://opendocs.alipay.com/open/02ekfh?scene=23)（统一收单线下交易查询接口），通过支付时传入的商户订单号（out_trade_no）查询支付结果（返回参数 TRADE_STATUS）。
   1. 如果仍然返回等待用户付款（WAIT_BUYER_PAY），则再次等待 5 秒后继续查询，直到返回确切的支付结果（成功 TRADE_SUCCESS 或 已撤销关闭 TRADE_CLOSED），或是超出轮询时间。
   2. 在最后一次查询仍然返回等待用户付款的情况下，必须立即调用 [alipay.trade.cancel](https://opendocs.alipay.com/open/02ekfi)（统一收单交易撤销接口）将这笔交易撤销，避免用户继续支付。
3. 除了主动轮询，当订单支付成功时，商家也可以通过设置异步通知（notify_url）来获得支付宝服务端返回的支付结果，详情可查看 [扫码异步通知](https://opendocs.alipay.com/open/194/103296)，注意一定要对异步通知验签，确保通知是支付宝发出的。
注意：如商家由于客观原因（如无公网服务器接受支付宝请求等）无法接受异步支付通知，则忽略上图中的步骤 3.4 和 3.4.1。更多注意事项可点击查看 [异常处理](https://opendocs.alipay.com/open/194/105322/#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)。

交易状态流程：
![](https://yuque.antfin.com/images/lark/0/2022/png/210044/1668514572734-eb773fc9-daea-471f-b6fb-9479db1b311f.png#from=url&id=ynefl&originHeight=669&originWidth=1113&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
随着订单支付成功、退款、关闭等操作，订单交易的每一个环节 **trade_status**（交易状态）不同。

1. 交易创建成功后，用户支付成功，交易状态转为 **TRADE_SUCCESS**（交易成功）。
2. 交易成功后，规定退款时间内没有退款，交易状态转为 **TRADE_FINISHED**（交易完成）。
3. 交易支付成功后，交易部分退款，交易状态为 **TRADE_SUCCESS**（交易成功）。
4. 交易成功后，交易全额退款，交易状态转为 **TRADE_CLOSED**（交易关闭）。
5. 交易创建成功后，用户未付款交易超时关闭，交易状态转为 **TRADE_CLOSED**（交易关闭）。
6. 交易创建成功后，用户支付成功后，若用户商品不支持退款，交易状态直接转为 **TRADE_FINISHED**（交易完成）。

**注意**：交易成功后部分退款，交易状态仍为 **TRADE_SUCCESS**（交易成功），如果一直部分退款退完所有交易金额则交易状态转为 **TRADE_CLOSED**（交易关闭），如果未退完所有交易金额，超过有效退款时间后交易状态转为 **TRADE_FINISHED**（交易完成）不可退款。
### 5.2.4、SDK
对接支付宝的扫码支付，需要使用到支付宝提供的SDK，SDK有两种，分别是通用版和Easy版，其中Easy版使用起来更加的简单，我们在项目中将采用Easy版进行开发。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671605006145-7347f9ac-8edb-4512-a327-54944497a1e0.png#averageHue=%23f6f4f3&clientId=u5aa83c24-f0b8-4&from=paste&height=226&id=u8327fed6&name=image.png&originHeight=339&originWidth=957&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54315&status=done&style=shadow&taskId=u587a3c89-d086-4e3a-bba1-be2874fcabc&title=&width=638)
更多信息查看[文档](https://opendocs.alipay.com/open/02np95)。
通过maven坐标导入依赖：
```xml
<dependency>
    <groupId>com.alipay.sdk</groupId>
    <artifactId>alipay-easysdk</artifactId>
    <version>${alipay.easysdk.version}</version>
</dependency>
```
```java
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.factory.Factory.Payment;
import com.alipay.easysdk.kernel.Config;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.facetoface.models.AlipayTradePrecreateResponse;
public class Main {
    public static void main(String[] args) throws Exception {
        // 1. 设置参数（全局只需设置一次）
        Factory.setOptions(getOptions());
        try {
            // 2. 发起API调用（以创建当面付收款二维码为例）
            AlipayTradePrecreateResponse response = Payment.FaceToFace()
                    .preCreate("Apple iPhone11 128G", "2234567890", "5799.00");
            // 3. 处理响应或异常
            if (ResponseChecker.success(response)) {
                System.out.println("调用成功");
            } else {
                System.err.println("调用失败，原因：" + response.msg + "，" + response.subMsg);
            }
        } catch (Exception e) {
            System.err.println("调用遭遇异常，原因：" + e.getMessage());
            throw new RuntimeException(e.getMessage(), e);
        }
    }
    private static Config getOptions() {
        Config config = new Config();
        config.protocol = "https";
        config.gatewayHost = "openapi.alipay.com";
        config.signType = "RSA2";
        config.appId = "<-- 请填写您的AppId，例如：2019091767145019 -->";
        // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
        config.merchantPrivateKey = "<-- 请填写您的应用私钥，例如：MIIEvQIBADANB ... ... -->";
        //注：证书文件路径支持设置为文件系统中的路径或CLASS_PATH中的路径，优先从文件系统中加载，加载失败后会继续尝试从CLASS_PATH中加载
        config.merchantCertPath = "<-- 请填写您的应用公钥证书文件路径，例如：/foo/appCertPublicKey_2019051064521003.crt -->";
        config.alipayCertPath = "<-- 请填写您的支付宝公钥证书文件路径，例如：/foo/alipayCertPublicKey_RSA2.crt -->";
        config.alipayRootCertPath = "<-- 请填写您的支付宝根证书文件路径，例如：/foo/alipayRootCert.crt -->";
        //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
        // config.alipayPublicKey = "<-- 请填写您的支付宝公钥，例如：MIIBIjANBg... -->";
        //可设置异步通知接收服务地址（可选）
        config.notifyUrl = "<-- 请填写您的支付类接口异步通知接收服务地址，例如：https://www.test.com/callback -->";
        //可设置AES密钥，调用AES加解密相关接口时需要（可选）
        config.encryptKey = "<-- 请填写您的AES密钥，例如：aa4BtZ4tspm2wnXLb1ThQA== -->";
        return config;
    }
}
```
### 5.2.5、编写代码
拉取【sl-express-pay】工程，地址：[http://git.sl-express.com/sl/sl-express-pay.git](http://git.sl-express.com/sl/sl-express-pay.git)
编写`NativePayHandler`支付宝实现类，在此类中，完成与支付宝的对接，进行预下单，获取二维码链接，通过二维码生成工具生成二维码，通过沙箱版支付宝APP进行扫码支付。
```java
package com.sl.pay.handler.alipay;

import cn.hutool.core.convert.Convert;
import cn.hutool.json.JSONUtil;
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.facetoface.models.AlipayTradePrecreateResponse;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.enums.TradingStateEnum;
import com.sl.pay.handler.NativePayHandler;
import com.sl.transport.common.exception.SLException;
import org.springframework.stereotype.Component;

/**
 * 支付宝实现类
 */
@Component("aliNativePayHandler")
public class AliNativePayHandler implements NativePayHandler {

    @Override
    public void createDownLineTrading(TradingEntity tradingEntity) throws SLException {
        // 1. 设置参数（全局只需设置一次）
        Factory.setOptions(AlipayConfig.getConfig());
        try {
            // 2. 发起API调用（以创建当面付收款二维码为例）
            AlipayTradePrecreateResponse response = Factory.Payment.FaceToFace()
                    .preCreate(tradingEntity.getMemo(),  //订单描述
                            Convert.toStr(tradingEntity.getTradingOrderNo()), //交易单号
                            Convert.toStr(tradingEntity.getTradingAmount())); //交易金额
            // 3. 处理响应或异常
            if (ResponseChecker.success(response)) {
                System.out.println("调用成功");
                tradingEntity.setPlaceOrderMsg(response.getQrCode()); //二维码信息
                tradingEntity.setPlaceOrderCode(response.getCode());
                tradingEntity.setPlaceOrderJson(JSONUtil.toJsonStr(response));
                tradingEntity.setTradingState(TradingStateEnum.FKZ);
            } else {
                System.err.println("调用失败，原因：" + response.msg + "，" + response.subMsg);
            }
        } catch (Exception e) {
            System.err.println("调用遭遇异常，原因：" + e.getMessage());
            throw new RuntimeException(e.getMessage(), e);
        }
    }


}

```
编写测试用例：
> 测试时自行修改订单号和交易单号，如果重复会支付失败

```java
package com.sl.pay.handler.alipay;

import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AliNativePayHandlerTest {

    @Resource(name = "aliNativePayHandler")
    NativePayHandler nativePayHandler;

    @Test
    void createDownLineTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setProductOrderNo(12345L); //订单号
        tradingEntity.setTradingOrderNo(11223344L); //交易单号
        tradingEntity.setMemo("运费");
        tradingEntity.setTradingAmount(BigDecimal.valueOf(1));
        this.nativePayHandler.createDownLineTrading(tradingEntity);

        System.out.println("二维码信息：" + tradingEntity.getPlaceOrderMsg());
        System.out.println(tradingEntity);
    }
}
```
测试结果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671691150217-2560a59c-acc2-4cf7-92bf-196ba38ea790.png#averageHue=%23fbfafa&clientId=u5aa83c24-f0b8-4&from=paste&height=96&id=u9f41d0fc&name=image.png&originHeight=144&originWidth=1361&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14978&status=done&style=shadow&taskId=uf0c9807a-9ed5-45a7-8b40-4ab1ec32efb&title=&width=907.3333333333334)
可以看到，调用成功后会返回支付链接，下面需要将支付链接转成二维码的形式，下面通过【草料二维码】工具来生成：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671691179739-67464124-cb7e-464d-8b9a-843b67cc9aee.png#averageHue=%23fcfbfb&clientId=u5aa83c24-f0b8-4&from=paste&height=392&id=u25cd620f&name=image.png&originHeight=588&originWidth=1105&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26385&status=done&style=shadow&taskId=u8d4a8346-f874-435e-b284-fd7d9dc8f1f&title=&width=736.6666666666666)
在后侧可以看到生成二维码：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671674585130-48acd3a3-e739-4299-b1b9-b84b95e06ba3.png#averageHue=%23d3d3d3&clientId=u5aa83c24-f0b8-4&from=paste&height=459&id=u7c576e0e&name=image.png&originHeight=688&originWidth=484&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31854&status=done&style=shadow&taskId=u6f49be5e-7fbd-4967-aefa-b5b4f91ab9a&title=&width=322.6666666666667)
下面通过沙箱环境的支付宝APP进行扫码支付（支付密码默认：111111）：
![3542aeb0f595cb84a350a19edb5a793.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1671674842111-75565f5c-e82d-4f82-8f8b-a30498dec13d.jpeg#averageHue=%23151512&clientId=u5aa83c24-f0b8-4&from=paste&height=600&id=u530af7f4&name=3542aeb0f595cb84a350a19edb5a793.jpg&originHeight=2400&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363997&status=done&style=shadow&taskId=u96b76553-622e-439e-9428-2d514933264&title=&width=270)
![fe511aaa02fc4d72c2dc3888d09375b.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1671674880729-75e78cec-9d9f-4157-9070-b114cbb9c4fc.jpeg#averageHue=%23f9f9f9&clientId=u5aa83c24-f0b8-4&from=paste&height=600&id=u995c3000&name=fe511aaa02fc4d72c2dc3888d09375b.jpg&originHeight=2400&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90381&status=done&style=shadow&taskId=u88efb54f-0040-4844-8a40-470efd059d8&title=&width=270)
虽然可以通过沙箱环境进行测试，但是沙箱环境的APP查看账单并不方便，有时候查询不到数据，所以在后面的测试中建议使用正式环境，也就是神领物流项目中真实的支付宝账号信息，需要注意的是，测试时需要使用支付宝正式APP进行。
将`com.sl.pay.handler.alipay.AlipayConfig#getConfig`代码的注释放开即可，同时要将沙箱环境的代码注释掉。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671693473419-cdd68e44-171e-460e-8a57-639f463e124b.png#averageHue=%23fdfcfb&clientId=u5aa83c24-f0b8-4&from=paste&height=323&id=u5517ff98&name=image.png&originHeight=485&originWidth=1005&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51370&status=done&style=shadow&taskId=u23e7828b-f986-42d6-ad02-11a92dbcdc7&title=&width=670)
### 5.2.6、查询交易单
可以通过交易单号进行查询，需要注意的是只有通过支付宝APP扫码之后才能查询到交易单。[点击查看文档](https://opendocs.alipay.com/open/02ekfh?ref=api&scene=23)
代码实现如下：
```java
    @Override
    public Boolean queryTrading(TradingEntity trading) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        AlipayTradeQueryResponse queryResponse;
        try {
            //调用支付宝API：通用查询支付情况
            queryResponse = Factory
                    .Payment
                    .Common()
                    .query(String.valueOf(trading.getTradingOrderNo()));
        } catch (Exception e) {
            String msg = StrUtil.format("查询支付宝统一下单失败：trading = {}", trading);
            log.error(msg, e);
            throw new SLException(msg);
        }

        //修改交易单状态
        trading.setResultCode(queryResponse.getCode());
        trading.setResultMsg(queryResponse.getSubMsg());
        trading.setResultJson(JSONUtil.toJsonStr(queryResponse));

        boolean success = ResponseChecker.success(queryResponse);
        //响应成功，分析交易状态
        if (success) {
            String tradeStatus = queryResponse.getTradeStatus();
            if (StrUtil.equals(TradingConstant.ALI_TRADE_CLOSED, tradeStatus)) {
                //支付取消：TRADE_CLOSED（未付款交易超时关闭，或支付完成后全额退款）
                trading.setTradingState(TradingStateEnum.QXDD);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.ALI_TRADE_SUCCESS, TradingConstant.ALI_TRADE_FINISHED)) {
                // TRADE_SUCCESS（交易支付成功）
                // TRADE_FINISHED（交易结束，不可退款）
                trading.setTradingState(TradingStateEnum.YJS);
            } else {
                //非最终状态不处理，当前交易状态：WAIT_BUYER_PAY（交易创建，等待买家付款）不处理
                return false;
            }
            return true;
        }
        throw new SLException(trading.getResultJson(), TradingEnum.NATIVE_QUERY_FAIL.getCode(), TradingEnum.NATIVE_QUERY_FAIL.getStatus());
    }
```
测试用例：
```java
    @Test
    void queryTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setTradingOrderNo(11223388L); //交易单号
        Boolean result = this.aliBasicPayHandler.queryTrading(tradingEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(tradingEntity);
    }
```
测试结果：
> 执行是否成功：true
> TradingEntity(openId=null, productOrderNo=null, tradingOrderNo=11223388, tradingChannel=null, tradingType=null, tradingState=QXDD, payeeName=null, payeeId=null, payerName=null, payerId=null, tradingAmount=null, refund=null, isRefund=null, resultCode=10000, resultMsg=null, resultJson={"httpBody":"{\"alipay_trade_query_response\":{\"code\":\"10000\",\"msg\":\"Success\",\"buyer_logon_id\":\"zha***@163.com\",\"buyer_pay_amount\":\"0.00\",\"buyer_user_id\":\"2088102229491411\",\"invoice_amount\":\"0.00\",\"out_trade_no\":\"11223388\",\"point_amount\":\"0.00\",\"receipt_amount\":\"0.00\",\"send_pay_date\":\"2022-12-22 15:30:10\",\"total_amount\":\"1.00\",\"trade_no\":\"2022122222001491411434343927\",\"trade_status\":\"TRADE_CLOSED\"},\"sign\":\"N6pBPloZlLFG7XSE4xegTYF7OYzaN5kWEsJnUEJj822Qwz5WQRafRgDL/hMKXMiOpJ+2//oRzdktx8r9saY4r4U+bSBJ+sxaRZF0gLo3ubtyQLTTvGOf7zpIeUaMaRld8LASFaN1ZmH/2BG+qLBD0SGL7TgbTS+nOSxn3ol1+eTrPW+YYEn0bpPKPtM5mU+NdkkFUecHZH2zkgN+4OLnBfiP/QuupsRh0vV+Rz9sDj4i8Io12uQPVOHnJ88Z/rzjS77IGkp3SpII2CaiG2urzsDyJPJO3JaRln8EEtsk9JNXyq+mj8gkOXp1mUHIP2BSM+tCSWn+XqtRBSuL0L9u9Q==\"}","code":"10000","msg":"Success","tradeNo":"2022122222001491411434343927","outTradeNo":"11223388","buyerLogonId":"zha***@163.com","tradeStatus":"TRADE_CLOSED","totalAmount":"1.00","buyerPayAmount":"0.00","pointAmount":"0.00","invoiceAmount":"0.00","sendPayDate":"2022-12-22 15:30:10","receiptAmount":"0.00","buyerUserId":"2088102229491411"}, placeOrderCode=null, placeOrderMsg=null, placeOrderJson=null, enterpriseId=null, memo=null, qrCode=null, enableFlag=null)

### 5.2.7、关闭交易
用于交易创建后，用户在一定时间内未进行支付，可调用该接口直接将未付款的交易进行关闭。[点击查看文档](https://opendocs.alipay.com/open/02o6e7?ref=api)
代码实现如下：
```java
    @Override
    public Boolean closeTrading(TradingEntity trading) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        try {
            //调用支付宝API：通用查询支付情况
            AlipayTradeCloseResponse closeResponse = Factory
                    .Payment
                    .Common()
                    .close(String.valueOf(trading.getTradingOrderNo()));
            boolean success = ResponseChecker.success(closeResponse);
            if (success) {
                trading.setTradingState(TradingStateEnum.QXDD);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new SLException(TradingEnum.CLOSE_FAIL, e);
        }
    }
```
测试用例：
```java
    @Test
    void closeTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setTradingOrderNo(11223377L); //交易单号
        Boolean result = this.aliBasicPayHandler.closeTrading(tradingEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(tradingEntity);
    }
```
### 5.2.8、退款
当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家，支付宝将在收到退款请求并且验证成功之后，按照退款规则将支付款按原路退到买家帐号上。[点击查看文档](https://opendocs.alipay.com/open/02ekfk?ref=api)
代码实现：
```java
    @Override
    public Boolean refundTrading(RefundRecordEntity refundRecord) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        //调用支付宝API：通用查询支付情况
        AlipayTradeRefundResponse refundResponse;
        try {
            // 支付宝easy sdk
            refundResponse = Factory
                    .Payment
                    .Common()
                    //扩展参数：退款单号
                    .optional("out_request_no", refundRecord.getRefundNo())
                    .refund(Convert.toStr(refundRecord.getTradingOrderNo()),
                            Convert.toStr(refundRecord.getRefundAmount()));
        } catch (Exception e) {
            String msg = StrUtil.format("调用支付宝退款接口出错！refundRecord = {}", refundRecord);
            log.error(msg, e);
            throw new SLException(msg, TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
        }
        refundRecord.setRefundCode(refundResponse.getCode());
        refundRecord.setRefundMsg(JSONUtil.toJsonStr(refundResponse));
        boolean success = ResponseChecker.success(refundResponse);
        if (success) {
            refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
    }
```
测试用例：
```java
    @Test
    void refundTrading() {
        RefundRecordEntity refundRecordEntity = new RefundRecordEntity();
        refundRecordEntity.setTradingOrderNo(11223388L); //交易单号
        refundRecordEntity.setRefundNo(11223380L); //退款单号
        refundRecordEntity.setRefundAmount(BigDecimal.valueOf(0.1)); //退款金额
        Boolean result = this.aliBasicPayHandler.refundTrading(refundRecordEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(refundRecordEntity);
    }
```
### 5.2.9、查询退款
商户可使用该接口查询自已通过alipay.trade.refund提交的退款请求是否执行成功。[点击查看文档](https://opendocs.alipay.com/open/02ekfl?ref=api)
代码实现：
```java
    @Override
    public Boolean queryRefundTrading(RefundRecordEntity refundRecord) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        AlipayTradeFastpayRefundQueryResponse response;
        try {
            response = Factory.Payment.Common().queryRefund(
                    Convert.toStr(refundRecord.getTradingOrderNo()),
                    Convert.toStr(refundRecord.getRefundNo()));
        } catch (Exception e) {
            log.error("调用支付宝查询退款接口出错！refundRecord = {}", refundRecord, e);
            throw new SLException(TradingEnum.NATIVE_REFUND_FAIL, e);
        }

        refundRecord.setRefundCode(response.getCode());
        refundRecord.setRefundMsg(JSONUtil.toJsonStr(response));
        boolean success = ResponseChecker.success(response);
        if (success) {
            refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
    }
```
测试用例：
```java
    @Test
    void queryRefundTrading() {
        RefundRecordEntity refundRecordEntity = new RefundRecordEntity();
        refundRecordEntity.setTradingOrderNo(11223388L); //交易单号
        refundRecordEntity.setRefundNo(11223388L); //退款单号
        Boolean result = this.aliBasicPayHandler.queryRefundTrading(refundRecordEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(refundRecordEntity);
    }
```
## 5.3、微信支付
### 5.3.1、开放平台
微信支付也有对应的开放平台，类似支付宝。
微信支付的接口分v2和v3版本，早期使用的是v2版本，目前推荐使用v3版本，v2与v3的区别如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671701659595-3b4921c1-a83a-42ca-b2b7-73c96177b93d.png#averageHue=%23f8f8f8&clientId=u5aa83c24-f0b8-4&from=paste&height=481&id=ub5cd59b3&name=image.png&originHeight=721&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53448&status=done&style=shadow&taskId=ub44a07c9-32a5-4d18-a1d5-f63f6fce851&title=&width=620)
:::info
需要注意的是，微信并没有提供沙箱环境，只能使用正式环境的账号信息才能接口调试。
:::
### 5.3.2、Native支付
微信中的扫码支付称之为【Native支付】，原理与支付宝类型。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671702153871-d8c2be91-e0d4-4b39-aedf-0d6f65c483c4.png#averageHue=%23f9f8f7&clientId=u5aa83c24-f0b8-4&from=paste&height=450&id=ude49e3a6&name=image.png&originHeight=675&originWidth=1331&originalType=binary&ratio=1&rotation=0&showTitle=false&size=93462&status=done&style=shadow&taskId=u2ad88c9e-c22d-48e8-b2e4-c64edc04677&title=&width=887.3333333333334)
Native支付API列表：

| 模块名称 | 功能列表 | 描述 |
| --- | --- | --- |
| Native支付 | [Native下单](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_1.shtml) | 通过本接口提交微信支付Native支付订单。 |
|  | [查询订单](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_2.shtml) | 通过此接口查询订单状态。 |
|  | [关闭订单](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_3.shtml) | 通过此接口关闭待支付订单。 |
|  | [Native调起支付](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_4.shtml) | 商户后台系统先调用微信支付的Native支付接口，微信后台系统返回链接参数code_url，商户后台系统将code_url值生成二维码图片，用户使用微信客户端扫码后发起支付。 |
|  | [支付结果通知](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_5.shtml) | 微信支付通过支付通知接口将用户支付成功消息通知给商户。 |
|  | [申请退款](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_9.shtml) | 商户可以通过该接口将支付金额退还给买家。 |
|  | [查询单笔退款](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_10.shtml) | 提交退款申请后，通过调用该接口查询退款状态 。 |
|  | [退款结果通知](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_11.shtml) | 微信支付通过退款通知接口将用户退款成功消息通知给商户。 |
|  | [申请交易账单](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_6.shtml) | 商户可以通过该接口获取交易账单文件的下载地址。 |
|  | [申请资金账单](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_7.shtml) | 商户可以通过该接口获取资金账单文件的下载地址。 |
|  | [下载账单](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_8.shtml) | 通过申请交易/资金账单获取到download_url在该接口获取到对应的账单。 |

业务流程如下：
![](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671702436062-74186fce-5329-4939-ab11-851d5995a4e8.png#averageHue=%23f9f8f8&clientId=u5aa83c24-f0b8-4&from=paste&id=uabf19cb6&originHeight=883&originWidth=800&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&taskId=ucf3ad6e3-603b-4dea-84fe-a50633c30b5&title=)
### 5.3.3、SDK
微信支付的接口是标准的RETful风格，同样也提供了SDK，与支付宝提供的SDK相比就简化了很多，微信支付的SDK仅仅是基于Httpclient进行了必要的封装，并没有将业务api封装进去。
通过maven坐标导入依赖：
```xml
<dependency>
  <groupId>com.github.wechatpay-apiv3</groupId>
  <artifactId>wechatpay-apache-httpclient</artifactId>
  <version>${wechatpay.version}</version>
</dependency>
```
二次封装代码：
```java
package com.sl.pay.handler.wechat;

import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.net.url.UrlPath;
import cn.hutool.core.net.url.UrlQuery;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.pay.handler.wechat.response.WeChatResponse;
import com.wechat.pay.contrib.apache.httpclient.auth.PrivateKeySigner;
import com.wechat.pay.contrib.apache.httpclient.auth.WechatPay2Credentials;
import com.wechat.pay.contrib.apache.httpclient.auth.WechatPay2Validator;
import com.wechat.pay.contrib.apache.httpclient.cert.CertificatesManager;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.util.Map;

/**
 * 微信支付远程调用对象
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WechatPayHttpClient {

    private String mchId; //商户号
    private String appId; //应用号
    private String privateKey; //私钥字符串
    private String mchSerialNo; //商户证书序列号
    private String apiV3Key; //V3密钥
    private String domain; //请求域名
    private String notifyUrl; //请求地址

    public static WechatPayHttpClient get() {
        //通过渠道对象转化成微信支付的client对象
        return WechatPayHttpClient.builder()
                .appId("wx6592a2db3f85ed25")
                .domain("api.mch.weixin.qq.com")
                .privateKey("-----BEGIN PRIVATE KEY-----\n" +
                        "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBHGgIh80193Gh\n" +
                        "dpD1LtMZfTRpcWI0fImyuBCyrd3gYb3rrsARebGcHdJsQA3mVjVqVp5ybhEZDPa4\n" +
                        "ecoK4Ye1hTppNpI/lmLt4/uUV/zhF5ahli7hi+116Ty6svHSbuMQBuUZeTFOwGrx\n" +
                        "jvofU/4pGIwh8ZvkcSnyOp9uX2177UVxDBkhgbZbJp9XF2b83vUa5eHo93CziPzn\n" +
                        "3hFdAlBCdTXB7DH+m0nN3Jou0szGukvq7cIgGpHku4ycKSTkIhhl9WRhN6OoSEJx\n" +
                        "q88MXzjkzTruc85PHN52aUTUifwg3T8Y4XqFQ61dTnEmgxeD2O6/pLdB9gLsp6yC\n" +
                        "GqN5Lqk7AgMBAAECggEBAL4X+WzUSbSjFS9NKNrCMjm4H1zgqTxjj6TnPkC1mGEl\n" +
                        "tjAHwLgzJBw62wWGdGhWWpSIGccpBBm1wjTMZpAZfF66fEpP1t1Ta6UjtGZNyvfF\n" +
                        "IZmE3jdWZ/WXGBnsxtFQKKKBNwrBW0Fbdqq9BQjLxLitmlxbmwrgPttcy855j6vZ\n" +
                        "qq4MBT1v8CtUT/gz4UWW2xWovVnmWOrRSScv7Nh0pMbRpPLkNHXrBwSSNz/keORz\n" +
                        "XB9JSm85wlkafa7n5/IJbdTml3A/uAgW3q3JZZQotHxQsYvD4Zb5Cnc9CPAXE5L2\n" +
                        "Yk877kVXZMGt5QPIVcPMj/72AMtaJT67Y0fN0RYHEGkCgYEA38BIGDY6pePgPbxB\n" +
                        "7N/l6Df0/OKPP0u8mqR4Q0aQD3VxeGiZUN1uWXEFKsKwlOxLfIFIFk1/6zQeC0xe\n" +
                        "tNTKk0gTL8hpMUTNkE7vI9gFWws2LY6DE86Lm0bdFEIwh6d7Fr7zZtyQKPzMsesC\n" +
                        "3XV9sdSUExEi5o/VwAyf+xZlOXcCgYEA3PGZYlILjg3esPNkhDz2wxFw432i8l/B\n" +
                        "CPD8ZtqIV9eguu4fVtFYcUVfawBb0T11RamJkc4eiSOqayC+2ehgb+GyRLJNK4Fq\n" +
                        "bFcsIT+CK0HlscZw51jrMR0MxTc4RzuOIMoYDeZqeGB6/YnNyG4pw2sD8bIwHm84\n" +
                        "06gtJsX/v10CgYAo8g3/aEUZQHcztPS3fU2cTkkl0ev24Ew2XGypmwsX2R0XtMSB\n" +
                        "uNPNyFHyvkgEKK2zrhDcC/ihuRraZHJcUyhzBViFgP5HBtk7VEaM36YzP/z9Hzw7\n" +
                        "bqu7kZ85atdoq6xpwC3Yn/o9le17jY8rqamD1mv2hUdGvAGYsHbCQxnpBwKBgHTk\n" +
                        "eaMUBzr7yZLS4p435tHje1dQVBJpaKaDYPZFrhbTZR0g+IGlNmaPLmFdCjbUjiPy\n" +
                        "A2+Znnwt227cHz0IfWUUAo3ny3419QkmwZlBkWuzbIO2mms7lwsf9G6uvV6qepKM\n" +
                        "eVd5TWEsokVbT/03k27pQmfwPxcK/wS0GFdIL/udAoGAOYdDqY5/aadWCyhzTGI6\n" +
                        "qXPLvC+fsJBPhK2RXyc+jYV0KmrEv4ewxlK5NksuFsNkyB7wlI1oMCa/xB3T/2vT\n" +
                        "BALgGFPi8BJqceUjtnTYtI4R2JIVEl08RtEJwyU5JZ2rvWcilsotVZYwfuLZ9Kfd\n" +
                        "hkTrgNxlp/KKkr+UuKce4Vs=\n" +
                        "-----END PRIVATE KEY-----\n")
                .mchId("1561414331")
                .mchSerialNo("25FBDE3EFD31B03A4377EB9A4A47C517969E6620")
                .apiV3Key("CZBK51236435wxpay435434323FFDuv3")
                .notifyUrl("https://www.itcast.cn/")
                .build();
    }

    /***
     * 构建CloseableHttpClient远程请求对象
     * @return org.apache.http.impl.client.CloseableHttpClient
     */
    public CloseableHttpClient createHttpClient() throws Exception {
        // 加载商户私钥（privateKey：私钥字符串）
        PrivateKey merchantPrivateKey = PemUtil.loadPrivateKey(new ByteArrayInputStream(privateKey.getBytes(StandardCharsets.UTF_8)));

        // 加载平台证书（mchId：商户号,mchSerialNo：商户证书序列号,apiV3Key：V3密钥）
        PrivateKeySigner privateKeySigner = new PrivateKeySigner(mchSerialNo, merchantPrivateKey);
        WechatPay2Credentials wechatPay2Credentials = new WechatPay2Credentials(mchId, privateKeySigner);

        // 向证书管理器增加需要自动更新平台证书的商户信息
        CertificatesManager certificatesManager = CertificatesManager.getInstance();
        certificatesManager.putMerchant(mchId, wechatPay2Credentials, apiV3Key.getBytes(StandardCharsets.UTF_8));

        // 初始化httpClient
        return com.wechat.pay.contrib.apache.httpclient.WechatPayHttpClientBuilder.create()
                .withMerchant(mchId, mchSerialNo, merchantPrivateKey)
                .withValidator(new WechatPay2Validator(certificatesManager.getVerifier(mchId)))
                .build();
    }

    /***
     * 支持post请求的远程调用
     *
     * @param apiPath api地址
     * @param params 携带请求参数
     * @return 返回字符串
     */
    public WeChatResponse doPost(String apiPath, Map<String, Object> params) throws Exception {
        String url = StrUtil.format("https://{}{}", this.domain, apiPath);
        HttpPost httpPost = new HttpPost(url);
        httpPost.addHeader("Accept", "application/json");
        httpPost.addHeader("Content-type", "application/json; charset=utf-8");

        String body = JSONUtil.toJsonStr(params);
        httpPost.setEntity(new StringEntity(body, CharsetUtil.UTF_8));

        CloseableHttpResponse response = this.createHttpClient().execute(httpPost);
        return new WeChatResponse(response);
    }

    /***
     * 支持get请求的远程调用
     * @param apiPath api地址
     * @param params 在路径中请求的参数
     * @return 返回字符串
     */
    public WeChatResponse doGet(String apiPath, Map<String, Object> params) throws Exception {
        URI uri = UrlBuilder.create()
                .setHost(this.domain)
                .setScheme("https")
                .setPath(UrlPath.of(apiPath, CharsetUtil.CHARSET_UTF_8))
                .setQuery(UrlQuery.of(params))
                .setCharset(CharsetUtil.CHARSET_UTF_8)
                .toURI();
        return this.doGet(uri);
    }

    /***
     * 支持get请求的远程调用
     * @param apiPath api地址
     * @return 返回字符串
     */
    public WeChatResponse doGet(String apiPath) throws Exception {
        URI uri = UrlBuilder.create()
                .setHost(this.domain)
                .setScheme("https")
                .setPath(UrlPath.of(apiPath, CharsetUtil.CHARSET_UTF_8))
                .setCharset(CharsetUtil.CHARSET_UTF_8)
                .toURI();
        return this.doGet(uri);
    }

    private WeChatResponse doGet(URI uri) throws Exception {
        HttpGet httpGet = new HttpGet(uri);
        httpGet.addHeader("Accept", "application/json");
        CloseableHttpResponse response = this.createHttpClient().execute(httpGet);
        return new WeChatResponse(response);
    }

}

```
代码说明：

- 通过`get()`方法查询配置信息，最后封装到`WechatPayHttpClient`对象中。
- 通过`createHttpClient()`方法封装了请求微信接口必要的参数，最后返回`CloseableHttpClient`对象。
- 封装了`doGet()、doPost()`方便对微信接口进行调用。
### 5.3.4、编写代码
编写WechatNativePayHandler，同样也是实现NativePayHandler接口，主要是对接微信支付的扫码支付。
```java
package com.sl.pay.handler.wechat;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.json.JSONUtil;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.enums.TradingEnum;
import com.sl.pay.enums.TradingStateEnum;
import com.sl.pay.handler.NativePayHandler;
import com.sl.pay.handler.wechat.response.WeChatResponse;
import com.sl.transport.common.exception.SLException;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 微信二维码支付
 */
@Component("wechatNativePayHandler")
public class WechatNativePayHandler implements NativePayHandler {

    @Override
    public void createDownLineTrading(TradingEntity tradingEntity) throws SLException {
        // 查询配置
        WechatPayHttpClient client = WechatPayHttpClient.get();
        //请求地址
        String apiPath = "/v3/pay/transactions/native";

        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("mchid", client.getMchId())
                .put("appid", client.getAppId())
                .put("description", tradingEntity.getMemo())
                .put("notify_url", client.getNotifyUrl())
                .put("out_trade_no", Convert.toStr(tradingEntity.getTradingOrderNo()))
                .put("amount", MapUtil.<String, Object>builder()
                        .put("total", Convert.toInt(NumberUtil.mul(tradingEntity.getTradingAmount(), 100))) //金额，单位：分
                        .put("currency", "CNY") //人民币
                        .build())
                .build();

        try {
            WeChatResponse response = client.doPost(apiPath, params);
            if (!response.isOk()) {
                //下单失败
                throw new SLException(TradingEnum.NATIVE_PAY_FAIL);
            }
            //指定统一下单code
            tradingEntity.setPlaceOrderCode(Convert.toStr(response.getStatus()));
            //二维码需要展现的信息
            tradingEntity.setPlaceOrderMsg(JSONUtil.parseObj(response.getBody()).getStr("code_url"));
            //指定统一下单json字符串
            tradingEntity.setPlaceOrderJson(JSONUtil.toJsonStr(response));
            //指定交易状态
            tradingEntity.setTradingState(TradingStateEnum.FKZ);
        } catch (Exception e) {
            throw new SLException(TradingEnum.NATIVE_PAY_FAIL);
        }
    }

}

```
测试用例：
```java
package com.sl.pay.handler.wechat;

import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class WechatNativePayHandlerTest {

    @Resource(name = "wechatNativePayHandler")
    NativePayHandler nativePayHandler;

    @Test
    void createDownLineTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setProductOrderNo(12345L); //订单号
        tradingEntity.setTradingOrderNo(11223388L); //交易单号
        tradingEntity.setMemo("运费");
        tradingEntity.setTradingAmount(BigDecimal.valueOf(1));
        this.nativePayHandler.createDownLineTrading(tradingEntity);

        System.out.println("二维码信息：" + tradingEntity.getPlaceOrderMsg());
        System.out.println(tradingEntity);
    }
}
```
测试结果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671710751825-7cf9c58b-c8df-4fbd-843e-20affa9e56f8.png#averageHue=%23f7f5f4&clientId=u5aa83c24-f0b8-4&from=paste&height=159&id=udc6b0961&name=image.png&originHeight=238&originWidth=1265&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23469&status=done&style=shadow&taskId=u17480b41-cbbc-4e25-8327-80a154d332d&title=&width=843.3333333333334)
### 5.3.5、其他操作
与支付宝类型，微信支付也有查询交易单、退款等操作，同样也是实现了`BasicPayHandler`接口。
```java
package com.sl.pay.handler.wechat;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.pay.constant.TradingConstant;
import com.sl.pay.entity.RefundRecordEntity;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.enums.RefundStatusEnum;
import com.sl.pay.enums.TradingStateEnum;
import com.sl.pay.handler.BasicPayHandler;
import com.sl.pay.handler.wechat.response.WeChatResponse;
import com.sl.transport.common.exception.SLException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.temporal.ChronoUnit;
import java.util.Map;

import static com.sl.pay.enums.TradingEnum.*;

/**
 * 微信基础支付功能的实现
 */
@Slf4j
@Component("weChatBasicPayHandler")
public class WeChatBasicPayHandler implements BasicPayHandler {

    @Override
    public Boolean queryTrading(TradingEntity trading) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get();

        //请求地址
        String apiPath = StrUtil.format("/v3/pay/transactions/out-trade-no/{}", trading.getTradingOrderNo());

        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("mchid", client.getMchId())
                .build();

        WeChatResponse response;
        try {
            response = client.doGet(apiPath, params);
        } catch (Exception e) {
            log.error("调用微信接口出错！apiPath = {}, params = {}", apiPath, JSONUtil.toJsonStr(params), e);
            throw new SLException(NATIVE_REFUND_FAIL, e);
        }
        if (response.isOk()) {
            JSONObject jsonObject = JSONUtil.parseObj(response.getBody());
            // 交易状态，枚举值：
            // SUCCESS：支付成功
            // REFUND：转入退款
            // NOTPAY：未支付
            // CLOSED：已关闭
            // REVOKED：已撤销（仅付款码支付会返回）
            // USERPAYING：用户支付中（仅付款码支付会返回）
            // PAYERROR：支付失败（仅付款码支付会返回）
            String tradeStatus = jsonObject.getStr("trade_state");
            if (StrUtil.equalsAny(tradeStatus, TradingConstant.WECHAT_TRADE_CLOSED, TradingConstant.WECHAT_TRADE_REVOKED)) {
                trading.setTradingState(TradingStateEnum.QXDD);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.WECHAT_REFUND_SUCCESS, TradingConstant.WECHAT_TRADE_REFUND)) {
                trading.setTradingState(TradingStateEnum.YJS);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.WECHAT_TRADE_NOTPAY)) {
                //如果是未支付，需要判断下时间，超过2小时未知的订单需要关闭订单以及设置状态为QXDD
                long between = LocalDateTimeUtil.between(trading.getCreated(), LocalDateTimeUtil.now(), ChronoUnit.HOURS);
                if (between >= 2) {
                    return this.closeTrading(trading);
                }
            } else {
                //非最终状态不处理
                return false;
            }
            //修改交易单状态
            trading.setResultCode(tradeStatus);
            trading.setResultMsg(jsonObject.getStr("trade_state_desc"));
            trading.setResultJson(response.getBody());
            return true;
        }
        throw new SLException(response.getBody(), NATIVE_REFUND_FAIL.getCode(), NATIVE_REFUND_FAIL.getCode());
    }

    @Override
    public Boolean closeTrading(TradingEntity trading) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get();
        //请求地址
        String apiPath = StrUtil.format("/v3/pay/transactions/out-trade-no/{}/close", trading.getTradingOrderNo());
        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("mchid", client.getMchId())
                .build();
        try {
            WeChatResponse response = client.doPost(apiPath, params);
            if (response.getStatus() == 204) {
                trading.setTradingState(TradingStateEnum.QXDD);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new SLException(CLOSE_FAIL, e);
        }
    }

    @Override
    public Boolean refundTrading(RefundRecordEntity refundRecord) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get();
        //请求地址
        String apiPath = "/v3/refund/domestic/refunds";
        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("out_refund_no", Convert.toStr(refundRecord.getRefundNo()))
                .put("out_trade_no", Convert.toStr(refundRecord.getTradingOrderNo()))
                .put("amount", MapUtil.<String, Object>builder()
                        .put("refund", NumberUtil.mul(refundRecord.getRefundAmount(), 100)) //本次退款金额
                        .put("total", NumberUtil.mul(refundRecord.getTotal(), 100)) //原订单金额
                        .put("currency", "CNY") //币种
                        .build())
                .build();
        WeChatResponse response;
        try {
            response = client.doPost(apiPath, params);
        } catch (Exception e) {
            log.error("调用微信接口出错！apiPath = {}, params = {}", apiPath, JSONUtil.toJsonStr(params), e);
            throw new SLException(NATIVE_REFUND_FAIL, e);
        }
        refundRecord.setRefundCode(Convert.toStr(response.getStatus()));
        refundRecord.setRefundMsg(response.getBody());
        if (response.isOk()) {
            JSONObject jsonObject = JSONUtil.parseObj(response.getBody());
            // SUCCESS：退款成功
            // CLOSED：退款关闭
            // PROCESSING：退款处理中
            // ABNORMAL：退款异常
            String status = jsonObject.getStr("status");
            if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_PROCESSING)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SENDING);
            } else if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_SUCCESS)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            } else {
                refundRecord.setRefundStatus(RefundStatusEnum.FAIL);
            }
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), NATIVE_REFUND_FAIL.getCode(), NATIVE_REFUND_FAIL.getStatus());
    }

    @Override
    public Boolean queryRefundTrading(RefundRecordEntity refundRecord) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get();

        //请求地址
        String apiPath = StrUtil.format("/v3/refund/domestic/refunds/{}", refundRecord.getRefundNo());

        WeChatResponse response;
        try {
            response = client.doGet(apiPath);
        } catch (Exception e) {
            log.error("调用微信接口出错！apiPath = {}", apiPath, e);
            throw new SLException(NATIVE_QUERY_REFUND_FAIL, e);
        }

        refundRecord.setRefundCode(Convert.toStr(response.getStatus()));
        refundRecord.setRefundMsg(response.getBody());
        if (response.isOk()) {
            JSONObject jsonObject = JSONUtil.parseObj(response.getBody());
            // SUCCESS：退款成功
            // CLOSED：退款关闭
            // PROCESSING：退款处理中
            // ABNORMAL：退款异常
            String status = jsonObject.getStr("status");
            if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_PROCESSING)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SENDING);
            } else if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_SUCCESS)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            } else {
                refundRecord.setRefundStatus(RefundStatusEnum.FAIL);
            }
            return true;
        }
        throw new SLException(response.getBody(), NATIVE_QUERY_REFUND_FAIL.getCode(), NATIVE_QUERY_REFUND_FAIL.getStatus());
    }

}

```
测试用例：
```java
package com.sl.pay.handler.wechat;

import com.sl.pay.entity.RefundRecordEntity;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.BasicPayHandler;
import com.sl.pay.handler.alipay.AliBasicPayHandler;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@SpringBootTest
class WechatBasicPayHandlerTest {

    @Resource(name = "weChatBasicPayHandler")
    BasicPayHandler basicPayHandler;

    @Test
    void queryTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setTradingOrderNo(11223388L); //交易单号
        tradingEntity.setCreated(LocalDateTime.now());
        Boolean result = this.basicPayHandler.queryTrading(tradingEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(tradingEntity);
    }

    @Test
    void closeTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setTradingOrderNo(11223377L); //交易单号
        Boolean result = this.basicPayHandler.closeTrading(tradingEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(tradingEntity);
    }

    @Test
    void refundTrading() {
        RefundRecordEntity refundRecordEntity = new RefundRecordEntity();
        refundRecordEntity.setTradingOrderNo(11223388L); //交易单号
        refundRecordEntity.setRefundNo(11223380L); //退款单号
        refundRecordEntity.setRefundAmount(BigDecimal.valueOf(0.1)); //退款金额
        refundRecordEntity.setTotal(BigDecimal.valueOf(1)); //原金额
        Boolean result = this.basicPayHandler.refundTrading(refundRecordEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(refundRecordEntity);
    }

    @Test
    void queryRefundTrading() {
        RefundRecordEntity refundRecordEntity = new RefundRecordEntity();
        refundRecordEntity.setTradingOrderNo(11223388L); //交易单号
        refundRecordEntity.setRefundNo(11223388L); //退款单号
        Boolean result = this.basicPayHandler.queryRefundTrading(refundRecordEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(refundRecordEntity);
    }
}
```
# 6、分布式锁
想象一下这样的场景，快递员提交了支付请求，由于网络等原因一直没有返回二维码，此时快递员针对该订单又发起了一次请求，这样的话就可能针对于一个订单生成了2个交易单，这样就重复了，所以我们需要在处理请求生成交易单时对该订单锁定，如果获取到锁就执行，否则就抛出异常。
实际上，在这里我们是需要使用分布式锁来实现，首先要解释下为什么是用分布式锁，不是用本地锁，是因为微服务在生产部署时一般都是集群的，而我们需要的在多个节点之间锁定，并不是在一个节点内锁定，所以就要用到分布式锁，如何实现分布式锁呢，下面我们一起来学习下。
## 6.1、核心思想
实现分布式锁，可以借助redis的SETNX命令完成，该命令设置值时，如果key不存在，为key设置指定的值，返回1，如果存在返回0，也就意味着相同的key只能设置成功一次，假设有多个线程同时设置值，只能有一个设置成功，这样就得到互斥的效果，也就可以达到锁的效果。
```shell
192.168.150.101:0>SETNX abc 123
"1"  ---设置成功
192.168.150.101:0>SETNX abc 123
"0"  ---设置失败
192.168.150.101:0>SETNX abc 123
"0"  ---设置失败
192.168.150.101:0>get abc
"123"  ---可以正常查询值
```
这里举个例子，商品服务的并发操作：
![1653382830810.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660478873286-fae6fe4f-3d53-4678-9e5e-8222ea07cc50.png#averageHue=%23f8f8f8&clientId=ueb0d0a4e-b720-4&errorMessage=unknown%20error&from=paste&id=ue6e80a83&name=1653382830810.png&originHeight=664&originWidth=629&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40253&status=error&style=shadow&taskId=u94833da7-216b-4b9b-8370-aee3c5507c7&title=)
## 6.2、业务功能
下面我们基于并发创建交易这样的业务场景进行测试。
```java
package com.sl.pay.lock;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.IdUtil;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class NativePayService {

    @Resource(name = "aliNativePayHandler")
    private NativePayHandler nativePayHandler;

    /**
     * 创建交易单示例代码
     *
     * @param productOrderNo 订单号
     * @return 交易单对象
     */
    public TradingEntity createDownLineTrading(Long productOrderNo) {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setProductOrderNo(productOrderNo);

        //基于订单创建交易单
        tradingEntity.setTradingOrderNo(IdUtil.getSnowflakeNextId());
        tradingEntity.setCreated(LocalDateTime.now());
        tradingEntity.setTradingAmount(BigDecimal.valueOf(1));
        tradingEntity.setMemo("运费");

        //调用三方支付创建交易
        this.nativePayHandler.createDownLineTrading(tradingEntity);

        return tradingEntity;
    }

}

```
使用多线程模拟并发测试：
```java
package com.sl.pay.lock;

import com.sl.pay.entity.TradingEntity;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class NativePayServiceTest {

    @Resource
    NativePayService nativePayService;

    @Test
    void createDownLineTrading() throws Exception {
        Long productOrderNo = 1122334455L;

        //多线程模拟并发
        for (int i = 0; i < 3; i++) {
            new Thread(() -> {
                TradingEntity tradingEntity = nativePayService.createDownLineTrading(productOrderNo);
                System.out.println("交易单：" + tradingEntity + ", 线程id = " + Thread.currentThread().getId());
            }).start();
        }

		//睡眠20秒，等待所有子线程的完成
        Thread.sleep(20000);
    }

}
```
运行结果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671777945338-e6442277-66c2-4333-a677-d321251ccc33.png#averageHue=%23faf9f8&clientId=u25d97551-69e0-4&from=paste&height=186&id=u5a90411e&name=image.png&originHeight=279&originWidth=1489&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28388&status=done&style=shadow&taskId=uc08cada8-4fb6-4152-ab73-e28cab358f1&title=&width=992.6666666666666)
可见，对同一个订单号创建了多个交易单对象，这就是并发常见下的数据重复问题。
## 6.3、基于Redis实现分布式锁
定义锁接口：
```java
package com.sl.pay.lock;

public interface ILock {

    /**
     * 尝试获取锁
     *
     * @param name       锁的名称
     * @param timeoutSec 锁持有的超时时间，过期后自动释放
     * @return true表示获取锁成功，false表示获取锁失败
     */
    boolean tryLock(String name, Long timeoutSec);

    /**
     * 释放锁
     */
    void unlock(String name);
}
```
基本的实现：
```java
package com.sl.pay.lock;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

@Component
public class SimpleRedisLock implements ILock {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    private static final String KEY_PREFIX = "lock:";

    @Override
    public boolean tryLock(String name, Long timeoutSec) {
        // 获取线程标示
        String threadId = Thread.currentThread().getId() + "";
        // 获取锁 setIfAbsent()是SETNX命令在java中的体现
        Boolean success = stringRedisTemplate.opsForValue()
                .setIfAbsent(KEY_PREFIX + name, threadId, timeoutSec, TimeUnit.SECONDS);
        return Boolean.TRUE.equals(success);
    }

    @Override
    public void unlock(String name) {
        //通过del删除锁
        stringRedisTemplate.delete(KEY_PREFIX + name);
    }
}

```
业务中使用（createDownLineTradingLock()方法）：
```java
package com.sl.pay.lock;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.IdUtil;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class NativePayService {

    @Resource(name = "aliNativePayHandler")
    private NativePayHandler nativePayHandler;

    @Resource
    private SimpleRedisLock simpleRedisLock;

    /**
     * 创建交易单示例代码
     *
     * @param productOrderNo 订单号
     * @return 交易单对象
     */
    public TradingEntity createDownLineTrading(Long productOrderNo) {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setProductOrderNo(productOrderNo);

        //基于订单创建交易单
        tradingEntity.setTradingOrderNo(IdUtil.getSnowflakeNextId());
        tradingEntity.setCreated(LocalDateTime.now());
        tradingEntity.setTradingAmount(BigDecimal.valueOf(1));
        tradingEntity.setMemo("运费");

        //调用三方支付创建交易
        this.nativePayHandler.createDownLineTrading(tradingEntity);

        return tradingEntity;
    }

    /**
     * 创建交易单示例代码
     *
     * @param productOrderNo 订单号
     * @return 交易单对象
     */
    public TradingEntity createDownLineTradingLock(Long productOrderNo) {

        //获取锁
        String lockName = Convert.toStr(productOrderNo);
        boolean lock = this.simpleRedisLock.tryLock(lockName, 5L);
        if (!lock) {
            System.out.println("没有获取到锁，线程id = " + Thread.currentThread().getId());
            return null;
        }

        System.out.println("获取到锁，线程id = " + Thread.currentThread().getId());

        TradingEntity tradingEntity = createDownLineTrading(productOrderNo);
        
        //释放锁
        this.simpleRedisLock.unlock(lockName);
        return tradingEntity;
    }
}

```
测试：
```java
    @Test
    void createDownLineTradingLock() throws Exception {
        Long productOrderNo = 1122334455L;

        //多线程模拟并发
        for (int i = 0; i < 3; i++) {
            new Thread(() -> {
                TradingEntity tradingEntity = nativePayService.createDownLineTradingLock(productOrderNo);
                System.out.println("交易单：" + tradingEntity + ", 线程id = " + Thread.currentThread().getId());
            }).start();
        }

        //睡眠20秒，等待所有子线程的完成
        Thread.sleep(20000);
    }
```
测试结果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671778454335-2192648a-9417-48a1-850e-872323bad23c.png#averageHue=%23fbfafa&clientId=u25d97551-69e0-4&from=paste&height=207&id=uaa082d3a&name=image.png&originHeight=311&originWidth=1511&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34433&status=done&style=shadow&taskId=u19377f91-7d0a-42de-9953-13e4e06cbdc&title=&width=1007.3333333333334)
可以看到，线程23、24没有获取到锁，只要线程25获取到了锁，最终一个订单只会对应一个交易单，这样才符合需求。
## 6.4、问题分析
自己基于Redis实现基本上是ok的，但是仔细分析会发现一些问题，比如：设置持有锁的时间为5秒，而程序所运行的时间大于5秒，这样就会出现，程序还没结束锁已经释放了，其他线程就可以获取到这个锁，而当前线程在释放锁时，就会把其他线程的锁删除了，最终可能会导致脏数据。
为了解决这个问题，我们可以在删除时判断一下，看是存储的值是否是当前线程的id，是就删除，不是就不删除。
代码实现：
```java
    @Override
    public void unlock(String name) {
        // 获取线程标示
        String threadId = Thread.currentThread().getId() + "";
        // 获取锁中的标示
        String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);
        // 判断标示是否一致
        if(threadId.equals(id)) {
            // 释放锁
            stringRedisTemplate.delete(KEY_PREFIX + name);
        }
    }
```
下图展现了多线时间之间获取锁以及释放锁的过程：
![1653385920025.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660531841799-815c77a2-3712-4ba4-9416-32af90654395.png#averageHue=%23fafaf9&clientId=ud7108c1c-a561-4&errorMessage=unknown%20error&from=paste&height=389&id=udce451a5&name=1653385920025.png&originHeight=642&originWidth=1526&originalType=binary&ratio=1&rotation=0&showTitle=false&size=173010&status=error&style=shadow&taskId=ubcbd7caf-0c3b-4e6a-b49d-e02b22074d6&title=&width=924.8484313936851)
这样是不是就没问题了呢？并不是，其实还是存在问题的。
问题就是，释放锁时查询与删除并不是一个原子性操作，这样带来的问题就是，查询时有数据，删除时数据可能被其他线程删除了。
除了这个问题外还有其他问题：
![1653546070602.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660533881657-7e84a656-091c-44e6-8306-21f0283dc9fd.png#averageHue=%23f9f8f8&clientId=uf3671ecf-c474-4&errorMessage=unknown%20error&from=paste&height=376&id=u669cc2ff&name=1653546070602.png&originHeight=621&originWidth=1541&originalType=binary&ratio=1&rotation=0&showTitle=false&size=199893&status=error&style=shadow&taskId=u800efdaa-2551-4a74-a025-960149542a3&title=&width=933.9393399591538)
总结一句话，就是自己基于Redis实现分布式锁需要解决的问题非常多，实现非常的复杂，而Redisson已经完美的实现并且解决了这些问题，我们可以直接使用。
## 6.5、Redisson快速入门
Redisson是一个在Redis的基础上实现的Java驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的Java常用对象，还提供了许多分布式服务，其中就包含了各种分布式锁的实现。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660534281481-68950a02-4e48-4f1c-ad47-3996d5f98b81.png#averageHue=%23fefefe&clientId=uf3671ecf-c474-4&errorMessage=unknown%20error&from=paste&height=184&id=u7edf0887&name=image.png&originHeight=303&originWidth=713&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40072&status=error&style=shadow&taskId=u9f653ce1-f845-4342-b662-2a0803ab530&title=&width=432.12118714528015)
官网地址： 
GitHub地址： 
导入依赖：
```xml
<dependency>
	<groupId>org.redisson</groupId>
	<artifactId>redisson</artifactId>
</dependency>
```
配置：
```java
package com.sl.pay.config;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import lombok.Data;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.redisson.config.SingleServerConfig;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

@Data
@Configuration
@EnableConfigurationProperties(RedisProperties.class)
public class RedissonConfiguration {

    @Resource
    private RedisProperties redisProperties;

    @Bean
    public RedissonClient redissonSingle() {
        Config config = new Config();
        SingleServerConfig serverConfig = config.useSingleServer()
                .setAddress("redis://" + redisProperties.getHost() + ":" + redisProperties.getPort());
        if (null != (redisProperties.getTimeout())) {
            //设置持有时间
            serverConfig.setTimeout(1000 * Convert.toInt(redisProperties.getTimeout().getSeconds()));
        }
        if (StrUtil.isNotEmpty(redisProperties.getPassword())) {
            //设置密码
            serverConfig.setPassword(redisProperties.getPassword());
        }
        //创建RedissonClient
        return Redisson.create(config);
    }

}

```
项目中使用：
```java
    @Resource
    private RedissonClient redissonClient;

     /**
     * 创建交易单示例代码
     *
     * @param productOrderNo 订单号
     * @return 交易单对象
     */
    public TradingEntity createDownLineTradingRedissonLock(Long productOrderNo) {
        //获取锁
        String lockName = Convert.toStr(productOrderNo);
        //获取公平锁,优先分配给先发出请求的线程
        RLock lock = redissonClient.getFairLock(lockName);
        try {
            //尝试获取锁，最长等待获取锁的时间为5秒
            if (lock.tryLock(5L, TimeUnit.SECONDS)) {
                System.out.println("获取到锁，线程id = " + Thread.currentThread().getId());
                //休眠5s目的是让线程执行慢一些，容易测试出并发效果
                Thread.sleep(5000);
                return createDownLineTrading(productOrderNo);
            }
            System.out.println("没有获取到锁，线程id = " + Thread.currentThread().getId());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //释放锁，需要判断当前线程是否获取到锁
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
        return null;
    }
```
测试用例：
```java
    @Test
    void createDownLineTradingRedissonLock() throws Exception {
        Long productOrderNo = 1122334455L;

        //多线程模拟并发
        for (int i = 0; i < 3; i++) {
            new Thread(() -> {
                TradingEntity tradingEntity = nativePayService.createDownLineTradingRedissonLock(productOrderNo);
                System.out.println("交易单：" + tradingEntity + ", 线程id = " + Thread.currentThread().getId());
            }).start();
        }

        //睡眠20秒，等待所有子线程的完成
        Thread.sleep(20000);
    }
```
测试结果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671784063116-25f876f0-b04b-49d0-a273-9915bc29462f.png#averageHue=%23fcfbfb&clientId=uc4c58e5e-f9f8-4&from=paste&height=196&id=ud12ee789&name=image.png&originHeight=294&originWidth=1465&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32602&status=done&style=shadow&taskId=u4e5e1579-a303-4b05-9fc3-8ef684bb01f&title=&width=976.6666666666666)
可以看到，与我们自己实现的效果是一样的，可见使用Redisson是非常方便实现分布式锁的。
## 6.6、看门狗机制
在使用Redisson分布式锁时，我们有没有指定存储到Redis中锁的有效期时间？如果有的话是多久？如果程序执行时间超出这个时间会怎么样？
其实，在程序中我们并没有指定存储到Redis中锁的有效期时间，而是Redisson的默认存储时间，默认时间是30秒。如果程序的执行时间超出30秒，锁是自动删除吗，是不会的，Redisson一旦加锁成功就会启动一个watch dog【看门狗】，当时间每过期1/3时，就检查一下，如果当前线程还继续持有锁，就会重新刷新到30秒，直到最后的锁释放。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671787799027-9c60a2cd-b1fa-4fe9-a9d0-b2e3593c0429.png#averageHue=%23f4f3f3&clientId=uc4c58e5e-f9f8-4&from=paste&height=133&id=u478cbc40&name=image.png&originHeight=200&originWidth=1143&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18970&status=done&style=shadow&taskId=u45a0d539-f1e0-4c18-897e-a881b42018b&title=&width=762)
可以看到，通过watch dog机制确保不会在业务程序结束之前存储到Redis的锁过期。
可以在Redisson的Config对象中设置锁的默认存时间：`config.setLockWatchdogTimeout(10 * 1000);`
需要注意的是，如果在获取锁时指定了`leaseTime`参数，看门狗程序是不会生效的，如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1671790749616-f705366c-7627-40f2-90dc-a9b3fd73ee08.png#averageHue=%23fbfaf9&clientId=uc4c58e5e-f9f8-4&from=paste&height=162&id=u524ac7ef&name=image.png&originHeight=243&originWidth=1235&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44682&status=done&style=shadow&taskId=u2c6cb522-0f4c-4ec0-acbf-3be41602d9c&title=&width=823.3333333333334)
上述的配置，锁的有效期时间为10秒，10秒后锁会自动释放，不会续期。
# 7、面试连环问
:::info
面试官问：

- 在项目中，用户登录成功后的token你们是怎么生成的？有效期是多久？有考虑过双token模式吗？谈谈你的想法。
- 如何让token提前失效？
- 对接支付宝你们是怎么做的？什么是EasySDK？
- 微信支付与支付宝支付的接口有什么区别？微信支付你们用的是v2还是v3版本？有什么区别？
- 来，聊聊分布式锁的原理？自己实现分布式锁的难点在哪里？
- 使用Redisson实现分布式锁具体是怎么使用的？聊聊看门狗是个啥，它有什么用？
:::


