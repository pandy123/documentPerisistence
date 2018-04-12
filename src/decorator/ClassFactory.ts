import { ClassUtil } from './ClassUtil';
import { Dictionary } from '../langauage/Dictionary';


export class ClassFactory {
   /** 类字典 */
   protected _classes: Dictionary<any>;

   /**
    * 构造处理。
    */
   public constructor() {
      this._classes = new Dictionary<any>();
   }

   /**
    * 判断指定名称是否注册过。
    *
    * @param name 名称
    * @return 是否注册
    */
   public hasRegister(name: string): boolean {
      var clazz = this._classes.get(name);
      return clazz != null;
   }

   /**
    * 注册类对象。
    *
    * @param name 名称
    * @param class 类名称
    */
   public register(name: string, clazz: Function) {
      this._classes.set(name, clazz);
   }

   /**
    * 查找当前实例对应的类型。
    *
    * @param instance 实例
    * @return 类型
    */
   public find(instance: any): any {
      var classes = this._classes;
      var count = classes.count;
      for (var i = 0; i < count; i++) {
         var value = classes.valueAt(i);
         if (instance.constructor === value) {
            return value;
         }
      }
   }

   /**
    * 根据类型查找名称。
    *
    * @param type 类型
    * @return 名称
    */
   public findName(type: Function): any {
      var classes = this._classes;
      var count = classes.count;
      for (var i = 0; i < count; i++) {
         var value = classes.valueAt(i);
         if (type === value) {
            return classes.nameAt(i);
         }
      }
   }

   /**
    * 根据类型查找名称。
    *
    * @param type 类型
    * @return 名称
    */
   public findClassByName(name: string): Function {
      var classes = this._classes;
      var count = classes.count;
      for (var i = 0; i < count; i++) {
         var classNname = classes.nameAt(i);
         if (classNname === name) {
            return classes.valueAt(i);
         }
      }
      return null as any;
   }

   /**
    * 注销类对象。
    *
    * @param name 名称
    */
   public unregister(name: string) {
      this._classes.set(name, null);
   }

   /**
    * 创建指定名称的类对象实例。
    *
    * @param name 名称
    * @return 实例
    */
   public create(name: string): any {
      var clazz = this._classes.get(name);
      if (!clazz) {
         return null;
      }
      return ClassUtil.create(clazz);
   }
}
