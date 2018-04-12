import { Annotation } from './Annotation';
import { Class, ClassMap } from './Class';
import { RuntimeUtil } from '../util/RuntimeUtil';


export class ClassUtil {
   // 类对象集合
   public static _classes = new Object() as ClassMap;

   /**
    * 判断某个类型是否为基础数据类型。
    *
    * @param typeName 类名称
    * @return 是否基础数据类型。
    */
   public static isBaseTypeName(typeName: string): boolean {
      if (typeName != null) {
         if (typeName == 'boolean') {
            return true;
         } else if (typeName == 'number') {
            return true;
         } else if (typeName == 'date') {
            return true;
         } else if (typeName == 'string') {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断某个类型是否为基础数据类型。
    *
    * @param clazz 类型
    * @return 是否基础数据类型
    */
   public static isBaseType(clazz: Function): boolean {
      if (clazz != null) {
         if (clazz == Boolean) {
            return true;
         } else if (clazz == Number) {
            return true;
         } else if (clazz == Date) {
            return true;
         } else if (clazz == String) {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断某个名称是否为基础类型。
    *
    * @param typeName 名称
    * @return 是否基础类型
    */
   public static isBaseClassName(typeName: string): boolean {
      if (typeName != null) {
         if (typeName == 'boolean') {
            return true;
         } else if (typeName == 'number') {
            return true;
         } else if (typeName == 'date') {
            return true;
         } else if (typeName == 'string') {
            return true;
         } else if (typeName == 'function') {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断某个对象是否为基础类型。
    *
    * @param value 对象
    * @return 是否基础类型
    */
   public static isBaseClass(clazz: Function): boolean {
      if (clazz != null) {
         if (clazz == Boolean) {
            return true;
         } else if (clazz == Number) {
            return true;
         } else if (clazz == Date) {
            return true;
         } else if (clazz == String) {
            return true;
         } else if (clazz == Function) {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断某个对象是否为对象。
    *
    * @param value 对象
    * @return 是否对象
    */
   public static isObject(value: any): boolean {
      return typeof value == 'object';
   }

   /**
    * 判断某个对象是否为函数。
    *
    * @param value 对象
    * @return 是否函数
    */
   public static isFunction(value: any): boolean {
      return typeof value == 'function';
   }

   /**
    * 判断某个实例的类名是指定名称。
    *
    * @param instance 实例对象
    * @param name 类名称
    * @return 是否是指定名称
    */
   public static isName(instance: any, name: any) {
      var shortName = this.shortName(instance);
      return (shortName == name);
   }

   /**
    * 获得对象实例的类短名称。
    *
    * @param instance 对象实例
    * @return 类短名称
    */
   public static shortName(instance: any): string {
      return RuntimeUtil.className(instance, false);
   }

   /**
    * 获得对象实例的类全名称。
    *
    * @param instance 对象实例
    * @return 类全名称
    */
   public static fullName(instance: any): string {
      return RuntimeUtil.className(instance, true);
   }

   /**
    * 安全获得对象实例的类型名称，不产生任何例外。
    *
    * @param value 对象实例
    * @param safe 安全名称
    * @return 类型名称字符串
    */
   public static typeOf(instance: any, safe: any = null) {
      return RuntimeUtil.typeOf(instance, safe);
   }

   /**
    * 根据类名查找一个类对象。
    * 如果类不存在，则返回空。
    *
    * @param className 类名称
    * @return 类对象
    */
   public static findByName(className: string): Class {
      var clazz = this._classes[className];
      return clazz;
   }

   /**
    * 根据类名查找一个类对象。
    * 如果类不存在，则返回空。
    *
    * @param clazz 类函数
    * @return 类对象
    */
   public static find(typeClass: Function): Class {
      var className = this.shortName(typeClass);
      var clazz = this._classes[className];
      return clazz;
   }

   /**
    * 根据类名获得一个类对象。
    * 如果类不存在，则新建一个实例。
    *
    * @param type 类型
    * @return 类对象
    */
   public static get(type: Function): Class {
      var typePrototype = type.prototype;
      // 从原型上获得当前类对象
      var clazz = typePrototype.__clazz as Class;
      if (clazz) {
         if (clazz.type === type) {
            return clazz;
         }
      }
      // 设置父类对象
      var parentClass = null;
      // 获得typePrototype的原型
      var parentPrototype = Object.getPrototypeOf(typePrototype);
      if (parentPrototype) {
         var superType = parentPrototype.constructor;
         if (superType != Object) {
            // 递归将父的描述属性给子
            parentClass = this.get(superType);
         }
      }
      clazz = typePrototype.__clazz = new Class();
      clazz.build(type, parentClass as any);
      return clazz;
   }

   /**
    * 根据类名获得一个类对象。
    * 如果类不存在，则新建一个实例。
    *
    * @param type 类型
    * @return 类对象
    */
   public static getInstance(type: Function): any {
      var clazz = this.get(type);
      var instance = clazz.instance;
      if (!instance) {
         instance = clazz.buildInstance();
      }
      return instance;
   }

   /**
    * 根据类名获得一个类对象。
    * 如果类不存在，则新建一个实例。
    *
    * @param clazz 类函数
    * @return 类对象
    */
   public static setInstance(typeClass: Function, value: any): void {
      if (value != null) {
         var clazz = this.get(typeClass);
         var instance = clazz.instance;
         if (instance) {
            if (instance.set) {
               instance.set(value);
            }
         }
      }
   }

   /**
    * 注册一个实例类到类对象中。
    *
    * @param typeClass 类型
    * @param instanceClass 实例类型
    */
   public static registerClass(typeClass: Function, instanceClass: Function): void {
      var clazz = this.get(typeClass);
      clazz.build(instanceClass, null as any);
   }

   /**
    * 注册一个实例到类对象中。
    *
    * @param typeClass 类型
    * @param instance 实例
    */
   public static registerInstance(typeClass: Function, instance: any): void {
      var clazz = this.get(typeClass);
      clazz.instance = instance;
   }

   /**
    * 注册一个实例到类对象中。
    *
    * @param typeClass 类型
    * @param instance 实例
    */
   public static registerAnnotation(typeClass: Function, annotation: Annotation): void {
      var clazz = this.get(typeClass);
      clazz.register(annotation);
   }

   /**
    * 根据一个类函数创建类的实例。
    *
    * @param clazz  函数对象
    * @return 类对象的实例
    */
   public static create(typeClass: Function): any {
      var clazz = this.get(typeClass) as Class;
      var instance = clazz.newInstance();
      return instance;
   }

   /**
    * 继承多个类对象。
    *
    * @param typeClass 类型
    * @param instance 实例
    */
   public static extends(instance: any, ...types: Array<Function>): void {
      var count = types.length;
      for (var i = 0; i < count; i++) {
         var type = types[i];
         var clazz = this.get(type);
         for (var name in clazz.instance) {
            var value = clazz.instance[name];
            instance[name] = value;
         }
      }
   }

   /**
    * 判断某个实例的类对象是指定类或接口。
    *
    * @param instance 实例对象
    * @param clazz 类函数
    * @return 是否类实例
    */
   public static isInherits(instance: any, clazz: Function): boolean {
      var instanceClass = ClassUtil.get(instance.constructor);
      var result = instanceClass.isInherits(clazz);
      return result;
   }

   /**
    * 判断某个实例的类对象是指定类对象。
    *
    * @param instance 实例对象
    * @param clazz 类函数
    * @return 是否类实例
    */
   public static isInheritsClass(instance: any, clazz: Function): boolean {
      var instanceClass = ClassUtil.get(instance.constructor);
      var result = instanceClass.isInheritsClass(clazz);
      return result;
   }

   /**
    * 判断某个实例的类对象是指定接口。
    *
    * @param instance 实例对象
    * @param clazz 类函数
    * @return 是否类实例
    */
   public static isInheritsInterface(instance: any, clazz: Function): boolean {
      var instanceClass = ClassUtil.get(instance.constructor);
      var result = instanceClass.isInheritsInterface(clazz);
      return result;
   }

   /**
    * 获得一个实例的调试信息。
    * 调试信息的格式：类型名称<辅助信息>@唯一代码:内容。
    *
    * @param instance 数据内容
    * @return 调试信息
    */
   public static dump(instance: any): string {
      return RuntimeUtil.dump(instance);
   }
}
