package com.sl.transport.common.aspect;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.AspectUtil;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 请求参数校验切面，统一对Controller中@RequestBody映射的对象进行校验，在Controller方法中无需单独处理
 */
@Aspect
@Slf4j
@EnableAspectJAutoProxy
@Component
public class ValidatedAspect {

    @Resource
    private Validator validator;

    @Around("execution(* com.sl..controller.*Controller.*(..))")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        // 获取@RequestBody映射的对象
        Object body = AspectUtil.getBody(proceedingJoinPoint);
        // 不为空的body进行拦截校验
        if (!ObjectUtil.isEmpty(body)) {
            // 进行校验
            Set<ConstraintViolation<Object>> validateResult = validator.validate(body);
            if (CollUtil.isNotEmpty(validateResult)) {
                //没有通过校验，抛出异常，由统一异常处理机制进行处理，响应400
                String info = JSONUtil.toJsonStr(validateResult.stream()
                        .map(ConstraintViolation::getMessage).collect(Collectors.toList()));
                throw new SLException(info, HttpStatus.BAD_REQUEST.value());
            }
        }
        //校验通过，执行原方法
        return proceedingJoinPoint.proceed(proceedingJoinPoint.getArgs());
    }

}
