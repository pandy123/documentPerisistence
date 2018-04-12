import { Annotation } from './Annotation';
import { AnnotationEnum } from './AnnotationEnum';


export class DefineAnnotation extends Annotation {
   // 数据名称
   public dataName: string;
   // 数据名称
   public dataValue: any;

   /**
    * 构造处理。
    *
    * @param name 名称
    */
   public constructor(name?: string, dataName?: string, dataValue?: any) {
      super(name as any);
      // 设置属性
      this._annotationCd = AnnotationEnum.Define;
      this._inherit = true;
      // 设置数据名称
      this.dataName = dataName as any;
      this.dataValue = dataValue;
   }

   /**
    * 获得代码。
    *
    * @return String 代码
    */
   public get code(): string {
      return this.dataName;
   }
}
