import { Annotation } from "../decorator/Annotation";
import { AnnotationEnum } from "../decorator/AnnotationEnum";



export class PersistentClassAnnotation extends Annotation {
   /** 数据名称 */
   public dataName: string;
   /** 序列化标志 */
   public optionSerialize: boolean;

   /**
    * 构造处理。
    * 
    * @param dataName 数据名称
    */
   public constructor(dataName?: string, serialize?: boolean) {
      super(dataName as any);
      // 设置属性
      this._annotationCd = AnnotationEnum.PersistentClass;
      // 设置数据名称
      this.dataName = dataName as any;
      this.optionSerialize = serialize as any;
   }

   /**
    * 获得代码。
    *
    * @return 代码
    */
   public get code(): string {
      return this.dataName;
   }
}
