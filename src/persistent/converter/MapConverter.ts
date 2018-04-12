import { PersistentAccessEnum } from '../PersistentAccessEnum';
import { PersistentAnnotation } from '../PersistentAnnotation';
import { PersistentContext } from '../PersistentContext';
import { PersistentFactory } from '../PersistentFactory';
import { FieldConverter } from './FieldConverter';

/**
 * 数组字段转换器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class MapConverter extends FieldConverter {
   /** 容器类型 */
   public containerType: any;

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
      // 获得对象
      var name = annotation.name;
      var dataClass = annotation.dataClass;
      var datas = item[name];
      if (!datas) {
         datas = item[name] = new this.containerType();
      }
      // 加载数据
      if (values != null) {
         for (var code in values) {
            var value = values[code];
            var data = null;
            if (typeof value == 'object') {
               var className = value[factory.fieldClassName];
               if (className) {
                  data = factory.create(context, value);
               } else if (dataClass) {
                  data = new (dataClass as any)();
                  //factory.loadInstance(context, data, value);
               }
            } else {
               data = value;
            }
            datas[code] = data;
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
      var datas = item[annotation.name];
      if (datas) {
         // 存储数据
         var values = new Object() as any;
         for (var code in datas) {
            var data = datas[code];
            var value = null;
            if (typeof data == 'object') {
               //value = factory.saveInstance(context, data);
            } else {
               value = data;
            }
            values[code] = value;
         }
         config[annotation.dataName] = values;
      }
   }
}
