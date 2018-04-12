

export class StringBuffer {
   /** 个数 */
   protected _count: number;
   /** 内存 */
   protected _memory: Array<string>;

   /**
    * 构建当前对象的实例。
    */
   public constructor() {
      // 设置属性
      this._count = 0;
      // 内存 
      this._memory = new Array<string>();
   }

   /**
    * 判断字符串内容是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return this._count == 0;
   }

   /**
    * 接收字符串集合。
    *
    * @param parameters 参数集合
    * @return 字符串缓冲
    */
   public assign(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any, p7?: any, p8?: any): StringBuffer {
      this.clear();
      this.appendArray(arguments as any, 0, arguments.length);
      return this;
   }

   /**
    * 追加字符串集合。
    *
    * @param parameters 参数集合
    * @return 字符串缓冲
    */
   public append(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any, p7?: any, p8?: any): StringBuffer {
      this.appendArray(arguments as any, 0, arguments.length);
      return this;
   }

   /**
    * 追加字符串集合。
    *
    * @param values 字符串集合
    * @param offset 位置
    * @param count 总数
    * @return 字符串缓冲
    */
   public appendArray(values: Array<any>, offset: number, count: number): StringBuffer {
      var memory = this._memory;
      for (var i = 0; i < count; i++) {
         var value = values[offset++];
         if (value != null) {
            memory[this._count++] = value;
         }
      }
      return this;
   }

   /**
    * 追加重复字符串。
    *
    * @param value 字符串
    * @param count 次数
    * @return 字符串缓冲
    */
   public appendRepeat(value: string, count: number): StringBuffer {
      var memory = this._memory;
      for (var i = 0; i < count; i++) {
         memory[this._count++] = value;
      }
      return this;
   }

   /**
    * 追加一行字符串的内容到当前字符串内。
    *
    * @param parameters 参数集合
    * @return 字符串缓冲
    */
   public appendLine(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any, p7?: any, p8?: any): StringBuffer {
      this.appendArray(arguments as any, 0, arguments.length);
      this._memory[this._count++] = '\r\n';
      return this;
   }

   /**
    * 判断是否含有指定字符。
    *
    * @param char 字符
    * @return 是否含有
    */
   public constainsChar(char: string): boolean {
      var memory = this._memory;
      var count = memory.length;
      for (var i = 0; i < count; i++) {
         var value = memory[this._count++];
         if (value != null) {
            if (value.indexOf(char) != -1) {
               return true;
            }
         }
      }
      return false;
   }

   /**
    * 清除字符串内容。
    */
   public clear(): void {
      this._count = 0;
   }

   /**
    * 清除字符串内容。
    */
   public free(): void {
      this._count = 0;
   }

   /**
    * 将当前字符串对象转换为字符串。
    *
    * @return 字符串
    */
   public toString(nullAble?: boolean): string {
      var memory = this._memory;
      if (nullAble) {
         if (!memory) {
            return null as any;
         }
         if (memory.length == 0) {
            return null as any;
         }
      }
      if (memory) {
         if (memory.length != this._count) {
            memory = memory.slice(0, this._count);
         }
         return memory.join('');
      }
      return '';
   }

   /**
    * 获得字符串内容，释放所有内容。
    *
    * @param nullAble 可以为空
    * @return 字符串
    */
   public flush(nullAble?: boolean): string {
      var result = this.toString(nullAble);
      this.dispose();
      return result;
   }

   /**
    * 释放当前实例。
    *
    * @param flag 全部释放标志
    */
   public dispose(flag: boolean = false) {
      // 清空内存
      var memory = this._memory;
      if (memory) {
         var count = memory.length;
         for (var i = 0; i < count; i++) {
            memory[i] = null as any;
         }
         this._memory = null as any;
      }
      // 清空属性
      this._count = 0;
   }
}
