
import { PersistentAccessEnum } from './PersistentAccessEnum';
import { PersistentAnnotation } from './PersistentAnnotation';
import { PersistentFactory } from './PersistentFactory';

/**
 * 持久化器。
 */
export class Converter {
   /** 数据类型 */
   public static CLASS_NAME: string = 'converter';
   /** 权限类型 */
   public accessCd: PersistentAccessEnum;
   /** 数据为空不读取 */
   public optionNotEmpty: boolean;

   /**
    * 构造处理。
    */
   public constructor(accessCd: PersistentAccessEnum = PersistentAccessEnum.GetSet, notEmpty: boolean = false) {
      // 设置属性
      this.accessCd = accessCd;
      this.optionNotEmpty = notEmpty;
   }

   /**
    * 是否可以获取数据。
    *
    * @return 是否可以
    */
   public isGetter(): boolean {
      return this.accessCd == PersistentAccessEnum.Getter || this.accessCd == PersistentAccessEnum.GetSet;
   }

   /**
    * 是否设置获取数据。
    *
    * @return 是否可以
    */
   public isSetter(): boolean {
      return this.accessCd == PersistentAccessEnum.Setter || this.accessCd == PersistentAccessEnum.GetSet;
   }

   /**
    * 获得内容。
    *
    * @param annotation 描述器
    * @param item 内容
    * @param defaultValue 默认内容
    * @return 内容
    */
   public getDataValue(annotation: PersistentAnnotation, config: any, defaultValue?: any): any {
      if (annotation != null) {
         // 获得关联内容
         var dataGetNames = annotation.dataGetNames;
         if (dataGetNames) {
            var count = dataGetNames.length;
            for (var i = 0; i < count; i++) {
               var getName = dataGetNames[i];
               var value = config[getName];
               if (value !== undefined) {
                  return value;
               }
            }
         }
         // 获得数据内容
         var dataName = annotation.dataName;
         var value = config[dataName];
         if (value !== undefined) {
            return value;
         }
         // 获得默认内容
         return defaultValue;
      } else {
         return config;
      }
   }

   /**
    * 设置内容。
    *
    * @param annotation 描述器
    * @param item 内容
    * @param defaultValue 默认内容
    * @return 内容
    */
   public setDataValue(annotation: PersistentAnnotation, config: any, value: any): any {
      if (annotation != null) {
         // 获得数据内容
         var dataName = annotation.dataName;
         config[dataName] = value;
         // 获得关联内容
         var dataSetNames = annotation.dataSetNames;
         if (dataSetNames) {
            var count = dataSetNames.length;
            for (var i = 0; i < count; i++) {
               var setName = dataSetNames[i];
               config[setName] = value;
               if (value != null) {
                  return value;
               }
            }
         }
      }
   }

   /**
    * 过滤对象。
    *
    * @param result 结果集合
    * @param value 内容
    */
   public filter(result: Array<any>, value: any) {
      result.push(value);
   }

}
