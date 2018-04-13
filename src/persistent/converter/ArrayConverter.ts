
import { PersistentAccessEnum } from '../PersistentAccessEnum';
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';
import { Types } from '../../langauage/Types';

/**
 * 数组字段转换器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class ArrayConverter extends FieldConverter {
   /** 数据类型 */
   public static CLASS_NAME: string = 'converter.array';
   /** 容器类型 */
   public containerType: any;

   /**
    * 构造处理。
    */
   public constructor(accessCd: PersistentAccessEnum = PersistentAccessEnum.GetSet, containerType: Function = Array) {
      super(accessCd);
      // 设置属性
      this.containerType = containerType;
   }

   /**
    * 加载设置信息。
    *
    * @param factory 工厂
    * @param context 环境
    * @param item 内容
    * @param config 设置
    * @param annotation 描述器
    */
   public load(factory: PersistentFactory, context: PersistentContext, item: any, config: any, annotation: PersistentAnnotation) {
      // 获得数据
      var values = this.getDataValue(annotation, config);
      // 获得数组
      var name = annotation.name;
      var dataClass = annotation.dataClass;
      var data = item[name];
      if (data != null) {
      } else {
         if (annotation.dataContainerClass) {
            data = new (annotation.dataContainerClass as any)();
         } else {
            data = new this.containerType();
         }
         item[name] = data;
      }
      // 加载数据
      if (values != null) {
         var count = values.length;
         for (var i = 0; i < count; i++) {
            var value = values[i];
            // 获得项目
            var instance = null;
            if (value != null) {
               if (typeof value == 'object') {
                  var className = value[factory.fieldClassName];
                  if (className) {
                     //  instance = factory.create(context, value);
                  } else if (dataClass) {
                     instance = new (dataClass as any)();
                     factory.loadInstance(context, instance, value);
                  } else {
                     instance = value;
                  }

               } else {
                  instance = value;
               }
            }
            // 增加到集合
            if (instance != null) {
               // 设置数据
               if (typeof instance == 'object') {
                  var identity = instance[factory.fieldStorageIdentity];
                  if (identity) {
                     context.set(identity, instance);
                  }
               }
            }
         }
      }
   }

   /**
    * 存储设置信息。
    *
    * @param factory 工厂
    * @param context 环境
    * @param item 内容
    * @param config 设置
    * @param annotation 描述器
    */
   public save(factory: PersistentFactory, context: PersistentContext, item: any, config: any, annotation: PersistentAnnotation) {
      // 获得数组
      var name = annotation.name;
      var array = item[name];
      // 获得定义
      var dataName = annotation.dataName;
      var values = new Array<any>();
      // 加载数据
      if (array != null) {
         if (array instanceof Types) {
            var count = array.count;
            for (var i = 0; i < count; i++) {
               var item = array.get(i);
               var value = null;
               if (item) {
                  if (typeof item == 'object') {
                     value = factory.saveInstance(context, item);
                  } else {
                     value = item;
                  }
               }
               if (value) {
                  values.push(value);
               }
            }
         } else if (array instanceof Array) {
            var count = array.length;
            for (var i = 0; i < count; i++) {
               var item = array[i];
               var value = null;
               if (item) {
                  if (typeof item == 'object') {
                     value = factory.saveInstance(context, item);
                  } else {
                     value = item;
                  }
               }
               if (value) {
                  values.push(value);
               }
            }
         }
      }
      // 保存内容
      if (values.length > 0) {
         this.setDataValue(annotation, config, values);
      }
   }
}
