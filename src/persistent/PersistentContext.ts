import { Types } from "../langauage/Types";



export class PersistentContext {
   /** 配置唯一 */
   public optionGuid: boolean;
   /** 过滤字段集合 */
   public filterFields: Types<string>;
   /** 实例集合 */
   public instances: any;
   /** 保存集合 */
   public storage: any;

   /**
    * 构造处理。
    *
    * @param name 名称
    * @param dataConverter 数据转换器
    */
   public constructor() {
      // 设置属性
      this.optionGuid = false
      this.filterFields = new Types<string>();
      this.instances = new Object();
      this.storage = new Object();
   }

   /**
    * 判断是否为过滤字段x。
    *
    * @param field 字段
    * @return 是否需要过滤
    */
   public isFilterField(field: string): boolean {
      return this.filterFields.contains(field);
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
    * 根据编号获得是否保存。
    *
    * @param key 编号
    * @return 是否保存
    */
   public hasStore(key: string): boolean {
      return this.storage[key];
   }

   /**
    * 根据编号设置保存内容。
    *
    * @param key 编号
    */
   public store(key: string) {
      this.storage[key] = true;
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
      // 清空字段
      this.filterFields.clear();
   }
}
