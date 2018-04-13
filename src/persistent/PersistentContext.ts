import { Types } from "../langauage/Types";



export class PersistentContext {
   /** 实例集合 */
   public instances: any;

   /**
    * 构造处理。
    *
    * @param name 名称
    * @param dataConverter 数据转换器
    */
   public constructor() {
      // 设置属性

      this.instances = new Object();
   }


   /**
    * 根据主键判断是否存在。
    *
    * @param key 主键
    * @return 是否存在
    */
   public constains(key: string): boolean {
      var instance = this.instances[key];
      return instance != null;
   }

   /**
    * 根据主键查找实例。
    *
    * @param key 主键
    * @return 实例
    */
   public find(key: string): any {
      if (key) {
         var instance = this.instances[key];
         return instance;
      }
   }

   /**
    * 根据主键获得实例。
    *
    * @param key 主键
    * @return 实例
    */
   public get(key: string): any {
      var instance = this.instances[key];
      return instance;
   }

   /**
    * 根据主键设置实例。
    *
    * @param key 主键
    * @param instance 实例
    */
   public set(key: string, instance: any) {
      var oldInstance = this.instances[key];
      if (oldInstance) {
         // AssertUtil.debugTrue(oldInstance === instance);
      } else {
         this.instances[key] = instance;
      }
   }


   /**
    * 释放处理。
    */
   public free() {
      // 设置实例
      var instances = this.instances;
      for (var key in instances) {
         delete instances[key];
      }
   }
}
