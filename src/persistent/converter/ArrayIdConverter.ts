import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';
import { Types } from '../../langauage/Types';

/**
 * 数组编号转换器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class ArrayIdConverter extends FieldConverter {
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
      // 检查合并
      if (values === undefined) {
         if (factory.optionMerge) {
            return;
         } else {
            values = annotation.dataDefault;
         }
      }
      // 加载数据
      var name = annotation.name;
      var dataName = annotation.dataName;
      var containerClass = annotation.dataContainerClass;
      if (values != null) {
         var data = item[name];
         if (data) {
         } else if (containerClass) {
            data = item[name] = new (containerClass as any)();
         } else {
            data = item[name] = new Array<any>();
         }
         // 保存数据
         var count = values.length;
         if (data instanceof Array || data instanceof Types) {
            for (var i = 0; i < count; i++) {
               var id = values[i];
               var item = context.get(id);
               if (item) {
                  data.push(item);
               }
            }
         } else if (typeof data == 'object') {
            for (var i = 0; i < count; i++) {
               var id = values[i];
               var item = context.get(id);
               if (item) {
                  data[item.id] = item;
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
      var name = annotation.name;
      var dataName = annotation.dataName;
      var array = item[name];
      var fieldStorageIdentity = factory.fieldStorageIdentity;
      var data = null;
      if (array instanceof Types) {
         var count = array.count;
         for (var i = 0; i < count; i++) {
            var value = array.get(i);
            if (value) {
               // 创建数组
               if (!data) {
                  data = new Array();
               }
               // 存储数据
               var identity = value[fieldStorageIdentity];
               data.push(identity);
            }
         }
      } else {
         for (var id in array) {
            var value = array[id];
            if (value) {
               // 创建数组
               if (!data) {
                  data = new Array();
               }
               // 存储数据
               var identity = value[fieldStorageIdentity];
               data.push(identity);
            }
         }
      }
      if (data) {
         config[dataName] = data;
      }
   }
}
