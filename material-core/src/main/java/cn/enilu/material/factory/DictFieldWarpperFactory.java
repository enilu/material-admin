package cn.enilu.material.factory;

import cn.enilu.material.bean.enumeration.BizExceptionEnum;
import cn.enilu.material.bean.exception.ApplicationException;
import cn.enilu.material.service.system.IConstantFactory;
import cn.enilu.material.service.system.impl.ConstantFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;

/**
 * 字段的包装创建工厂
 *
 * @author fengshuonan
 * @date 2017-05-06 15:12
 */
public class DictFieldWarpperFactory {
    private static Logger logger = LoggerFactory.getLogger(DictFieldWarpperFactory.class);
    public static Object createFieldWarpper(Object field, String methodName) {
        IConstantFactory me = ConstantFactory.me();
        try {
            Method method = IConstantFactory.class.getMethod(methodName, field.getClass());
            Object result = method.invoke(me, field);
            return result;
        } catch (Exception e) {
           logger.error("field:{},methodName:{}",field,methodName);
            try {
                Method method = IConstantFactory.class.getMethod(methodName, Long.class);
                Object result = method.invoke(me, Long.valueOf(field.toString()));
                return result;
            } catch (Exception e1) {
                throw new ApplicationException(BizExceptionEnum.ERROR_WRAPPER_FIELD);
            }
        }
    }

}
