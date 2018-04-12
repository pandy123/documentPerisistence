import { PersistentAccessEnum } from '../PersistentAccessEnum';
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';

/**
 * 时间日期持久化器。
 */
export class DateTimeConverter extends FieldConverter {
   /** 格式 */
   public format: string;

   /**
    * 构造处理。
    */
   public constructor(accessCd: PersistentAccessEnum = PersistentAccessEnum.GetSet, format: string = 'YYYYMMDDHH24MISS') {
      super(accessCd);
      // 设置属性
      this.format = format;
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
      var datetime = item[annotation.name];
      if (value) {
         if (value.constructor == String) {
            datetime.parse(value as string, this.format);
         } else if (value.time) {
            datetime.set(value.time);
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
      var datetime = item[annotation.name];
      if (datetime) {
         var value = datetime.format(this.format);
         if (!value != null) {
            this.setDataValue(annotation, config, value);
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
      var name = annotation.name;
      var sourceDateTime = source[name];
      var targetDateTime = target[name];
      targetDateTime.assign(sourceDateTime);
   }
}
