import { AnnotationEnum } from './AnnotationEnum';
import { Class } from './Class';


export class Annotation {
   /** 类对象 */
   public clazz: Class;
   /** 描述器类型 */
   protected _annotationCd: AnnotationEnum;
   /** 名称 */
   protected _name: string;
   /** 内容 */
   protected _value: any;
   /** 可继承 */
   protected _inherit: boolean;
   /** 可重复 */
   protected _duplicate: boolean;
   /** 可有序 */
   protected _ordered: boolean;

   /**
    * 构造处理。
    *
    * @param name 名称
    */
   public constructor(name: string) {
      // 设置属性
      this._name = name;
   }

   /**
    * 获得描述类型。
    *
    * @return 描述类型
    */
   public get annotationCd(): AnnotationEnum {
      return this._annotationCd;
   }

   /**
    * 获得名称。
    *
    * @return 名称
    */
   public get name(): string {
      return this._name;
   }

   /**
    * 获得代码。
    *
    * @return 代码
    */
   public get code(): string {
      return this._name;
   }

   /**
    * 获得内容。
    *
    * @return 内容
    */
   public get value() {
      return this._value;
   }

   /**
    * 判断是否允许继承。
    *
    * @return 是否允许继承
    */
   public isInherit(): boolean {
      return this._inherit;
   }

   /**
    * 判断是否允许重复。
    *
    * @return 是否允许重复
    */
   public isDuplicate(): boolean {
      return this._duplicate;
   }

   /**
    * 判断是否允许有序。
    *
    * @return 是否允许有序
    */
   public isOrdered(): boolean {
      return this._ordered;
   }

   /**
    * 接收处理。
    *
    * @param annotation 描述器
    */
   public assign(annotation: Annotation) {
      this._name = annotation._name;
      this._value = annotation._value;
   }
}
