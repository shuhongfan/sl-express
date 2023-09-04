package com.sl.pay.handler.alipay;

import com.alipay.easysdk.kernel.Config;

/**
 * 支付宝支付的配置
 */
public class AlipayConfig {

    /**
     * 获取支付宝的配置（沙箱环境）
     *
     * @return 支付宝的配置
     */
    public static Config getConfig() {
        Config config = new Config();
        config.protocol = "https";
        config.gatewayHost = "openapi.alipaydev.com";
        config.signType = "RSA2";
        config.appId = "2016072800110403";
        // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
        config.merchantPrivateKey = "MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDC+zz3NxpflpUlgNIkHWUjlal5JzaqtswH4b4c5c/tshm7zYNHYDu5n9vXW6X8DjnY4JKi9o4iQkps/M7CSOObhdxhzg4m2cppXS8iphnKAdeOb5AV740KOv84addPlNesghKZIV2Q2hpQL067D1Pt4BjbYPAt02dWDIo6yEiGyclCp0xgXm0zBDNZC69MPz634Xz4SZFnfqWrlct4UhKbZj9DvKjq7LIwEapJWe9WscUXChjtuqIjiXPJffq5+AwdKlVFs2yuPlZ7dnYnjHZ1rOpyIxmLL9mo3F2hwVgEisccZ6sdkP+XZnuAZwB28FENLQ9BO/iDk2QyK6rC8HuxAgMBAAECgf8m1+ZNWaznXhhYYFF84F5FuIsKl8VMPR5oc5BsMVw6/kAiKc79aS58zFv/i0KF9E+R5StRS80FBi/Nho+qJNszIHfHBEXNd5XbZ7T8MhrxI2zN82vA8vgmEZrGok9Ci2Rr+X27A+qf8NNNJh+JJIST3xEUozs15eewPM9M5pmMQE1kr7cnX3L9Mq9vF5kDTGR1qPo7aOvMNOPYueAvUqIEQ3mwMW8vN0PZ4OgSyPTQcVMLH50GJ1mCNl2AFK2To4HneOwVtzhnq6FL5gWaOfpsssBVual9Kwv1OxljBY9VRv65+4Eu595MuZ/U8nVD2Sv2nJyb5a4GX2Xg3qEAMC0CgYEA9o4GQ9IG6BRN8oA/a3Rvf/wVgE5Y6/i83WOqG/JNI/kLvgO/nOkIUpNILOOLVLW02328GW2QT9bPB1iyOVXGTUojfN9eCK8lvTT/OhRvOrn/jZxQOUqX1ckyOaNwf0zraKReryehjs3mC0anc1qmAFV2G+pWKeXeQ9P9S0Q9m4cCgYEAynNuSpz1HulEb97vPkvIsOOwselAMPCgNnIBKHDxxMYCs7AVh5o8eF/UvuTYfoXjHl/XQAPYIcxqvjJSY7z1FnPBcTX0fH0idk3aB10pYJ8u/Uvm+EZ3NW/XB8uDT2ggO0/9yO7bGmwrfH0nggGnftbrR5CUCz4SYFzWfkNhrQcCgYEA9W8GD4dItshXm7pM55Pd1sLDSJk1bZmLsLsgwHcgkVm+daXXncRgM4tHwt+0eFv1sLVmhM2LZd7I8mA58ldPcusFjq3wNqbb45CZLWDgJM649WgQeCeoI/oH1Fa9iwuwH9fYJXZHHhgbE0h/MpafPx/T1hAdO9IGwvCJad6BkYsCgYAthJyEnBukso/Xk0k5OXLLCrZ8mdP77O4or6NBA3voYRjUa7+7eFsmOW2s6ekfMV0qRCQyWWrr1nkdgFTz5dU5EhepK5dnsf7gmIpv42tdNQ0smDc7FSTSV+4B66j/Xor4qviFh+atXyq716vdWB/frdTCh2gxyuf40IbNZrr8WwKBgELF5s5ktXcOqRDw8J3JW5CXiwKVsLX6if+mK77NdoGChX1ffX+0BKKLOqMZfhpB0HpqlA/20AwKhX0/BiiV2devl+jabzwST8vg9aT7NHjOePOMdE2bJ+fcJGhLqOdg5Qo+yM/a3irBUYFvJpK66TG46LFbLNxugKOqxZvXyucM";
        //注：证书文件路径支持设置为文件系统中的路径或CLASS_PATH中的路径，优先从文件系统中加载，加载失败后会继续尝试从CLASS_PATH中加载
        // config.merchantCertPath = "<-- 请填写您的应用公钥证书文件路径，例如：/foo/appCertPublicKey_2019051064521003.crt -->";
        // config.alipayCertPath = "<-- 请填写您的支付宝公钥证书文件路径，例如：/foo/alipayCertPublicKey_RSA2.crt -->";
        // config.alipayRootCertPath = "<-- 请填写您的支付宝根证书文件路径，例如：/foo/alipayRootCert.crt -->";
        //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
        config.alipayPublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgg7i0fycEzG6z2PUE/t8Mc3M+/c48R4f2soZeI+A0G1gX0/ejLFnVPBofkWJ1mVzXjR4bTlX/DhXnDad1xt4TqPEp65uPuWRt1gSwcaTM41DenoXCcfPwd3J6Vf2AVJ4YEv7716ovK+/e+UzxL9M2mm8jIb1Pr1p2DDc66MlAkqHwIVGYDK+tHJJy4fjFhqRz3NSRSeY2uZi8aOtF5otSIrYxZFrYjMjrdGGVj67mKUQi/ZDaoaTzTH64tEQ21IXbmjJH0EmVdxseJ/N39heHmeXSzcpJCDirXZGqDO2PpZOLH4zibkZEjd/Q6wRFGVWaWFhQ7KtbnDuqQt/74M8SQIDAQAB";
        //可设置异步通知接收服务地址（可选）
        config.notifyUrl = "https://www.test.com/callback";
        //可设置AES密钥，调用AES加解密相关接口时需要（可选）
        config.encryptKey = "D/9fBsybuxt5ARPYcWDL5g==";
        return config;
    }

    /**
     * 获取支付宝的配置（正式环境）
     *
     * @return 支付宝的配置
     */
    // public static Config getConfig() {
    //     Config config = new Config();
    //     config.protocol = "https";
    //     config.gatewayHost = "openapi.alipay.com";
    //     config.signType = "RSA2";
    //     config.appId = "2021003141676135";
    //     // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
    //     config.merchantPrivateKey = "MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC12YM9mR+HFQYTx/fHKHZbgszVtDHDB0B/ysWl3MbcPpGtjcZlDr5aynRMRLaoduRHT++A98IaNVIVGj9RHdXrX2j9I/Uz6fYDH63cdu6FZ6Pk82yPwNZW7pebprbVHInR/7gzsKQWSWEST70BgjCRqlbfAE6xzUZFTeYxciCjptm0rUQ2MC24xRdkvZByIDIYFnQ/AdmSFqNtKDR2WpEV/M8aBjyuPPomRJZ1X8oudWuJIU4ySdas04fCbDxD10TY/wyQcDHXuG1IrQpXme4DOGQeJZ0/aOFphBkDFUyPGfYMmLshOPNdBKi2IqWHPPs4XsV4Rv6+tvTSnMF2uGqHAgMBAAECggEAPa1sifPpcZN74DGupGng2uDeQI1BY3iOM8m+h6b9+61tE4RGifgaMAkCsOuNWE4a1uURwphFyUXUdTvVxdlsuMw/e7w6akUsH5sbCO99rtmcCQdXBtrM1+dMnIpK8LUhOYyWGVIMFVMGDYPmAyD5AC7aEAC2sC+DafYl4RdoYpidq1YxeE7DVw1aQHCI2mKhYjZG+3RDDGDfNFvdyH61MgdYjoGkeXNvARzEXgfWvfiTrHZ3H1SYgvOEHofzKDTrWsQL2dvaEsc55Jiw0AgNUVcgby7al8PUekTJoK3ZvrE3pSWaUirBcqsqWISHjeR7Xx501CHIha8EnZwlnDoM4QKBgQDtnYzwQ5mHg7cRHD8Z6QdTpvBvYSEPesiUT/HeI+AKQKDCVJxKiLvJagc6zZkOzV9bZDS/WLgzXWMyxUb+OTjht0jLWAMcf7NfFp3tPKq9wkmQQ/vQSBQ1lFmO6A4Zq1eoGKeUCB4pKBG6cSM+t8+ruhm7s1ZUt+6EBwCVN/izrQKBgQDD62jIm+6NFErdidUaIrGiFUrzqdR13w6JOexfk+O6Aau3wRqsr7Wz4nqQvVVxGMRpXbOH06zpeiS+vMmjwgO973VoLAmH+hJ0GZz8qj3zA2GEOFWjD2V7tqeRvGkQvz0v46pl+8sBJkrRHLN7DWNYY5NDI+b7exwqcTc/LL19gwJ/a6r4MeZvqvgD+7zQ2uy8ZSs/xzg7wsfgG1QeRIn8+qhOL8AnEZ7jeGCS5hJDSHHGw6KkRA/vZ1bpnBfIE2naXGywj3NR9Zfnry6QYO8cbt+adcRYVghTH/QYoKiFuxvonEKPrIQBJqUBY3ngforLjwTEpEie1cSCT1Dc8sBp8QKBgQCaz8fqzRyBKknGKQXVMxj+JKknRUl3IpzP3o9jLu9BqdRQzSwQzH9d91Y2TQXY6mM5hys35xG5JCUo+vCyj7p5OWCiwjl90yMFzr93/+YXwtIpsoIo6R+d1EUxKZoz+4mT7+hT0dUlwWZZOr6wO3IHBBf3c8UvbqZg+zlWmDnblQKBgEs6jwMkb5zaG2fyBJ7PJUN/8nIz8V+X0SxQfcEqIX0J+EC+7MAgFjcdZFp+lca3Vd9z+8Ksd4rMzMa5y856ositL2NZ+K0fs8i8EBaQPny61OgCFUuXEuv5keB2YuGMSns5FYRWuByrtDXl4PxzKXvq05iKWLKCaCq9v4momvKZ";
    //     //注：证书文件路径支持设置为文件系统中的路径或CLASS_PATH中的路径，优先从文件系统中加载，加载失败后会继续尝试从CLASS_PATH中加载
    //     // config.merchantCertPath = "<-- 请填写您的应用公钥证书文件路径，例如：/foo/appCertPublicKey_2019051064521003.crt -->";
    //     // config.alipayCertPath = "<-- 请填写您的支付宝公钥证书文件路径，例如：/foo/alipayCertPublicKey_RSA2.crt -->";
    //     // config.alipayRootCertPath = "<-- 请填写您的支付宝根证书文件路径，例如：/foo/alipayRootCert.crt -->";
    //     //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
    //     config.alipayPublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhUnjdAKwZApwZEcfq+5L0pa77Vg3mqcoXv+th8RR0SYotkPsH1f2JkbS48ySaSCM6YNWSMNfqp5qdOla2zUJOBnJ/yaBg7s7fVD6V3M2mEog8kCDYGKt/3P4VII3xYl8lFYMQ3IcFRELkxCBBCA8JDKmf5z2R4F/Z/jFFEuOwxaJvp+7Ke9OzZHYdWGNnU6QP8YYLYUeX7VNZLHEuly34ExAw6A+yJkNDsYEho2Lu31QjT2pLh9g+88MlRfiI92iN25O9NVdeM4f5RcpvBPrBQZQs9tlFmALYSFS3prIf3FAobWM+W7iwxT6J25nFIhst1DdJQfIBpaeRUJVTkn99QIDAQAB";
    //     //可设置异步通知接收服务地址（可选）
    //     config.notifyUrl = "https://www.test.com/callback";
    //     //可设置AES密钥，调用AES加解密相关接口时需要（可选）
    //     config.encryptKey = "VCS4bdmoAgXRaOq/TQ4MwA==";
    //     return config;
    // }

}
