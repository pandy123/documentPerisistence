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
   public load(factory: PersistentFactory, context: PersistentContext, item: any, config: any, annotation: PersistentAnnotation) {
      AssertUtil.debugNotNull(factory);
      AssertUtil.debugNotNull(item);
      AssertUtil.debugNotNull(config);
      AssertUtil.debugNotNull(annotation);
      // 获得数据
      var valueConfig = this.getDataValue(annotation, config);
      // 检查合并
      if (valueConfig === undefined) {
         if (factory.optionMerge) {
            return;
         } else {
            valueConfig = annotation.dataDefault;
         }
      }
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = item[name];
      // 实例化内容
      if (valueConfig == null) {
         return;
      } else if (value == null) {
         var className = valueConfig[factory.fieldClassName];
         if (className) {
            value = item[name] = factory.createInstance(className);
         } else {
            return;
         }
      }
      AssertUtil.debugNotNull(value);
      AssertUtil.debugNotNull(valueConfig);
      // 设置识别
      if (context && context.set && factory.fieldStorageIdentity) {
         var identity = valueConfig[factory.fieldStorageIdentity];
         AssertUtil.debugNotEmpty(identity);
         var contextValue = context.get(identity);
         if (contextValue && contextValue != value) {
            var newIdentity = RuntimeUtil.makeUuid();
            identity = value[factory.fieldStorageIdentity] = newIdentity;
         }
         context.set(identity, value);
      }
      // 开始更新
      if (factory.optionUpdated && item.beginUpdate) {
         item.beginUpdate();
      }
      // 获得描述器集合
      var annotations = factory.findAnnotations(value);
      if (annotations) {
         // 处理字段集合
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 加载属性
            var annotation = annotations.get(i);
            if (annotation.invalid) {
               // 判定是否过滤字段
               if (!context.isFilterField(annotation.name)) {
                  // 加载处理
                  var converter = annotation.converter;
                  //converter.load(factory, context, value, valueConfig, annotation);
               }
            }
         }
      }
      // 执行加载函数
      if (value.loadConfig) {
         value.loadConfig(context, valueConfig);
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
      AssertUtil.debugNotNull(config);
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = item[name];
      if (value) {
         // 设置类名
         var itemConfig = config[dataName] = new Object() as any;
         itemConfig[factory.fieldClassName] = factory.findClassName(value);
         itemConfig[factory.fieldVersion] = factory.version;
         // 根据描述器存储内容
         var annotations = factory.findAnnotations(value);
         if (annotations) {
            var count = annotations.count;
            for (var i = 0; i < count; i++) {
               // 存储属性
               var annotation = annotations.get(i);
               if (annotation.invalid) {
                  // 判定是否过滤字段
                  if (!context.isFilterField(annotation.name)) {
                     // 保存处理
                     var converter = annotation.converter;
                     // converter.save(factory, context, value, itemConfig, annotation);
                  }
               }
            }
         }
         // 执行存储函数
         if (value.saveConfig) {
            value.saveConfig(context, itemConfig);
         }
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
      var annotations = factory.findAnnotations(target);
      if (annotations) {
         // 处理字段集合
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.get(i);
            if (annotation.invalid) {
               if (!context.isFilterField(annotation.name)) {
                  // 复制处理
                  var converter = annotation.converter;
                  // converter.copy(factory, context, source, target, annotation);
               }
            }
         }
      }
      // 执行存储函数
      if (source.copyConfig) {
         source.copyConfig(context, target);
      }
   }
}
