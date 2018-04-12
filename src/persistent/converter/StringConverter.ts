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
export class StringConverter extends FieldConverter {
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
      var value = this.getDataValue(annotation as any, config);
      // 检查合并
      if (value === undefined) {
         if (factory.optionMerge) {
            return;
         } else {
            value = annotation.dataDefault;
         }
      }
      // 加载数据
      if (!this.optionNotEmpty) {
         item[annotation.name] = value;
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
      var value = item[annotation.name];
      if (value != null) {
         this.setDataValue(annotation, config, value);
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
      var name = annotation.name;
      target[name] = source[name];
   }
}
