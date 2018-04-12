import { ProcessEnum } from './ProcessEnum';
import { RuntimeStack } from './RuntimeStack';


export class RuntimeUtil {
   /** 项目名称 */
   public static projectName: string;
   /** 版本 */
   public static version: string = '0.1.0';
   /** 模式类型 */
   public static processCd: ProcessEnum = ProcessEnum.Release;
   /** 宿主 */
   public static host: any;
   /** 是否跟踪 */
   public static track: boolean = true;
   /** 线程代码 */
   public static threadCode: string = 'main';
   /** Web方式 */
   protected static _web: boolean;
   /** Worker方式 */
   protected static _worker: boolean;
   /** NodeJS方式 */
   protected static _nodeJs: boolean;
   /** Shell方式 */
   protected static _shell: boolean;
   /** 编号集合 */
   protected static _ids: any = new Object();
   /** 实例集合 */
   protected static _instances = new Array<any>();
   /** 唯一编号 */
   protected static GUID_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
   protected static GUID_BUFFER = new Array(36);

   /**
    * 测试是否调试模式。
    *
    * @return 是否调试模式
    */
   public static isDebug(): boolean {
      return this.processCd == ProcessEnum.Debug;
   }

   /**
    * 测试是否运行模式。
    *
    * @return 是否运行模式
    */
   public static isRelease(): boolean {
      return this.processCd == ProcessEnum.Release;
   }

   /**
    * 测试是否WEB模式。
    *
    * @return 是否WEB模式
    */
   public static isWeb(): boolean {
      var result = this._web;
      if (result == null) {
         result = this._web = (typeof window) == 'object';
      }
      return result;
   }

   /**
    * 测试是否WEB模式。
    *
    * @return 是否WEB模式
    */
   public static IsWorker(): boolean {
      var result = this._worker;
      if (result == null) {
         result = this._worker = (typeof importScripts) == 'function';
      }
      return result;
   }

   /**
    * 测试是否NodeJS模式。
    *
    * @return 是否NodeJS模式
    */
   public static IsNodeJs(): boolean {
      var result = this._nodeJs;
      if (result == null) {
         // result = this._nodeJs = (typeof process) == 'object' && (typeof require) == 'function' && !this.isWeb() && !this.IsWorker();
      }
      return result;
   }

   /**
    * 测试是否Shell模式。
    *
    * @return 是否Shell模式
    */
   public static IsShell(): boolean {
      var result = this._shell;
      if (result == null) {
         result = this._shell = !this.isWeb() && !this.IsWorker() && !this.IsNodeJs();
      }
      return result;
   }

   /**
    * 空函数调用。
    */
   public static empty() {
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
         } else if (clazz == Function) {
            return true;
         }
      }
      return false;
   }

   /**
    * 获得非空对象。
    *
    * @param value 对象
    * @param defaultValue 默认对象
    * @return 非空对象
    */
   public static nvl(value: any, defaultValue: any): any {
      return (value != null) ? value : defaultValue;
   }

   /**
    * 获得下一个编号。
    *
    * @param code 代码
    * @return 编号
    */
   public static nextId(code: string): number {
      var id = this._ids[code] as number;
      if (id == null) {
         id = this._ids[code] = 0;
      } else {
         this._ids[code] = ++id;
      }
      return id;
   }

   /**
    * 获得对象的唯一编号。
    *
    * @param instance 对象实例
    * @return 索引
    */
   public static codeOf(instance: any): number {
      var instances = this._instances;
      var count = instances.length as number;
      for (var i = 0; i < count; i++) {
         if (instances[i] === instance) {
            return i;
         }
      }
      instances[count] = instance;
      return count;
   }

   /**
    * 获得实例的唯一编号。
    *
    * @param instance 对象实例
    * @return 编号
    */
   public static instanceCode(instance: any): number {
      var code = null;
      if (instance) {
         code = instance.hashCode;
         if (!code) {
            code = this.codeOf(instance);
         }
      }
      return code;
   }

   /**
    * 从字符串中截取开始字符串到结束字符串中间的部分字符串。
    * 开始字符串不存在的话，从字符串开始位置截取。
    * 结束字符串不存在的话，截取到字符串的最终位置。
    *
    * @param value 字符传对象
    * @param begin 起始字符串
    * @param end 结束字符串
    * @return 截取后的部分字符串
    */
   public static subString(value: string, begin: string, end: string): string {
      // 检查变量
      if (value == null) {
         return value;
      }
      // 计算左侧位置
      var left = 0;
      if (begin != null) {
         var find = value.indexOf(begin);
         if (find != -1) {
            left = find + begin.length;
         }
      }
      // 计算右侧位置
      var right = value.length;
      if (end != null) {
         var find = value.indexOf(end, left);
         if (find != -1) {
            right = find;
         }
      }
      // 截取字符串
      if (left >= right) {
         return '';
      }
      return value.substring(left, right);
   }

   /**
    * 安全获得对象实例的类型名称，不产生任何例外。
    *
    * @param value 对象实例
    * @param safe 安全名称
    * @return 类型名称字符串
    */
   public static typeOf(instance: any, safe: any = null) {
      // 空对象的情况
      if (instance == null) {
         return 'Null';
      }
      try {
         // 实例判断
         if (instance.__class) {
            return 'Instance';
         }
         // 普通数据类型
         var type = instance.constructor;
         if (type == Boolean) {
            return 'Boolean';
         }
         if (type == Number) {
            return 'Number';
         }
         if (type == String) {
            return 'String';
         }
         if (type == Function) {
            return 'Function';
         }
         if (Array.isArray(instance)) {
            return 'Array';
         }
         // 页面对象的情况
         if (instance.tagName) {
            return 'Html';
         }
         if (type.constructor == Function) {
            return 'Instance';
         }
         // 普通对象的情况
         for (var name in instance) {
            return 'Object';
         }
      } catch (exception) {
         return safe;
      }
      // 未知类型的情况
      return 'Unknown';
   }

   /**
    * 获得对象实例的类名称。
    *
    * @param value 函数对象
    * @return 类名称
    */
   public static className(value: any, cache?: boolean): string {
      var result: string = null as any;
      if (value) {
         var name = null;
         // 如果对象是函数的情况
         if (typeof value == 'function') {
            // 缓冲获得
            if (cache) {
               name = value.__spaceName;
               if (name) {
                  return name;
               }
            }
            name = value.__className;
            if (name) {
               return name;
            }
            // 获得名称
            var source = value.toString();
            var start = 0;
            if (source.indexOf('function ') == 0) {
               start = 9;
            } else if (source.indexOf('class ') == 0) {
               start = 6;
            } else {
               start = source.indexOf(' class ');
               if (start != -1) {
                  start += 7;
               }
            }
            var end = source.indexOf(' extends ');
            if (end == -1) {
               var end1 = source.indexOf('(');
               var end2 = source.indexOf('{');
               if ((end1 != -1) && (end2 != -1)) {
                  end = Math.min(end1, end2);
               } else if (end1 != -1) {
                  end = end1;
               } else if (end2 != -1) {
                  end = end2;
               }
            }
            var className = source.substring(start, end).trim();
            return className;
         }
         // 如果对象是普通对象的情况
         return this.className(value.constructor, cache);
      }
      return null as any;
   }

   /**
    * 正序排列比较器。
    *
    * @param source 来源对象
    * @param target 目标对象
    * @param parameters 参数对象
    */
   protected static sortComparerAsc(source: any, target: any, parameters: any): number {
      if (source > target) {
         return 1;
      } else if (source < target) {
         return -1;
      } else {
         return 0;
      }
   }

   /**
    * 倒序排列比较器。
    *
    * @param source 来源对象
    * @param target 目标对象
    * @param parameters 参数对象
    */
   protected static sortComparerDesc(source: any, target: any, parameters: any): number {
      if (source > target) {
         return -1;
      } else if (source < target) {
         return 1;
      } else {
         return 0;
      }
   }

   /**
    * 对值对快速排序。
    *
    * @param names 名称数组
    * @param values 内容数组
    * @param begin 开始位置
    * @param end 结束位置
    * @param comparer 比较器
    * @param parameters 参数
    */
   protected static pairSortMid(names: Array<any>, values: Array<any>, begin: number, end: number, comparer: Function, parameters: any): number {
      var name = names[begin];
      var value = null;
      if (values) {
         value = values[begin];
      }
      while (begin < end) {
         while ((begin < end) && (comparer(names[end], name, parameters) >= 0)) {
            end--;
         }
         names[begin] = names[end];
         if (values) {
            values[begin] = values[end];
         }
         while ((begin < end) && (comparer(names[begin], name, parameters) <= 0)) {
            begin++;
         }
         names[end] = names[begin];
         if (values) {
            values[end] = values[begin];
         }
      }
      names[begin] = name;
      if (values) {
         values[begin] = value;
      }
      return begin;
   }

   /**
    * 对值对快速排序。
    *
    * @param names 名称数组
    * @param values 内容数组
    * @param begin 开始位置
    * @param end 结束位置
    * @param comparer 比较器
    * @param parameters 参数
    */
   private static pairSortSub(names: Array<any>, values: Array<any>, begin: number, end: number, comparer: Function, parameters: any) {
      if (begin < end) {
         var mid: number = this.pairSortMid(names, values, begin, end, comparer, parameters);
         this.pairSortSub(names, values, begin, mid - 1, comparer, parameters);
         this.pairSortSub(names, values, mid + 1, end, comparer, parameters);
      }
   }

   /**
    * 对值对快速排序。
    *
    * @param names 名称数组
    * @param values 内容数组
    * @param offset 位置
    * @param count 总数
    * @param comparer 比较器
    * @param parameters 参数
    */
   public static pairSort(names: Array<any>, values: Array<any>, offset: number, count: number, comparer: Function, parameters: any) {
      var begin = offset;
      var end = offset + count - 1;
      this.pairSortSub(names, values, begin, end, this.nvl(comparer, this.sortComparerAsc), parameters);
   }

   /**
    * 产生一个唯一编号。
    *
    * @return 唯一编号
    */
   public static makeGuid(): string {
      var value = 0;
      var chars = RuntimeUtil.GUID_CHARS;
      var buffer = RuntimeUtil.GUID_BUFFER;
      for (var i = 0; i < 36; i++) {
         if (i == 8 || i == 13 || i == 18 || i == 23) {
            buffer[i] = '-';
         } else if (i == 14) {
            buffer[i] = '4';
         } else {
            if (value <= 0x02) {
               value = 0x2000000 + (Math.random() * 0x1000000) | 0;
            }
            var index = value & 0x0F;
            value = value >> 4;
            buffer[i] = chars[(i == 19) ? (index & 0x3) | 0x8 : index];
         }
      }
      return buffer.join('');
   }

   /**
    * 产生一个唯一编号。
    *
    * @return 唯一编号
    */
   public static makeUuid() {
      var value = RuntimeUtil.makeGuid();
      var count = value.length;
      var result = new Array();
      for (var i = 0; i < count; i++) {
         var char = value.charAt(i);
         if (char == '-') {
            continue;
         }
         result[result.length] = char;
      }
      return result.join('');
   }

   /**
    * 正序排列比较器。
    *
    * @param source 来源对象
    * @param target 目标对象
    * @param parameters 参数对象
    */
   public static parseStack(stack: string, offset: number = 0, level: number = 99, target?: Array<RuntimeStack>): Array<RuntimeStack> {
      var result = target || new Array<RuntimeStack>();
      var stackLines = stack.split('\n');
      var stackCount = stackLines.length;
      for (var i = offset; i < stackCount; i++) {
         var stackLine = stackLines[i];
         var runStack = new RuntimeStack();
         runStack.threadName = RuntimeUtil.threadCode;
         if (runStack.parse(stackLine)) {
            result.push(runStack);
            if (i - offset > level) {
               break;
            }
         }
      }
      return result;
   }

   /**
    * 定义命名控件上对象。
    * 
    * @param root 根对象
    * @param space 命名空间
    * @param value 对象
    */
   public static define(root: any, space: string, value: any) {
      var names = space.split('.');
      var count = names.length;
      var current = root;
      for (var i = 0; i < count; i++) {
         var name = names[i];
         if (i == count - 1) {
            current[name] = value;
         } else {
            if (current[name] == null) {
               current[name] = new Object();
            }
            current = current[name];
         }
      }
   }

   /**
    * 命名空间初始化处理。
    *
    * @param item 对象
    * @param space 空间名称
    */
   public static namespace(item: any, space: string) {
      item.__className = space;
      item.__spaceName = space;
      for (var name in item) {
         // 检查名称
         if (name.indexOf('_') == 0) {
            continue;
         }
         // 获得内容
         var value = item[name];
         if (value != null) {
            // 检查是否已经设置过
            if (value.prototype) {
               if (value.prototype.__spaceName != null) {
                  continue;
               }
            } else {
               if (value.__spaceName != null) {
                  continue;
               }
            }
            // 设置类型名称
            var typeName = typeof value;
            var spaceName = space + '.' + name;
            if (typeName == 'function') {
               value.__spaceName = spaceName;
               value.__className = name;
            } else if (typeName == 'object') {
               this.namespace(value, spaceName);
            }
         }
      }
   }

   /**
    * 获得一个实例的调试信息。
    * 调试信息的格式：类型名称<辅助信息>@唯一代码:内容。
    *
    * @param value 数据内容
    * @return 调试信息
    */
   public static dump(instance: any): string {
      var result: string = null as any;
      // 对象为空的情况
      if (instance == null) {
         result = '@null';
      }
      // 对象为一般实例的情况
      var typeName = this.typeOf(instance);
      switch (typeName) {
         case 'Boolean':
            // 数字的情况
            return 'Boolean:' + instance;
         case 'Number':
            // 数字的情况
            return 'Number:' + instance;
         case 'String':
            // 字符串的情况
            return 'String<' + instance.length + '>:' + instance;
         case 'Function':
            // 字符串的情况
            return 'Function<' + this.className(instance, true) + '>@' + this.instanceCode(instance);
         case 'Html':
            // HTML对象的情况
            return 'Html<' + instance.tagName + '>@' + this.instanceCode(instance);
         case 'Instance':
            // HTML对象的情况
            return this.className(instance, true) + '@' + this.instanceCode(instance);
         default:
            // 其他情况
            return typeName + '@' + this.instanceCode(instance);
      }
   }

   /**
    * 抛出一个对象。
    *
    * @param error 例外
    */
   public static throw(error: any) {
      setTimeout(function () { throw error; }, 0);
      return null;
   }

   /**
    * 释放一个对象。
    *
    * @param item 对象
    * @param flag 标志
    */
   public static dispose(item: any, flag: boolean = false) {
      if (item) {
         if (!item.__dispose) {
            item.dispose(flag);
            item.__dispose = true;
         } else {
            throw new Error('Object has disposed.');
         }
      }
      return null;
   }
}
