package com.sl.transport.common.util;


import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.LocalVariableTableParameterNameDiscoverer;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.web.bind.annotation.RequestBody;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class AspectUtil {

    /**
     * 获取被拦截方法对象
     * @param pjp {@link ProceedingJoinPoint}
     * @return {@link Method}
     */
    public static Method getMethod(ProceedingJoinPoint pjp) {
        //获取参数的类型
        Signature sig = pjp.getSignature();
        if (sig instanceof MethodSignature) {
            MethodSignature methodSignature = (MethodSignature) sig;
            return methodSignature.getMethod();
        } else {
            throw new IllegalArgumentException("It's not method");
        }
    }

    /**
     * 解析SPEL表达式
     *
     * @param key key
     * @param method {@link   Method}
     * @param args {@code Object[]}
     * @return key
     */
    public static String parse(String key, Method method, Object[] args) {
        if (StringUtils.isNotBlank(key) && key.indexOf("#") > -1) {
            Pattern pattern = Pattern.compile("(\\#\\{([^\\}]*)\\})");
            Matcher matcher = pattern.matcher(key);
            List<String> keys = new ArrayList<>();
            while (matcher.find()) {
                keys.add(matcher.group());
            }
            if (!CollectionUtils.isEmpty(keys)) {
                LocalVariableTableParameterNameDiscoverer u = new LocalVariableTableParameterNameDiscoverer();
                String[] paraNameArr = u.getParameterNames(method);
                ExpressionParser parser = new SpelExpressionParser();
                StandardEvaluationContext context = new StandardEvaluationContext();
                for (int i = 0; i < paraNameArr.length; i++) {
                    context.setVariable(paraNameArr[i], args[i]);
                }
                for (String tmp : keys) {
                    key = key.replace(tmp, parser.parseExpression("#" + tmp.substring(2, tmp.length() - 1)).getValue(context, String.class));
                }
                return key;
            }
        }
        return key;
    }

    /**
     * 获取请求体
     *
     * @param pjp {@link ProceedingJoinPoint}
     * @return {@code Object}
     */
    public static Object getBody(ProceedingJoinPoint pjp) {
        Object[] args = pjp.getArgs();
        Method method = getMethod(pjp);

        if (ObjectUtil.isNotEmpty(args)) {
            Annotation[][] parameterAnnotations = method.getParameterAnnotations();
            for (int count = 0; count < parameterAnnotations.length; count++) {
                for (Annotation annotation : parameterAnnotations[count]) {
                    if (annotation instanceof RequestBody) {
                        return args[count];
                    }
                }
            }
        }
        return null;
    }
}
