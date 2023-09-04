package com.sl.transport.common.util;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.crypto.asymmetric.RSA;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.Map;

/**
 * jwt工具类，提供生成token与校验token的方法，采用RSA非对称加密
 */
@Slf4j
public class JwtUtils {

    /**
     * 生成token（RSA非对称加密）
     *
     * @param claims        token中存储的数据，请勿传入敏感数据
     * @param privateKeyStr RSA私钥字符串
     * @param dateOffset    过期时间，单位：小时
     * @return token字符串
     */
    public static String createToken(Map<String, Object> claims, String privateKeyStr, int dateOffset) {
        return createToken(claims, privateKeyStr, dateOffset, DateField.HOUR_OF_DAY);
    }

    /**
     * 生成token（RSA非对称加密）
     *
     * @param claims        token中存储的数据，请勿传入敏感数据
     * @param privateKeyStr RSA私钥字符串
     * @param dateOffset    过期时间
     * @param dateField     过期时间的单位
     * @return token字符串
     */
    public static String createToken(Map<String, Object> claims, String privateKeyStr, int dateOffset, DateField dateField) {
        RSA rsa = new RSA(privateKeyStr, null);

        Map<String, Object> header = MapUtil.<String, Object>builder()
                .put(JwsHeader.TYPE, JwsHeader.JWT_TYPE)
                .put(JwsHeader.ALGORITHM, SignatureAlgorithm.RS256.getValue()).build();

        // 生成token
        return Jwts.builder()
                .setHeader(header)  //header，可省略
                .setClaims(claims) //payload，存放数据的位置，不能放置敏感数据，如：密码、手机号等
                .signWith(SignatureAlgorithm.RS256, rsa.getPrivateKey()) //设置签名的加密算法和密钥
                .setExpiration(DateUtil.offset(new Date(), dateField, dateOffset)) //设置过期时间
                .compact();
    }


    /**
     * 校验token
     *
     * @param token        token字符串
     * @param publicKeyStr RSA公钥字符串
     * @return token解密数据
     */
    public static Map<String, Object> checkToken(String token, String publicKeyStr) {
        RSA rsa = new RSA(null, publicKeyStr);
        try {
            // 通过token解析数据
            Map<String, Object> body = Jwts.parser()
                    .setSigningKey(rsa.getPublicKey()) //设置校验token签名的密钥
                    .parseClaimsJws(token)
                    .getBody();
            return body;
        } catch (ExpiredJwtException e) {
            // System.out.println("token已经过期！");
        } catch (Exception e) {
            log.error("token非法传入，token = {}", token, e);
        }

        return null;
    }

}
