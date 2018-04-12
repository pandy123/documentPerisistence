
import { DataNode } from './DataNode';


export class NodeObjectCollection<V extends DataNode>{
   /** 内容集合 */
   protected _values: Array<V>;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this._values = new Array<V>();
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return this._values.length == 0;
   }

   /**
    * 获得总数。
    *
    * @return 总数
    */
   public get count(): number {
      return this._values.length;
   }

   /**
    * 查找第一个内容。
    *
    * @return 内容
    */
   public get first(): DataNode {
      var values = this._values;
      if (values.length > 0) {
         return values[0];
      }
      return null as any;
   }

   /**
    * 查找最后一个内容。
    *
    * @return 内容
    */
   public get last(): DataNode {
      var values = this._values;
      if (values.length > 0) {
         return values[values.length - 1];
      }
      return null as any;
   }

   /**
    * 根据唯一编号查找节点。
    *
    * @param value 内容
    * @return 节点
    */
   public contains(value: V): boolean {
      if (value != null) {
         return this._values.indexOf(value) != -1;
      }
      return false;
   }

   /**
    * 判断是否含有指定的名称。
    *
    * @param id 编号
    * @return 是否含有
    */
   public containsById(id: number): boolean {
      var result = this.findById(id);
      return result != null;
   }

   /**
    * 根据唯一编号查找节点。
    *
    * @param guid 唯一编号
    * @return 节点
    */
   public findById(id: number): V {
      if (id > 0) {
         var values = this._values;
         if (values) {
            var count = values.length;
            for (var i = 0; i < count; i++) {
               var child = values[i];
               if (child.id == id) {
                  return child;
               }
            }
         }
      }
      return null as any;
   }

   /**
   * 根据索引位置获得内容。
   *
   * @param index 索引位置
   * @return 内容
   */
   public get(index: number): V {
      return this._values[index];
   }

   /**
    * 将当前表内容全部置为另一个节点集合。
    *
    * @param nodes 节点集合
    */
   public assign(nodes: NodeObjectCollection<V>): void {
      this.clear();
      this.append(nodes);
   }

   /**
    * 在当前表中追加另一个节点集合。
    *
    * @param nodes 节点集合
    */
   public append(nodes: NodeObjectCollection<V>): void {
      if (nodes) {
         var count = nodes.count;
         for (var i = 0; i < count; i++) {
            var node = nodes.get(i);
            this.push(node);
         }
      }
   }

   /**
    * 根据名称设置内容。
    *
    * @param value 默认内容
    * @return 内容
    */
   public push(value: V) {
      this._values.push(value);
   }

   /**
    * 根据名称设置内容。
    *
    * @param value 默认内容
    * @return 内容
    */
   public remove(value: V) {
      var values = this._values;
      var count = values.length;
      if (count > 0) {
         var index = 0;
         // 移除对象
         for (var i = index; i < count; i++) {
            if (values[i] != value) {
               values[index++] = values[i];
            }
         }
         // 清除尾部
         for (var i = index; i < count; i++) {
            values[i] = null as any;
         }
         // 设置大小
         values.length = index;
      }
   }

   /**
    * 根据两个索引位置的内容。
    *
    * @param index1 索引位置1
    * @param index2 索引位置2    
    */
   public swap(index1: number, index2: number) {
      var temp = this._values[index1];
      this._values[index1] = this._values[index2];
      this._values[index2] = temp;
   }

   /**
    * 调用函数处理。
    *
    * @param owner 拥有者
    * @param callback 函数
    * @param parameters 参数集合
    */
   public invoke(owner: any, callback: Function, parameters?: any) {
      var values = this._values;
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         callback.call(owner, value, parameters);
      }
   }

   /**
    * 获得数组。
    *
    * @param target 目标
    * @return 数组
    */
   public toArray(target?: Array<V>): Array<V> {
      var result = target || new Array<V>();
      var values = this._values;
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         result.push(value);
      }
      return result;
   }


   /**
    * 清除所有内容。
    */
   public clear(): void {
      this._values.length = 0;
   }
}
