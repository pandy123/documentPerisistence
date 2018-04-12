import { Annotation } from './Annotation';
import { AnnotationEnum } from './AnnotationEnum';
import { ClassUtil } from './ClassUtil';
import { Types } from '../langauage/Types';
import { Dictionary } from '../langauage/Dictionary';

export class Class {
   /** 父类对象 */
   public parentClass: Class;
   /** 短名称 */
   public shortName: string;
   /** 全名称 */
   public fullName: string;
   /** 关联函数 */
   public type: any;
   /** 接口集合 */
   public interfaces: Array<Function>;
   /** 实例 */ // 单例的情况下，用
   public instance: any;
   /** 类描述器集合 */
   protected _classAnnotations: Types<Annotation>;
   /** 字段描述器集合 */
   protected _fieldAnnotations: Dictionary<Dictionary<Annotation>>;


   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this._classAnnotations = new Types<Annotation>();
      this._fieldAnnotations = new Dictionary<Dictionary<Annotation>>();
      this.interfaces = new Array<Function>();
   }

   /**
    * 判断当前类是否继承于类或接口。
    *
    * @param clazz 类对象
    * @return 是否继承
    */
   public isInherits(clazz: Function): boolean {
      if (this.type === clazz) {
         return true;
      }
      var find = this.interfaces.indexOf(clazz);
      if (find != -1) {
         return true;
      }
      return false;
   }

   /**
    * 判断当前类是否继承于类。
    *
    * @param clazz 类对象
    * @return 是否继承
    */
   public isInheritsClass(clazz: Function): boolean {
      if (this.type === clazz) {
         return true;
      }
      return false;
   }

   /**
    * 判断当前类是否继承于接口。
    *
    * @param clazz 类对象
    * @return 是否继承
    */
   public isInheritsInterface(clazz: Function): boolean {
      var find = this.interfaces.indexOf(clazz);
      if (find != -1) {
         return true;
      }
      return false;
   }

   /**
    * 向当前类对象注册一个类描述对象。
    *
    * @param annotation 描述对象
    */
   public registerClass(annotation: Annotation): void {
      annotation.clazz = this;
      this._classAnnotations.push(annotation);
   }

   /**
    * 向当前类对象注册一个描述对象。
    *
    * @param annotation 描述对象
    */
   public register(annotation: Annotation): void {
      // 设置属性
      annotation.clazz = this;
      // 检查类型和名称的合法性
      var annotationCd = annotation.annotationCd;
      var ordered = annotation.isOrdered();
      var name = annotation.name;
      var code = annotation.code;
      // 获得一个描述器的类型容器
      var annotations = this._fieldAnnotations.get(annotationCd);
      if (!annotations) {
         annotations = new Dictionary<Annotation>();
         this._fieldAnnotations.set(annotationCd, annotations);
      }
      annotations.set(code, annotation);
      // 设置属性
   }

   /**
    * 查找一个描述类型的描述对象集合。
    *
    * @param annotationCd 描述类型
    * @return 描述对象集合
    */
   public findAnnotations(annotationCd: AnnotationEnum): Dictionary<Annotation> {
      var annotations = this._fieldAnnotations.get(annotationCd as any);
      return annotations;
   }

   /**
    * 获得一个描述类型的描述对象集合。
    *
    * @param annotationCd 描述类型
    * @return 描述对象集合
    */
   public getAnnotations(annotationCd: AnnotationEnum): Dictionary<Annotation> {
      var annotations = this.findAnnotations(annotationCd);
      if (!annotations) {
         // LoggerUtil.fatal(this, null, "Can't find annotations. (class={1}, annotation_cd={2})", this.shortName, annotationCd);
      }
      return annotations;
   }

   /**
    * 查找一个描述类型下的一个描述对象。
    *
    * @param annotationCd 描述类型
    * @param code 代码
    * @return 描述对象
    */
   public findAnnotation(annotationCd: AnnotationEnum, code?: string): Annotation {
      var annotation = null;
      var annotations = this._fieldAnnotations.get(annotationCd as any);
      if (annotations) {
         if (code) {
            annotation = annotations.get(code);
         } else {
            annotation = annotations.first;
         }
      }
      return annotation;
   }

   /**
    * 获得一个描述类型下的一个描述对象。
    * 如果代码为空，则查找第一个描述器。
    *
    * @param annotationCd 描述类型
    * @param code 代码
    * @return 描述对象
    */
   public getAnnotation(annotationCd: AnnotationEnum, code?: string): Annotation {
      var annotation = this.findAnnotation(annotationCd, code);
      if (!annotation) {
         //LoggerUtil.fatal(this, null, "Can't find annotation. (class={1}, annotation_cd={2}, code={3},)", this.shortName, annotationCd, code);
      }
      return annotation;
   }

   /**
    * 获得当前类下的描述器。
    *
    * @param annotationCd 描述类型
    * @param code 代码
    * @return 描述对象
    */
   public findClassAnnotation(annotationCd: AnnotationEnum, code: string): Annotation {
      var annotation = this.findAnnotation(annotationCd, code);
      if (annotation) {
         if (annotation.clazz == this) {
            return annotation;
         }
      }
   }

   /**
    * 当前类接收其他类所有的描述信息。
    *
    * @param clazz 类对象
    */
   public buildParent(clazz: Class) {
      // 复制描述器
      var parentAnnotationss = clazz._fieldAnnotations;
      var annotationsCount = parentAnnotationss.count;
      for (var j = 0; j < annotationsCount; j++) {
         var annotationsName = parentAnnotationss.name(j);
         var parentAnnotations = parentAnnotationss.at(j);
         var childAnnotations = this._fieldAnnotations.get(annotationsName);

         // 父亲中有的描述器类型，子中如果没有，则创建一个。
         if (!childAnnotations) {
            childAnnotations = new Dictionary<Annotation>();
            this._fieldAnnotations.set(annotationsName, childAnnotations)
         }

         // 复制指定对象内的类型到自己对象内
         var annotationCount = parentAnnotations.count;
         for (var i = 0; i < annotationCount; i++) {
            var annotationName = parentAnnotations.name(i);
            var annotation = parentAnnotations.at(i);
            if (!childAnnotations.contains(annotationName)) {  // 如果子中重新定义了父亲的字段，则，用子的描述器
               childAnnotations.set(annotationName, annotation);
            }
         }
      }
      //..........................................................
   }

   /**
    * 构建一个对象。
    *
    * @param clazz 类对象
    */
   public build(type: Function, parentClass: Class): void {
      // 设置属性
      this.parentClass = parentClass;
      // this.shortName = ClassUtil.shortName(type);
      this.type = type;
      // 继承关系
      if (parentClass) {
         this.buildParent(parentClass);
      }
   }

   /**
    * 获得当前类的唯一实例。
    *
    * @return 实例
    */
   public buildInstance(): any {
      var instance = this.instance;
      if (!instance) {
         // 创建实例
         var clazz = this.type;
         var classInstance = clazz.instance;
         if (classInstance instanceof Function) {
            instance = this.instance = classInstance();
         } else if (classInstance instanceof clazz) {
            instance = this.instance = classInstance;
         } else {
            instance = this.instance = new clazz();
            if (instance.initialize) {
               instance.initialize();
            }
         }
         instance.__class = this;
      }
      return instance;
   }

   /**
    * 创建当前类对象的一个实例。
    *
    * @return 对象实例
    */
   public newInstance(): any {
      var instance = new this.type();
      instance.__class = this;
      return instance;
   }

}


export type ClassMap = {
   [name: string]: Class
}