
import { AnnotationEnum } from './AnnotationEnum';
import { ClassUtil } from './ClassUtil';
import { FieldAnnotation } from './FieldAnnotation';
import { PropertyAnnotation } from './PropertyAnnotation';


export function Property(
   getter?: any,
   setter?: any,
   checker?: any,
   dataChanged: string = 'onFieldChanged') {
   return function (target: any, name: string): void {
      var options = new Object() as any;
      // 注册描述器
      var annotation = new PropertyAnnotation(name, null as any, null as any, null, null, null, null);
      var clazz = ClassUtil.get(target.constructor);
      clazz.register(annotation);
      // 设置属性
      var propertyName: string = '__' + name;
      var descriptor: any = new Object();
      descriptor.get = function () {
         var value = this[propertyName];
         var result = value;
         // 获得内容
         if (getter) {
            var getterInvoker = this[getter];
            if (getterInvoker) {
               result = getterInvoker.call(this, value);
            }
         }
         if (result === void 0) {
            // 获得默认值
            var field = clazz.findAnnotation(AnnotationEnum.Field, name) as FieldAnnotation;
            var dataDefault = null;
            if (field) {
               dataDefault = field.dataDefault;
               if (dataDefault != void 0) {
                  this[propertyName] = dataDefault;
               }
            }
            return dataDefault;
         }
         return result;
      };
      descriptor.set = function (value: any) {
         // 设置实例内容
         var result = true;
         var oldValue = this[propertyName];
         var newValue = value;
         // 检查内容
         if (!options.setuped) {
            options.field = clazz.findAnnotation(AnnotationEnum.Field, name) as FieldAnnotation;
            options.setuped = true;
         }
         if (options.field && options.validator) {
         }
         // 设置内容
         if (setter) {
            if (setter.constructor == Function) {
               newValue = setter(this, oldValue, newValue);
            } else {
               var setterInvoker = this[setter];
               if (setterInvoker) {
                  newValue = setterInvoker.call(this, oldValue, newValue);
               }
            }
         }
         // 函数调用处理
         if (oldValue !== newValue) {
            this[propertyName] = newValue;
            if (!this._disableFieldChanged && dataChanged) {
               var invoker = this[dataChanged];
            }
         }
      }
      return descriptor;
   }
}
