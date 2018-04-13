import { Converter } from '../Converter';
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { AssertUtil } from '../../util/AssertUtil';
import { RuntimeUtil } from '../../util/RuntimeUtil';

/**
 * 对象持久化。
 */
export class ObjectConverter extends Converter {

   /**
    * 加载设置信息。
    *
    * @param factory 工厂
    * @param context 环境
    * @param item 内容
    * @param config 设置
    * @param annotation 描述器
    */
   public load(factory: PersistentFactory, context: PersistentContext, node: any, config: any, annotation: PersistentAnnotation) {

      var itemConfig = this.getDataValue(annotation, config);
      var name = annotation.name;
      var dataName = annotation.dataName;
      var item = factory.createInstance(itemConfig[factory.fieldClassName]);
      node[name] = item;

      // 获得描述器集合
      var annotations = factory.findPeistenceAnnotations(item);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            var annotation = annotations.get(i);
            var dataConverter = annotation.dataConverter as any;
            var converter = new dataConverter();
            converter.load(factory, context, item, itemConfig, annotation);
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
      var childItem = item[name];
      if (childItem) {
         // 设置类名
         var itemConfig = config[dataName] = new Object() as any;
         var className = factory.findClassName(childItem);
         itemConfig[factory.fieldClassName] = className;

         // 根据描述器存储内容
         var annotations = factory.findPeistenceAnnotations(childItem);
         if (annotations) {
            var count = annotations.count;
            for (var i = 0; i < count; i++) {
               // 存储属性
               var annotation = annotations.get(i);
               var dataConverter = annotation.dataConverter as any;
               var converter = new dataConverter();
               converter.save(factory, context, childItem, itemConfig, annotation);
            }
         }
      }
   }

}
