import { PersistentAccessEnum } from '../PersistentAccessEnum';
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';

/**
 * 数据转换器。
 */
export class DataConverter extends FieldConverter {
   /** 容器类型 */
   public containerType: Function;

   /**
    * 构造处理。
    */
   public constructor(accessCd: PersistentAccessEnum = PersistentAccessEnum.GetSet, containerType: Function = Object) {
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
   public load(factory: PersistentFactory, context: PersistentContext, item: any, config: any, annotation?: PersistentAnnotation) {
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
         item[annotation.name] = new (this.containerType as any)();
      } else {
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
   public save(factory: PersistentFactory, context: PersistentContext, item: any, config: any, annotation?: PersistentAnnotation) {
      // 获得数组
      var name = annotation.name;
      var value = item[name];
      // 存储数据
      if (value) {
         config[annotation.dataName] = value;
      }
   }
}
