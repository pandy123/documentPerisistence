
import { Collection } from './Collection';


export class Types<T> extends Collection<T> {
   /** 集合 */
   public memory: Array<T>;

   /**
    * 构建当前对象的实例。
    */
   public constructor() {
      super();
      // 设置属性
      this.memory = new Array<T>();
   }

   /**
    * 获得总数。
    *
    * @return 总数
    */
   public get count(): number {
      return this.memory.length;
   }

   /**
    * 设置总数。
    *
    * @param count 总数
    */
   public set count(count: number) {
      this.memory.length = count;
   }

   /**
    * 获得第一个对象。
    *
    * @return 第一个对象
    */
   public get first(): T {
      var memory = this.memory;
      return (memory.length > 0) ? memory[0] : null as any;
   }

   /**
    * 获得最后一个对象。
    *
    * @return 最后一个对象
    */
   public get last(): T {
      var memory = this.memory;
      return (memory.length > 0) ? memory[memory.length - 1] : null as any;
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return (this.memory.length == 0);
   }

   /**
    * 判断是否含有指定的对象。
    *
    * @param value 对象
    * @return 是否含有
    */
   public contains(value: T): boolean {
      return this.memory.indexOf(value) != -1;
   }

   /**
    * 查找指定对象在集合中的索引位置，不存在则返回-1。
    *
    * @param value 对象
    * @return 索引位置
    */
   public indexOf(value: T): number {
      return this.memory.indexOf(value);
   }

   /**
    * 搜索属性内容相等的对象。
    *
    * @param name 名称
    * @param value 内容
    * @return 对象
    */
   public search(name: string, value: any): T {
      var memory = this.memory;
      var count = memory.length;
      for (var i = 0; i < count; i++) {
         var item = memory[i] as any;
         if (item[name] == value) {
            return item;
         }
      }
      return null as any;
   }

   /**
    * 查找指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public find(index: number): T {
      return this.memory[index];
   }

   /**
    * 取得指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public get(index: number): T {
      return this.memory[index];
   }

   /**
    * 取得指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public getNvl(index: number): T {
      return this.memory[index];
   }

   /**
    * 取得指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public getAt(index: number): T {
      return this.memory[index];
   }

   /**
    * 获得范围内对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public getInRange(index: number): T {
      var result = null;
      var memory = this.memory;
      var count = memory.length;
      if (count > 0) {
         var index = index % count;
         if (index < 0) {
            index += count;
         }
         result = memory[index];
      }
      return result as any;
   }

   /**
    * 取得从尾部指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public getFromLast(index: number = 0): T {
      var position = this.memory.length - 1 - index;
      return this.memory[position];
   }

   /**
    * 把对象存储在指定的索引处。
    *
    * @param index 索引位置
    * @param value 对象
    */
   public set(index: number, value: T) {
      this.memory[index] = value;
   }

   /**
    * 把对象存储在指定的索引处。
    *
    * @param index 索引位置
    * @param value 对象
    */
   public setAt(index: number, value: T) {
      this.memory[index] = value;
   }

   /**
    * 接收集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public assign(values: Types<T>) {
      var memory = this.memory;
      var count = memory.length = values.count;
      for (var i = 0; i < count; i++) {
         memory[i] = values.get(i);
      }
   }

   /**
    * 接收集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public assignArray(values: Array<T>) {
      var memory = this.memory;
      var count = memory.length = values.length;
      for (var i = 0; i < count; i++) {
         memory[i] = values[i];
      }
   }

   /**
    * 接收一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public assignUnique(values: Types<T>) {
      this.clear();
      this.appendUnique(values);
   }

   /**
    * 接收一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public assignUniqueArray(values: Array<T>) {
      this.clear();
      this.appendArrayUnique(values);
   }

   /**
    * 追加集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public append(values: Types<T>) {
      var count = values.count;
      for (var i = 0; i < count; i++) {
         var value = values.get(i)
         this.push(value);
      }
   }

   /**
    * 追加集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public appendArray(values: Array<T>) {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         this.push(value);
      }
   }

   /**
    * 追加一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public appendUnique(values: Types<T>): Types<T> {
      var count = values.count;
      for (var i = 0; i < count; i++) {
         var value = values.get(i);
         this.pushUnique(value);
      }
      return this;
   }

   /**
    * 追加一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public appendArrayUnique(values: Array<T>): Types<T> {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         this.pushUnique(value);
      }
      return this;
   }

   /**
    * 把对象插入在指定的索引处。
    *
    * @param index 索引位置
    * @param value 对象
    */
   public insert(index: number, value: T) {
      var memory = this.memory;
      var count = memory.length;
      if ((index >= 0) && (index <= count)) {
         memory.length = count + 1;
         for (var i = count; i > index; i--) {
            memory[i] = memory[i - 1];
         }
         memory[index] = value;
      }
   }

   /**
    * 弹出首对象。
    *
    * @return 对象
    */
   public shift(): T {
      return this.erase(0);
   }

   /**
    * 压入首对象。
    *
    * @param value 对象
    */
   public unshift(value: T) {
      return this.insert(0, value);
   }

   /**
    * 把对象追加到集合的最后位置。
    *
    * @param value 对象
    * @return 索引值
    */
   public push(value: T) {
      this.memory.push(value);
   }

   /**
    * 把唯一对象追加到集合的最后位置。
    *
    * @param value 对象
    * @return 索引值
    */
   public pushUnique(value: T) {
      var index = this.indexOf(value);
      if (index == -1) {
         this.push(value);
      }
   }

   /**
    * 将最后一个对象弹出集合。
    *
    * @return 对象
    */
   public pop(): T {
      var value = null;
      var memory = this.memory;
      if (memory.length > 0) {
         value = memory[memory.length - 1];
         memory.length--;
      }
      return value as any;
   }

   /**
    * 写入数据。
    *
    * @return 类型数组
    */
   public write(p1?: T, p2?: T, p3?: T, p4?: T, p5?: T, p6?: T, p7?: T, p8?: T): Types<T> {
      var memory = this.memory;
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         memory[memory.length++] = arguments[i];
      }
      return this;
   }

   /**
    * 在集合中交换两个索引对应的对象。
    *
    * @param left 第一个对象的索引值
    * @param right 第二个对象的索引值
    */
   public swap(left: number, right: number) {
      var memory = this.memory;
      var count = memory.length;
      if ((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)) {
         var value = memory[left];
         memory[left] = memory[right];
         memory[right] = value;
      }
   }

   /**
    * 对集合内容进行排序。
    *
    * @param callback 排序函数
    */
   public sort(callback: any) {
      this.memory.sort(callback);
   }

   /**
    * 调用函数处理。
    *
    * @param callback 函数
    * @param owner 拥有者
    */
   public forEach(callback: any, owner?: any) {
      this.memory.forEach(callback, owner);
   }

   /**
    * 调用函数处理。
    *
    * @param methodName 函数名称
    * @param parameter1 参数1
    * @param parameter2 参数2
    * @param parameter3 参数3
    * @param parameter4 参数4
    * @param parameter5 参数5
    */
   public invoke(methodName: string, parameter1: any, parameter2: any, parameter3: any, parameter4: any, parameter5: any) {
      var memory = this.memory;
      var count = memory.length;
      for (var i = 0; i < count; i++) {
         var item = memory[i] as any;
         var method = item[methodName];
         method.call(item, parameter1, parameter2, parameter3, parameter4, parameter5);
      }
   }

   /**
    * 移除指定索引的存储对象。
    * 
    * @param index 索引位置
    * @return 被删除的对象
    */
   public erase(index: number): T {
      var value = null;
      var memory = this.memory;
      var count = memory.length;
      if ((index >= 0) && (index < count)) {
         value = memory[index];
         var loop = count - 1;
         for (var i = index; i < loop; i++) {
            memory[i] = memory[i + 1];
         }
         memory.length = loop;
      }
      return value as any;
   }

   /**
    * 移除所有指定对象。
    *
    * @param value 指定对象
    */
   public remove(value: T) {
      var memory = this.memory;
      var count = memory.length;
      if (count > 0) {
         var index = 0;
         // 移除对象
         for (var i = index; i < count; i++) {
            if (memory[i] != value) {
               memory[index++] = memory[i];
            }
         }
         // 清除尾部
         for (var i = index; i < count; i++) {
            memory[i] = null as any;
         }
         // 设置大小
         memory.length = index;
      }
   }

   /**
    * 将数组内项目为空的位置全部删除。
    */
   public compress() {
      var index = 0;
      var memory = this.memory;
      var count = memory.length;
      for (var i = 0; i < count; i++) {
         var value = memory[i];
         if (value != null) {
            memory[index++] = value;
         }
      }
      memory.length = index;
   }

   /**
    * 获得排除内容的数组。
    *
    * @param value 内容
    * @return 数组
    */
   public toExtract(value: T): Types<T> {
      var result = new Types<T>();
      var memory = this.memory;
      var count = memory.length;
      for (var i = 0; i < count; i++) {
         var find = memory[i];
         if (find != value) {
            result.push(find);
         }
      }
      return result;
   }

   /**
    * 获得数组。
    *
    * @param target 目标
    * @return 数组
    */
   public toArray(target?: Array<T>): Array<T> {
      var result = target || new Array<T>();
      var memory = this.memory;
      var count = memory.length;
      for (var i = 0; i < count; i++) {
         var value = memory[i];
         result.push(value);
      }
      return result;
   }

   /**
    * 清除所有内容。
    */
   public clear(): Types<T> {
      this.memory.length = 0;
      return this;
   }

   /**
    * 克隆内容。
    */
   public clone(): Types<T> {
      var result = new Types<T>();
      result.append(this);
      return result;
   }

   /**
    * 释放处理。
    */
   public free() {
      this.memory.length = 0;
   }

   /**
    * 清除数组的所有内容。
    */
   public release() {
      var memory = this.memory;
      var count = memory.length;
      for (var i = count - 1; i >= 0; i--) {
         delete memory[i];
      }
      this.memory.length = 0;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.memory.length = 0;
      this.memory = null as any;
   }

}

/**
 * 数组类型。
 */
export type ArrayType<T> = Array<T> | Types<T>;
