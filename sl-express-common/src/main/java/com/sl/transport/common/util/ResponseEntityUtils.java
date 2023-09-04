package com.sl.transport.common.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * ResponseEntity 响应工具类
 *
 * @author zzj
 * @version 1.0
 */
public class ResponseEntityUtils {

    public static ResponseEntity<Void> created() {
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public static ResponseEntity<Void> ok() {
        return ResponseEntity.ok(null);
    }

    public static <T> ResponseEntity<T> ok(T t) {
        return ResponseEntity.ok(t);
    }

    public static ResponseEntity<Void> error() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

}

