import { Annotation } from './Annotation';
import { AnnotationEnum } from './AnnotationEnum';
import { DataTypeEnum } from '../model/DataTypeEnum';
import { StringUtil } from '../langauage/StringUtil';
import { Dictionary } from '../langauage/Dictionary';


export class FieldAnnotation extends Annotation {
   /** 数据名称 */
   public dataName: string;
   /** 数据类型 */
   public dataCd: DataTypeEnum;
   /** 数据容器类 */
   public dataContainerClass: Function;
   /** 数据类 */
   public dataClass: Function;
   /** 数据默认 */
   public dataDefault: any;

   /**
    * 构造处理。
    *
    * @param name 名称
    * @param dataName 数据名称
    * @param dataCd 数据类型
    * @param dataClass 数据对象
    * @param dataDefault 数据默认
    */
   public constructor(name?: string, dataName?: String, dataCd?: DataTypeEnum, dataClass?: any, dataDefault?: any) {
      super(name as any);
      // 设置属性
      this._annotationCd = AnnotationEnum.Field;
      this._inherit = true;
      this._duplicate = true;
      // 设置数据名称
      var code = null;
      if (dataName == null) {
         if (StringUtil.startsWith(name, '_')) {
            code = (name as any).substring(1);
         } else {
            code = name;
         }
         code = StringUtil.toUnderline(code);
      } else {
         code = dataName;
      }
      this.dataName = code as any;
      this.dataCd = dataCd as any;
      if (dataClass) {
         if (dataClass instanceof Array) {
            this.dataContainerClass = dataClass[0];
            this.dataClass = dataClass[1];
         } else {
            this.dataClass = dataClass;
         }
      }
      this.dataDefault = dataDefault;
   }

   /**
    * 获得代码。
    *
    * @return String 代码
    */
   public get code(): string {
      return this.name;
   }

   /**
    * 根据数据名称查找描述器。
    *
    * @param annotations 描述器集合
    * @param dataName 数据名称
    * @return 描述器
    */
   public static findByDataName(annotations: Dictionary<Annotation>, dataName: string): FieldAnnotation {
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            var annotation = annotations.value(i) as FieldAnnotation;
            if (annotation.dataName == dataName) {
               return annotation;
            }
         }
      }
      return null as any;
   }
}
