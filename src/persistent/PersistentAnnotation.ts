import { Converter } from './Converter';
import { Annotation } from '../decorator/Annotation';
import { DataTypeEnum } from '../model/DataTypeEnum';
import { AnnotationEnum } from '../decorator/AnnotationEnum';


export class PersistentAnnotation extends Annotation {
   /** 有效性 */
   public invalid: boolean;
   /** 数据名称 */
   public dataName: string;
   /** 数据读取名称集合 */
   public dataGetNames: Array<string>;
   /** 数据写入名称集合 */
   public dataSetNames: Array<string>;
   /** 数据类型 */
   public dataCd: DataTypeEnum;
   /** 数据默认 */
   public dataDefault: any;
   /** 数据容器类 */
   public dataContainerClass: Function;
   /** 数据类 */
   public dataClass: Function;
   /** 数据转换器 */
   public dataConverter: Converter;
   /** 转换器 */
   public converter: Converter;
   /** 优先级 */
   public priority: number;

   /**
    * 构造处理。
    *
    * @param name 名称
    * @param dataConverter 数据转换器
    */
   public constructor(name?: string, dataConverter?: any, containerType?: any) {
      super(name as any);
      // 设置属性
      this.invalid = true;
      this._annotationCd = AnnotationEnum.Persistent;
      this._inherit = true;
      // 设置数据名称
      this.dataConverter = dataConverter;
      this.dataContainerClass = containerType;
      this.priority = 0;
   }

   /**
    * 获得代码。
    *
    * @return 代码
    */
   public get code(): string {
      return this.name;
   }

   /**
    * 接收处理。
    *
    * @param annotation 描述器
    */
   public assign(annotation: PersistentAnnotation) {
      super.assign(annotation);
      this.invalid = annotation.invalid;
      this.dataName = annotation.dataName;
      this.dataGetNames = annotation.dataGetNames;
      this.dataSetNames = annotation.dataSetNames;
      this.dataCd = annotation.dataCd;
      this.dataDefault = annotation.dataDefault;
      this.dataClass = annotation.dataClass;
      this.dataConverter = annotation.dataConverter;
      this.dataContainerClass = annotation.dataContainerClass;
      this.priority = annotation.priority;
   }

   /**
    * 优先级排序器。
    *
    * @param annotation1 描述器1
    * @param annotation2 描述器2
    */
   public static prioritySorter(annotation1: PersistentAnnotation, annotation2: PersistentAnnotation): number {
      return annotation1.priority - annotation2.priority;
   }
}
