

export class Map<N, V>{
   /** 总数 */
   protected _count: number;
   /** 对照表 */
   protected _table: any;
   /** 名称集合 */
   protected _names: Array<N>;
   /** 内容集合 */
   protected _values: Array<V>;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this._count = 0;
      this._table = new Object();
      this._names = new Array<N>();
      this._values = new Array<V>();
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return this._count == 0;
   }

   /**
    * 获得总数。
    *
    * @return 总数
    */
   public get count(): number {
      return this._count;
   }

   /**
    * 判断是否含有指定的名称。
    *
    * @param name 名称
    * @return 是否含有
    */
   public contains(name: N): boolean {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()]
         if (index != null) {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断是否含有指定的内容。
    *
    * @param value 内容
    * @return 是否含有
    */
   public containsValue(value: V): boolean {
      var index = this.indexOfValue(value);
      return index != -1;
   }

   /**
    * 查找指定名称在表中的索引位置，不存在则返回-1。
    *
    * @param name 名称
    * @return 索引位置
    */
   public indexOf(name: N): number {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()];
         if (index != null) {
            return index;
         }
      }
      return -1;
   }

   /**
    * 查找指定对象在表中的第一次出现的索引位置，不存在则返回-1。
    *
    * @param value 内容
    * @return 索引位置
    */
   public indexOfValue(value: V): number {
      var count = this._count;
      if (count > 0) {
         var values = this._values;
         for (var i = 0; i < count; i++) {
            if (values[i] == value) {
               return i;
            }
         }
      }
      return -1;
   }

   /**
    * 查找第一个内容。
    *
    * @return 内容
    */
   public get first(): V {
      if (this._count > 0) {
         return this._values[0];
      }
      return null as any;
   }

   /**
    * 查找最后一个内容。
    *
    * @return 内容
    */
   public get last(): V {
      if (this._count > 0) {
         return this._values[this._count - 1];
      }
      return null as any;
   }

   /**
    * 根据索引位置获得名称。
    *
    * @param index 索引位置
    * @return 名称
    */
   public nameAt(index: number): N {
      return this._names[index];
   }

   /**
    * 根据索引位置获得名称。
    *
    * @param index 索引位置
    * @return 名称
    */
   public name(index: number): N {
      return ((index >= 0) && (index < this._count)) ? this._names[index] : null as any;
   }

   /**
    * 根据索引位置获得内容。
    *
    * @param index 索引位置
    * @return 内容
    */
   public at(index: number): V {
      return this._values[index];
   }

   /**
    * 根据索引位置获得内容。
    *
    * @param index 索引位置
    * @return 内容
    */
   public valueAt(index: number): V {
      return this._values[index];
   }

   /**
    * 根据索引位置获得内容。
    *
    * @param index 索引位置
    * @return 内容
    */
   public value(index: number): V {
      return ((index >= 0) && (index < this._count)) ? this._values[index] : null as any;
   }

   /**
    * 根据索引位置设置内容。
    *
    * @param index 索引位置
    * @return 内容
    */
   public setValueAt(index: number, value: V) {
      this._values[index] = value;
   }

   /**
    * 根据索引位置设置内容。
    *
    * @param index 索引位置
    * @return 内容
    */
   public setValue(index: number, value: V) {
      if ((index >= 0) && (index < this._count)) {
         this._values[index] = value;
      }
   }

   /**
    * 根据名称查找内容。
    * 如果内容不存在，返回默认内容。
    *
    * @param name 名称
    * @param defaultValue 默认内容
    * @return 内容
    */
   public get(name: any, defaultValue: V = null as any): V {
      if (name != null) {
         var index = this._table[name.toString().toLowerCase()];
         if (index != null) {
            return this._values[index];
         }
      }
      return defaultValue;
   }

   /**
    * 根据名称设置内容。
    *
    * @param name 名称
    * @param value 默认内容
    * @return 内容
    */
   public set(name: any, value: V) {
      var nameString = name.toString();
      var code = nameString.toLowerCase();
      var index = this._table[code];
      if ((index == null) || (index >= this._count)) {
         index = this._count++;
         this._names[index] = nameString;
         this._table[code] = index;
      }
      this._values[index] = value;
   }

   /**
    * 根据名称设置非空内容。
    *
    * @param name 名称
    * @param value 内容
    */
   public setNvl(name: N, value: V): void {
      if (value) {
         this.set(name, value);
      }
   }

   /**
    * 将当前表内容全部置为另一个表的全部内容。
    *
    * @param map 表
    */
   public assign(map: Map<N, V>): void {
      this.clear();
      this.append(map);
   }

   /**
    * 在当前表中追加另一个表的全部内容。
    *
    * @param map 表
    */
   public append(map: Map<N, V>): void {
      if (map) {
         var count = map.count;
         for (var i = 0; i < count; i++) {
            var name = map.name(i);
            var value = map.value(i);
            this.set(name, value);
         }
      }
   }

   /**
    * 在索引位置插入一个新的名称和内容。
    *
    * @param index 索引位置
    * @param name 名称
    * @param value 内容
    */
   public insert(index: number, name: N, value: V) {
      var count = this._count;
      if ((index >= 0) && (index <= count)) {
         var names = this._names;
         var values = this._values;
         for (var i = count; i > index; i--) {
            names[i] = names[i - 1];
            values[i] = values[i - 1];
         }
         names[index] = name;
         values[index] = value;
         this._count++;
         this.rebuild();
      }
   }

   /**
    * 删除索引位置的内容。
    *
    * @param index 索引位置
    * @return 删除的内容
    */
   public remove(index: number): V {
      var value = null;
      var count = this._count;
      if ((index >= 0) && (index < count)) {
         var names = this._names;
         var values = this._values;
         value = values[index];
         for (var i = index; i < count; i++) {
            names[i] = names[i + 1];
            values[i] = values[i + 1];
         }
         this._count--;
         this.rebuild();
      }
      return value as any;
   }

   /**
    * 删除指定名称的内容。
    *
    * @param name 名称
    * @return 删除的内容
    */
   public removeName(name: N): V {
      var index = this.indexOf(name);
      if (index != -1) {
         return this.remove(index);
      }
      return null as any;
   }

   /**
    * 删除指定的内容。
    *
    * @param value:Object 内容
    */
   public removeValue(value: V) {
      var index = 0;
      var count = this._count;
      var names = this._names;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var find = values[i];
         if (find != value) {
            if (index != i) {
               names[index] = names[i];
               values[index] = find;
            }
            index++;
         }
      }
      this._count = index;
      this.rebuild();
   }

   /**
    * 根据对象内名称数组和内容数组重新建立对照表。
    */
   protected rebuild() {
      // 清除对照表数据
      var table = this._table;
      for (var name in table) {
         delete table[name];
      }
      // 重建对照表数据
      var count = this._count;
      var names = this._names;
      for (var i = 0; i < count; i++) {
         var code = (names[i] as any).toLowerCase();
         table[code] = i;
      }
   }

   /**
    * 调用函数处理。
    *
    * @param owner 拥有者
    * @param callback 函数
    * @param parameters 参数集合
    */
   public invoke(owner: any, callback: Function, parameters?: any) {
      var count = this._count;
      var values = this._values;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         callback.call(owner, value, parameters);
      }
   }

   /**
    * 清除所有内容。
    */
   public clear(): void {
      this._count = 0;
      // 清除对照表数据
      var table = this._table;
      for (var name in table) {
         delete table[name];
      }
   }
}
