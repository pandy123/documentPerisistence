
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';
import { DataTypeEnum } from '../../model/DataTypeEnum';
import { FloatUtil } from '../../langauage/FloatUtil';

/**
 * 浮点数转换器。
 */
export class FloatConverter extends FieldConverter {
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
      var value = this.getDataValue(annotation, config);
      // 检查合并
      if (value === undefined) {
         if (factory.optionMerge) {
            return;
         } else {
            value = annotation.dataDefault;
         }
      }
      // 加载数据
      if (value == null) {
         value = 0;
      }
      item[annotation.name] = value;
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
      var value = item[name];
      if (value != null) {
         var saveValue = parseFloat(value);
         switch (annotation.dataCd) {
            case DataTypeEnum.Float16:
               saveValue = FloatUtil.round(saveValue, 4);
               break;
            case DataTypeEnum.Float32:
               saveValue = FloatUtil.round(saveValue, 6);
               break;
            case DataTypeEnum.Float64:
               saveValue = FloatUtil.round(saveValue, 12);
               break;
         }
         this.setDataValue(annotation, config, saveValue);
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
