import { Converter } from '../Converter';
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';

/**
 * JSON属性持久化。
 */
export class ContainerConverter extends Converter {
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
      // 开始更新
      if (factory.optionUpdated && item.beginUpdate) {
         item.beginUpdate();
      }
      // 获得描述器集合
      var annotations = factory.findAnnotations(item);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 加载属性
            var annotation = annotations.get(i);
            if (annotation.invalid) {
               var converter = annotation.converter;
               if (converter.isGetter()) {
                  //converter.load(factory, context, item, values, annotation);
               }
            }
         }
      }
      // 执行加载函数
      if (item.loadConfig) {
         item.loadConfig(context, values);
      }
      // 结束更新
      if (factory.optionUpdated && item.endUpdate) {
         item.endUpdate(false);
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
      // 根据描述器存储内容
      var annotations = factory.findAnnotations(item);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.get(i);
            if (annotation.invalid) {
               var converter = annotation.converter;
               if (converter.isSetter()) {
                  //converter.save(factory, context, item, config, annotation);
               }
            }
         }
      }
      // 执行存储函数
      if (item.saveConfig) {
         item.saveConfig(context, config);
      }
   }

   /**
    * 复制设置信息。
    *
    * @param factory 工厂
    * @param context 环境
    * @param source 来源
    * @param target 目标
    * @param annotation 描述器
    */
   public copy(factory: PersistentFactory, context: PersistentContext, source: any, target: any, annotation: PersistentAnnotation) {
      // 根据描述器存储内容
      var annotations = factory.findAnnotations(source);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.get(i);
            if (annotation.invalid) {
               var converter = annotation.converter;
               // converter.copy(factory, context, source, target, annotation);
            }
         }
      }
      // 执行存储函数
      if (source.copyConfig) {
         source.copyConfig(context, target);
      }
   }
}
