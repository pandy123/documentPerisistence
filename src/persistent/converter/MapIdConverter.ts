import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';

/**
 * 数组编号持久化器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class MapIdConverter extends FieldConverter {
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
      // 获得对象
      var items = item[annotation.name];
      if (values) {
         var count = values.length;
         for (var i = 0; i < count; i++) {
            var id = values[i];
            var item = context.get(id);
            if (item) {
               items[item.id] = item;
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
      var items = item[annotation.name];
      var data = new Array();
      for (var id in items) {
         var item = items[id];
         // 存储数据
         var identity = item[factory.fieldStorageIdentity];
         data.push(identity);
      }
      config[annotation.dataName] = data;
   }
}
