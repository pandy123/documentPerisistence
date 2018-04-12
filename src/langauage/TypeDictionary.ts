import { StringBuffer } from './StringBuffer';
import { Collection } from './Collection';


export class TypeDictionary<T> extends Collection<T> {
   /** 内容 */
   public value: any;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.value = new Object();
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      for (var name in this.value) {
         return false;
      }
      return true;
   }

   /**
    * 获得总数。
    *
    * @return 总数
    */
   public get count(): number {
      var count = 0;
      for (var name in this.value) {
         count++;
      }
      return count;
   }

   /**
    * 判断是否含有指定名称的内容。
    *
    * @param name 名称
    * @return 是否含有
    */
   public contains(name: any): boolean {
      return this.value[name] != null;
   }

   /**
    * 判断数组是否含有指定的内容。
    *
    * @param value 内容
    * @return 是否含有
    */
   public containsValue(value: T): boolean {
      for (var name in this.value) {
         if (this.value[name] == value) {
            return true;
         }
      }
      return false;
   }

   /**
    * 根据名称获得指定内容。
    *
    * @param name 名称
    * @return 内容
    */
   public get(name: any): T {
      return this.value[name];
   }

   /**
    * 根据名称设置指定内容。
    *
    * @param name 名称
    * @param value 内容
    * @return 内容
    */
   public set(name: any, value: T) {
      this.value[name] = value;
   }

   /**
    * 接收集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public assign(values: TypeDictionary<T>) {
      this.clear();
      this.append(values);
   }

   /**
    * 接收对象全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public assignObject(values: any) {
      this.clear();
      this.appendObject(values);
   }

   /**
    * 追加集合全部内容。
    *
    * @param values 集合
    */
   public append(values: TypeDictionary<T>) {
      var target = this.value;
      var source = values.value;
      for (var name in source) {
         target[name] = source[name];
      }
   }

   /**
    * 追加对象全部内容。
    *
    * @param values 集合
    */
   public appendObject(values: any) {
      var target = this.value;
      for (var name in values) {
         target[name] = values[name];
      }
   }

   /**
    * 移除指定对象的存储对象。
    *
    * @param value 指定对象
    */
   public remove(value: T) {
      var target = this.value;
      for (var name in target) {
         var find = target[name];
         if (find === value) {
            delete target[name];
         }
      }
   }

   /**
    * 移除指定对象的存储对象。
    *
    * @param value 指定对象
    */
   public removeByName(name: any) {
      delete this.value[name];
   }

   /**
    * 清除所有内容。
    */
   public clear(): TypeDictionary<T> {
      var value = this.value;
      for (var name in value) {
         delete value[name];
      }
      return this;
   }
}


export class NumberDictionary extends TypeDictionary<number>{
   /**
    * 增加数据内容。
    */
   public addValue(name: string, value: number) {
      var oldValue = this.get(name);
      if (oldValue == null) {
         oldValue = 0;
      }
      this.set(name, oldValue + value);
   }
}
