package com.sl.ms.web.customer.service.impl;

import cn.hutool.crypto.asymmetric.RSA;
import org.junit.jupiter.api.Test;

/**
 * @author zzj
 * @version 1.0
 */
public class JwtTest {

    @Test
    public void testRSA(){
        RSA rsa = new RSA();
        System.out.println("私钥：" + rsa.getPrivateKeyBase64());
        System.out.println("公钥：" + rsa.getPublicKeyBase64());
    }

}
