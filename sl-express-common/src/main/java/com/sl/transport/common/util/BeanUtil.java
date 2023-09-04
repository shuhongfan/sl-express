package com.sl.transport.common.util;

import cn.hutool.core.collection.CollUtil;
import com.sl.transport.common.handler.ConvertHandler;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.List;

public class BeanUtil extends cn.hutool.core.bean.BeanUtil {
    /**
     * 对象或Map转Bean
     *
     * @param originObject   源对象或Map
     * @param entityClass    目标的Bean类型
     * @param convertHandler 特殊对象类型转换器，可传null，即不进行特殊处理
     * @return 目标对象
     */
    public static <O, T> T toBean(O originObject, Class<T> entityClass, ConvertHandler<O, T> convertHandler) {
        T targetObject = cn.hutool.core.bean.BeanUtil.toBean(originObject, entityClass);
        //特殊类型转换
        if (ObjectUtil.isNotEmpty(targetObject) && ObjectUtil.isNotEmpty(convertHandler)) {
            convertHandler.map(originObject, targetObject);
        }
        return targetObject;
    }

    /**
     * 对象或Map转Bean，忽略字段转换时发生的异常
     *
     * @param originObject   源对象或Map
     * @param entityClass    目标的Bean类型
     * @param ignoreError    是否忽略注入错误
     * @param convertHandler 特殊对象类型转换器，可传null，即不进行特殊处理
     * @return 目标对象
     */
    public static <O, T> T toBeanIgnoreCase(O originObject, Class<T> entityClass, boolean ignoreError, ConvertHandler<O, T> convertHandler) {
        T targetObject = cn.hutool.core.bean.BeanUtil.toBeanIgnoreCase(originObject, entityClass, ignoreError);
        //特殊类型转换
        if (ObjectUtil.isNotEmpty(targetObject) && ObjectUtil.isNotEmpty(convertHandler)) {
            convertHandler.map(originObject, targetObject);
        }
        return targetObject;
    }

    /**
     * 对象或Map转Bean，忽略字段转换时发生的异常
     *
     * @param originObject   源对象或Map
     * @param entityClass    目标的Bean类型
     * @param convertHandler 特殊对象类型转换器，可传null，即不进行特殊处理
     * @return 目标对象
     */
    public static <O, T> T toBeanIgnoreError(O originObject, Class<T> entityClass, ConvertHandler<O, T> convertHandler) {
        T targetObject = cn.hutool.core.bean.BeanUtil.toBeanIgnoreError(originObject, entityClass);
        //特殊类型转换
        if (ObjectUtil.isNotEmpty(targetObject) && ObjectUtil.isNotEmpty(convertHandler)) {
            convertHandler.map(originObject, targetObject);
        }
        return targetObject;
    }

    /**
     * 复制集合中的Bean属性
     *
     * @param originList     原Bean集合
     * @param targetType     目标Bean类型
     * @param convertHandler 特殊对象类型转换器，可传null，即不进行特殊处理
     * @return 复制后的List
     */
    public static <O, T> List<T> copyToList(List<O> originList, Class<T> targetType, ConvertHandler<O, T> convertHandler) {
        List<T> targetList = cn.hutool.core.bean.BeanUtil.copyToList(originList, targetType);
        //特殊类型转换
        if (CollUtil.isNotEmpty(targetList) && ObjectUtil.isNotEmpty(convertHandler)) {
            for (int i = 0; i < originList.size(); i++) {
                convertHandler.map(originList.get(i), targetList.get(i));
            }
        }
        return targetList;
    }

    /**
     * 为object设置默认值，对target中的基本类型进行默认值初始化,
     * 为null的对象不操作
     *
     * @param target 目标对象
     */
    public static void setDefault(Object target) {
        if (ObjectUtil.isEmpty(target)) {
            return;
        }
        Class<?> clazz = target.getClass();
        Field[] declaredFields = clazz.getDeclaredFields();
        for (Field field : declaredFields) {
            setDefault(field, target);
        }

    }

    private static void setDefault(Field field, Object target) {
        ReflectionUtils.makeAccessible(field);
        try {
            Object value = field.get(target);
            if (ObjectUtil.isNotEmpty(value)) {
                return;
            }
            String type = field.getGenericType().toString();
            Object defaultValue;
            switch (type) {
                case "class java.lang.String":
                case "class java.lang.Character": {
                    defaultValue = "";
                    break;
                }
                case "class java.lang.Double": {
                    defaultValue = 0.0d;
                    break;
                }
                case "class java.lang.Long": {
                    defaultValue = 0L;
                    break;
                }
                case "class java.lang.Short": {
                    defaultValue = (short) 0;
                    break;
                }
                case "class java.lang.Integer": {
                    defaultValue = 0;
                    break;
                }
                case "class java.lang.Float": {
                    defaultValue = 0f;
                    break;
                }
                case "class java.lang.Byte": {
                    defaultValue = (byte) 0;
                    break;
                }
                case "class java.math.BigDecimal": {
                    defaultValue = BigDecimal.ZERO;
                    break;
                }
                case "class java.lang.Boolean": {
                    defaultValue = Boolean.FALSE;
                    break;
                }
                default: {
                    defaultValue = null;
                }

            }
            ReflectionUtils.setField(field, target, defaultValue);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
