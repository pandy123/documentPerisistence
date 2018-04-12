import { StringBuffer } from './StringBuffer';
import { IntegerUtil } from './IntegerUtil';
import { RuntimeUtil } from '../util/RuntimeUtil';


export class StringUtil {
   /** 空字符串 */
   public static EMPTY: string = '';
   public static SPACE: string = '   ';
   public static PAD: string = ' ';
   public static TRIM: string = ' \t\r\n';
   public static LOWER: string = 'abcdefghijklmnopqrstuvwxyz';
   public static UPPER: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   public static CodeLowerA: number = 'a'.charCodeAt(0);
   public static CodeLowerZ: number = 'z'.charCodeAt(0);
   public static CodeUpperA: number = 'A'.charCodeAt(0);
   public static CodeUpperZ: number = 'Z'.charCodeAt(0);
   /** 哈希数据 */
   private static _hashData: any;
   /** 样式表 */
   private static _partterns: any = new Object();

   /**
    * 判断字符串是否为空。
    *
    * @param value 字符串
    * @return 是否为空
    */
   public static isEmpty(value: any) {
      if (value != null) {
         if (value.length != 0) {
            return false;
         }
      }
      return true;
   }

   /**
    * 判断字符串是否非空。
    *
    * @param value 字符串
    * @return 是否非空
    */
   public static isNotEmpty(value: string) {
      if (value != null) {
         if (value.length != 0) {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断字符串集合是否非空。
    *
    * @param values 字符串集合
    * @return 是否为空
    */
   public static isNotEmptyArgs(...values: Array<string>) {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         if (value == null) {
            return false;
         }
         if (value.length == 0) {
            return false;
         }
      }
      return true;
   }

   /**
    * 判断字符串不包含开始和结尾的空格，是否为空。
    *
    * @param value 字符串
    * @return 是否为空
    */
   public static isBlank(value: string) {
      if (value != null) {
         var trim = value.trim();
         return trim.length == 0;
      }
      return true;
   }

   /**
    * 判断字符串是否为ANSI编码。
    * 字符串内每一个字符编码在256之下，为ANSI编码的判断标准。
    *
    * @param value 字符串
    * @return 是否指定类型
    */
   public static isAnsi(value: string) {
      if (value != null) {
         var count = value.length;
         for (var i = 0; i < count; i++) {
            if (value.charCodeAt(i) > 255) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

   /**
    * 判断字符串是否为DBCS编码。
    * 字符串内每一个字符编码在255之上，为DBCS编码的判断标准。
    *
    * @param value 字符串
    * @return 是否指定类型
    */
   public static isDbcs(value: any) {
      if (value == null) {
         var count = value.length;
         for (var i = 0; i < count; i++) {
            if (value.charCodeAt(i) < 256) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

   /**
    * 判断字符串是否和指定模板相匹配。
    * <P>特定字符表示一个范围内容
    *    <L value='$a'>所有小写字符(abcdefghijklmnopqrstuvwxyz)</L>
    *    <L value='$A'>所有大写字符(ABCDEFGHIJKLMNOPQRSTUVWXYZ)</L>
    *    <L value='$i'>所有整数字符(0123456789)</L>
    *    <L value='$n'>所有整数字符(0123456789-)</L>
    *    <L value='$f'>所有浮点数字符(0123456789-.)</L>
    * </P>
    *
    * @param value 字符串
    * @param parttern 模板字符串
    * @return 是否匹配
    */
   public static isPattern(value: string, parttern: string): boolean {
      if (value != null) {
         // 展开模板内容
         var source = StringUtil._partterns[parttern];
         if (!source) {
            source = (parttern == null) ? '$a$A$f' : parttern;
            source = source.replace(/\a/g, this.LOWER);
            source = source.replace(/\A/g, this.UPPER);
            source = source.replace(/\n/g, IntegerUtil.CHARS);
            StringUtil._partterns[parttern] = source;
         }
         // 检查匹配
         var count = value.length;
         for (var i = 0; i < count; i++) {
            if (source.indexOf(value.charAt(i)) == -1) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

   /**
    * 判断字符串是否和指定模板相匹配。
    * <P>特定字符表示一个范围内容
    *    <L value='$a'>所有小写字符(abcdefghijklmnopqrstuvwxyz)</L>
    *    <L value='$A'>所有大写字符(ABCDEFGHIJKLMNOPQRSTUVWXYZ)</L>
    *    <L value='$i'>所有整数字符(0123456789)</L>
    *    <L value='$n'>所有整数字符(0123456789-)</L>
    *    <L value='$f'>所有浮点数字符(0123456789-.)</L>
    * </P>
    *
    * @param value 字符串
    * @param parttern 模板字符串
    * @return 是否匹配
    */
   public static inChars(value: any, parttern: string) {
      var b = this.findChars(parttern, value);
      if (b != -1) {
         return true;
      }
      return false;
   }

   /**
    * 判断两个字符串是否相等。
    *
    * @param source 源字符串
    * @param target 目标字符串
    * @param caseCare 是否忽略大小写(默认为忽略大小写)
    * @return 是否相等
    */
   public static equals(source: string, target: string, caseCare: boolean = true): boolean {
      // 获得参数
      if (source == null) {
         source = '';
      } else if (source.constructor != String) {
         source = source.toString();
      }
      if (target == null) {
         target = '';
      } else if (target.constructor != String) {
         target = target.toString();
      }
      // 比较相同
      if (caseCare) {
         return (source == target);
      } else {
         return (source.toLowerCase() == target.toLowerCase());
      }
   }

   /**
    * 判断是否包含指定字符串。
    *
    * @param source 字符串
    * @param values 内容集合
    * @return 是否包含
    */
   public static contains(source: string, ...values: Array<any>): boolean {
      if (source != null) {
         // 转换成字符串
         if (source.constructor != String) {
            source = source.toString();
         }
         // 判断内容包含
         var count = values.length;
         for (var i = 0; i < count; i++) {
            var value = values[i];
            if (source.indexOf(value) != -1) {
               return true;
            }
         }
      }
      return false;
   }

   /**
    * 判断是否包含在指定字符串。
    *
    * @param source 字符串
    * @param values 内容集合
    * @return 是否包含
    */
   public static containsIn(source: string, ...values: Array<any>): boolean {
      if (source != null) {
         // 转换成字符串
         if (source.constructor != String) {
            source = source.toString();
         }
         // 判断内容包含
         var count = values.length;
         for (var i = 0; i < count; i++) {
            var value = values[i];
            if (value) {
               if (value.indexOf(source) != -1) {
                  return true;
               }
            }
         }
      }
      return false;
   }

   /**
    * 判断是否包含指定字符串。
    *
    * @param source 字符串
    * @param values 内容集合
    * @return 是否包含
    */
   public static containsItem(source: string, values: Array<any>): boolean {
      if (source != null) {
         // 转换成字符串
         if (source.constructor != String) {
            source = source.toString();
         }
         // 判断内容包含
         var count = values.length;
         for (var i = 0; i < count; i++) {
            var value = values[i];
            if (source.indexOf(value) != -1) {
               return true;
            }
         }
      }
      return false;
   }

   /**
    * 判断字符串是否以特定字符串开始。
    *
    * @param value 字符串
    * @param search 特定字符串
    * @return 是否开始
    */
   public static startsWith(value: any, search: any) {
      if (value == null || search == null) {
         return false;
      }
      return value.indexOf(search) == 0;
   }

   /**
    * 判断字符串是否以特定字符串结束。
    *
    * @param value 字符串
    * @param search 特定字符串
    * @return 是否结束
    */
   public static endsWith(value: any, search: any) {
      if (value == null || search == null) {
         return false;
      }
      var index = value.indexOf(search);
      if (index == -1) {
         return false;
      }
      return index == (value.length - search.length);
   }

   /**
    * 在字符串中查找指定字符列表。
    *
    * @param value 字符串
    * @param search 字符列表
    * @return 位置索引
    */
   public static findChars(value: string, search: string): number {
      if ((value != null) && (search != null)) {
         var c = value.length;
         for (var n = 0; n < c; n++) {
            if (search.indexOf(value.charAt(n)) != -1) {
               return n;
            }
         }
      }
      return -1;
   }

   /**
    * 判断指定字符串是否在一个字符串数组中含有。
    *
    * @param value 源字符串
    * @param ranges 字符串数组
    * @param boolean 是否忽略大小写(默认为忽略大小写)
    * @return 非空字符串
    */
   public static inRange(value: string, ranges: Array<string>, force: boolean) {
      if (value && ranges) {
         if (!force) {
            value = value.toLowerCase();
         }
         var count = ranges.length;
         for (var i = 0; i < count; i++) {
            var range = ranges[i];
            if (range != null) {
               if (force) {
                  if (value == range) {
                     return true;
                  }
               } else {
                  if (value == range.toLowerCase()) {
                     return true;
                  }
               }
            }
         }
      }
      return false;
   }

   /**
    * 返回一个不为空的字符串。
    *
    * @param value 字符串
    * @param defaultValue 缺省字符串
    * @return 非空字符串
    */
   public static nvl(value: string, defaultValue?: string): string {
      if (value != null) {
         var result = null;
         if (value.constructor != String) {
            result = value.toString();
         } else {
            result = value;
         }
         if (result.length > 0) {
            return result;
         }
      }
      if (defaultValue != null) {
         return defaultValue;
      }
      return StringUtil.EMPTY;
   }

   /**
    * 如果字符串为空，则返回空。
    *
    * @param value 字符串
    * @return 空字符串
    */
   public static empty(value: string) {
      if (value != null) {
         var s = null;
         if (value.constructor != String) {
            s = value.toString();
         } else {
            s = value;
         }
         if (s.length > 0) {
            return s;
         }
      }
      return null;
   }

   /**
    * 在字符串中查找字符集合第一次出现的位置。
    *
    * @param source 来源
    * @param chars 字符集合
    * @return 索引位置
    */
   public static indexOfChars(source: string, chars: string): number {
      var count = source.length;
      for (var i = 0; i < count; i++) {
         var char = source.charAt(i);
         if (chars.indexOf(char) != -1) {
            return i;
         }
      }
      return -1;
   }

   /**
    * 在字符串中查找字符集合最后一次出现的位置。
    *
    * @param source 来源
    * @param chars 字符集合
    * @return 索引位置
    */
   public static lastIndexOfChars(source: string, chars: string): number {
      var count = source.length;
      for (var i = count - 1; i >= 0; i--) {
         var char = source.charAt(i);
         if (chars.indexOf(char) != -1) {
            return i;
         }
      }
      return -1;
   }

   /**
    * 计算字符串的哈希值。
    *
    * @param source 字符串
    * @param code 参照码
    * @return 哈希值
    */
   public static calculateHash(source: string, code: number = 0) {
      var data = this._hashData;
      if (!data) {
         data = this._hashData = new Int32Array(1);
      }
      data[0] = code;
      var length = source.length;
      for (var i = 0; i < length; i++) {
         var value = source.charCodeAt(i);
         data[0] = 31 * data[0] + value;
      }
      return Math.abs(data[0]);
   }

   /**
    * 将字符串的首字符变为大写。
    *
    * @param value 字符串
    * @return 首字母是大写的字符串
    */
   public static firstUpper(value: string): string {
      return (value != null) ? value.charAt(0).toUpperCase() + value.substr(1) : value;
   }

   /**
    * 将字符串的首字符变为小写。
    *
    * @param value 字符串
    * @return 首字母是小写的字符串
    */
   public static firstLower(value: string): string {
      return (value != null) ? value.charAt(0).toLowerCase() + value.substr(1) : value;
   }

   /**
    * 获得字符串中第一行字符串。
    *
    * @param value 字符串
    * @return 第一行字符串
    */
   public static firstLine(value: string): string {
      if (value) {
         var n = Math.min(value.indexOf('\r'), value.indexOf('\n'));
         if (-1 != n) {
            return value.substr(0, n);
         }
         return value;
      }
      return '';
   }

   /**
    * 格式化一个字符串内容，将参数中{x}内容替换为参数内容。
    *
    * @param value 字符串
    * @param parameters 参数集合
    * @return 格式化字符串
    */
   public static format(value: string, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any) {
      var count = arguments.length;
      for (var i = 1; i < count; i++) {
         var text = null;
         var parameter = arguments[i];
         if (parameter == null) {
            text = '';
         } else if (typeof (parameter) == 'function') {
            text = RuntimeUtil.className(parameter);
         } else {
            text = parameter;
         }
         value = value.replace('{' + i + '}', text);
      }
      return value;
   }

   /**
    * 格式化一个字符串内容，将参数中{x}内容替换为参数内容。
    *
    * @param value 字符串
    * @param parameters 参数集合
    * @return 格式化字符串
    */
   public static formatParameters(value: string, parameters: Array<any>) {
      var count = parameters.length;
      for (var i = 0; i < count; i++) {
         var text = null;
         var parameter = parameters[i];
         if (typeof parameter == 'string') {
            text = parameter;
         } else if (typeof (parameter) == 'function') {
            text = RuntimeUtil.className(parameter);
         } else if (parameter != null) {
            text = parameter.toString();
         } else {
            text = '';
         }
         value = value.replace('{' + (i + 1) + '}', text);
      }
      return value;
   }

   /**
    * 格式化多行文本。
    *
    * @param source 字符串
    * @return 字符串
    */
   public static formatLines(value: string): string {
      value = value.replace(/\\r/g, '');
      var ls = value.split('\n');
      var c = ls.length;
      var r: StringBuffer = new StringBuffer();
      for (var i = 0; i < c; i++) {
         var l: string = ls[i]
         l = this.trim(l);
         if (this.isEmpty(l)) {
            continue;
         }
         if (this.startsWith(l, '//')) {
            continue;
         }
         r.appendLine(l);
      }
      return r.flush();
   }

   /**
    * 获得重复指定次数的字符串。
    *
    * @param value 字符串
    * @param count 重复的次数
    * @return 重复后的字符串
    */
   public static repeat(value: any, count: any) {
      return new Array(count + 1).join(value);
   }

   /**
    * 通过追加空格使字符串对齐指定长度，字符串内容位于对齐后字符串的中间位置。
    *
    * @param value 字符串
    * @param length 对齐后长度
    * @param pad 补齐字符(默认为空格字符)
    * @return 补齐长度的字符串
    */
   public static pad(value: string, length: number, pad: string = StringUtil.PAD): string {
      value = (value != null) ? value.toString() : this.EMPTY;
      var sub = length - value.length;
      if (sub > 0) {
         var position = (sub % 2 == 0) ? sub / 2 : (sub - 1) / 2;
         return new Array(position + 1).join(pad) + value + new Array(sub - position + 1).join(pad);
      }
      return value;
   }

   /**
    * 通过在左边追加空格使字符串对齐指定长度。
    *
    * @param value 字符串
    * @param length 对齐后长度
    * @param pad 补齐字符(默认为空格字符)
    * @return 补齐长度的字符串
    */
   public static padLeft(value: string, length: number, pad: string = StringUtil.PAD) {
      value = (value != null) ? value.toString() : StringUtil.EMPTY;
      var sub = length - value.length;
      if (sub > 0) {
         var array = new Array(sub);
         array[array.length] = value;
         return array.join(pad);
      }
      return value;
   }

   /**
    * 通过在右边追加空格使字符串对齐指定长度。
    *
    * @param value 字符串
    * @param length 对齐后长度
    * @param pad 补齐字符(默认为空格字符)
    * @return 补齐长度的字符串
    */
   public static padRight(value: string, length: number, pad: string = StringUtil.PAD) {
      value = (value != null) ? value.toString() : StringUtil.EMPTY;
      var sub = length - value.length;
      if (sub > 0) {
         return value + new Array(sub + 1).join(pad);
      }
      return value;
   }

   /**
    * 去掉字符串开始和结尾的空格字符和非显示字符。
    *
    * @param value 字符串对象
    * @param trims 要去除的字符串
    * @return 去掉开始和结尾的空格和非显示字符的字符串
    */
   public static trim(value: string, ts: string = null as any): string {
      value = StringUtil.nvl(value);
      ts = StringUtil.nvl(ts, StringUtil.TRIM);
      var l = 0;
      var r = value.length - 1;
      for (; l < r; l++) {
         if (-1 == ts.indexOf(value.charAt(l))) {
            break;
         }
      }
      for (; r >= l; r--) {
         if (-1 == ts.indexOf(value.charAt(r))) {
            break;
         }
      }
      if (l == r + 1) {
         return null as any;
      }
      if ((l != 0) || (r != value.length - 1)) {
         return value.substring(l, r + 1);
      }
      return value;
   }

   /**
    * 去掉字符串开始的空格字符和非显示字符。
    *
    * @param value 字符串对象
    * @param trims 要去除的字符串
    * @return 去掉开始的空格和非显示字符的字符串
    */
   public static ltrim(v: string, ts: string) {
      v = this.nvl(v);
      ts = this.nvl(ts, this.TRIM);
      var l = 0;
      var r = v.length - 1;
      for (; l < r; l++) {
         if (-1 == ts.indexOf(v.charAt(l))) {
            break;
         }
      }
      if (0 != l) {
         return v.substring(l, r + 1);
      }
      return v;
   }

   /**
    * 去掉字符串结尾的空格字符和非显示字符。
    *
    * @param value 字符串对象
    * @param trims 要去除的字符串
    * @return 去掉结尾的空格和非显示字符的字符串
    */
   public static rtrim(v: string, ts: string): string {
      v = this.nvl(v);
      ts = this.nvl(ts, this.TRIM);
      var r = v.length - 1;
      for (; r >= 0; r--) {
         if (-1 == ts.indexOf(v.charAt(r))) {
            break;
         }
      }
      if (r != v.length - 1) {
         return v.substring(0, r + 1);
      }
      return v;
   }

   /**
    * 从字符串中截取开始到查找字符串中间的部分字符串。
    *
    * @param value 字符串对象
    * @param search 搜索字符串
    * @return 截取后的部分字符串
    */
   public static left(value: string, search: string): string {
      if ((value != null) && (search != null)) {
         var find = value.indexOf(search);
         if (find != -1) {
            return value.substring(0, find);
         }
      }
      return value;
   }

   /**
    * 从字符串中截取结束到查找字符串中间的部分字符串。
    *
    * @param value 字符串对象
    * @param search 搜索字符串
    * @return 截取后的部分字符串
    */
   public static right(value: string, search: string): string {
      if ((value != null) && (search != null)) {
         var find = value.indexOf(search);
         if (find != -1) {
            return value.substring(find + search.length);
         }
      }
      return value;
   }

   /**
    * 从字符串中截取开始字符串到结束字符串中间的部分字符串。
    * 开始字符串不存在的话，从字符串开始位置截取。
    * 结束字符串不存在的话，截取到字符串的最终位置。
    *
    * @param value 字符串对象
    * @param begin 起始字符串
    * @param end 结束字符串
    * @return 截取后的部分字符串
    */
   public static mid(value: string, begin: string, end: string): string {
      if (value == null) {
         return value;
      }
      var left = 0;
      if (begin != null) {
         var find = value.indexOf(begin);
         if (find != -1) {
            left = find + begin.length;
         }
      }
      var right = value.length;
      if (end != null) {
         var find = value.indexOf(end, left);
         if (find != -1) {
            right = find;
         }
      }
      return value.substring(left, right);
   }

   /**
    * 将字符串中的控制字符转换为一行可以存储的字符串。
    *
    * @param value 字符串
    * @return 行字符串
    */
   public static toLine(value: string): string {
      return value.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
   }

   //===========================================================
   // <T>将字符串中的大写变成下划线。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @return String 字符串
   //===========================================================
   public static toUnderline(v: any) {
      var r = null;
      if (v) {
         var s: StringBuffer = new StringBuffer();
         var c = v.length;
         for (var i = 0; i < c; i++) {
            var h = v.charAt(i);
            if (h.toUpperCase() == h) {
               if (i > 0) {
                  s.append('_');
               }
               s.append(h.toLowerCase());
            } else {
               s.append(h);
            }
         }
         r = s.flush();
      }
      return r;
   }

   /**
    * 在字符串转化为小写字符串。
    *
    * @param value 字符串
    * @return 小写字符串
    */
   public static toLower(value: string) {
      return (value != null) ? value.toLowerCase() : this.EMPTY;
   }

   /**
    * 在字符串转化为大写字符串。
    *
    * @param value 字符串
    * @return 大写字符串
    */
   public static toUpper(value: string) {
      return (value != null) ? value.toUpperCase() : this.EMPTY;
   }

   /**
    * 比较字符串大小。
    *
    * @param value1 字符串1
    * @param value2 字符串2
    * @return 比较
    */
   public static compare(value1: string, value2: string) {
      return value1.localeCompare(value2);
   }

   /**
    * 把一个字符串分割为字符串数组。
    *
    * @param value 字符串
    * @param split 分割字符串
    * @return 分割后的字符串数组
    */
   public static split(value: string, split: string): Array<string> {
      var result = null;
      if (value && split) {
         result = value.split(split)
      }
      return result as any;
   }

   /**
    * 把一个字符串分割为两个字符串的数组。
    *
    * @param value 字符串
    * @param split 分割字符串
    * @return 分割后的字符串数组
    */
   public static splitTwo(value: string, split: string) {
      if (value && split) {
         var result = new Array();
         var find = value.indexOf(split);
         if (find == -1) {
            result.push(value);
         } else {
            result.push(value.substring(0, find));
            result.push(value.substring(find + split.length));
         }
         return result;
      }
      return null;
   }

   /**
    * 从字符串中截取与匹配字符相等的子字符串组。
    *
    * @param value 字符串
    * @param split 要截取的参照字符的组合
    * @return 截取的字符数组
    */
   public static splitParts(value: string, split: any) {
      var result = new Array();
      var k = 0;
      var length = value.length;
      for (var i = 0; i < length; i++) {
         for (var j in split) {
            if (StringUtil.startsWith(split[j], value.charAt(i))) {
               if (this.equals(value.substr(i, split[j].length), split[j])) {
                  result[k++] = split[j];
                  i = i + split[j].length - 1;
                  break;
               }
            }
         }
      }
      return result;
   }

   /**
    * 从字符串中截取与匹配字符相等的子字符串组。
    *
    * @param value 字符串
    * @param pattern 要截取的参照字符的组合
    * @return 截取的字符数组
    */
   public static splitPattern(value: string, pattern: any) {
      var result = new Array();
      if (value) {
         var valueLength = value.length;
         var patternLength = pattern.length;
         var temp = '';
         for (var n = 0; n < valueLength; n++) {
            var v = false;
            for (var i = 0; i < patternLength; i++) {
               var f = pattern[i];
               if (value.indexOf(f) == -1) {
                  if (temp.length) {
                     result[result.length] = temp;
                     temp = '';
                  }
                  result[result.length] = f;
                  value = value.substring(f.length);
                  v = true;
                  break;
               }
            }
            if (!v) {
               temp += value.charAt(0);
               value = value.substring(1);
            }
         }
      }
      return result;
   }

   /**
    * 替换字符串全部内容。
    *
    * @param value 字符串
    * @param source 源字符串
    * @param target 目标字符串
    * @return 字符串
    */
   public static replace(value: string, source: string, target: string) {
      return value.replace(new RegExp(source, 'g'), target);
   }

   /**
    * 替换全部指定字符。
    *
    * @param value 字符串
    * @param source 源字符串
    * @param target 目标字符串
    * @return 字符串
    */
   public static replaceChar(value: string, source: string, target: string) {
      var result = null;
      if (value != null) {
         var count = value.length;
         var chars = new Array();
         for (var n = 0; n < count; n++) {
            var char = value.charAt(n);
            if (char == source) {
               chars[chars.length] = target;
            } else {
               chars[chars.length] = char;
            }
         }
         result = chars.join('');
      }
      return result;
   }

   /**
    * 解析字符数组为字符串。
    *
    * @param data 数组
    * @return 字符串
    */
   public static decodeUtf(data: Array<any>) {
      var i = 0;
      var j = 0;
      var x = 0;
      var y = 0;
      var z = 0;
      var l = data.length;
      var result = [];
      var codes = [];
      for (; i < l; ++i, ++j) {
         x = data[i] & 255;
         if (!(x & 128)) {
            if (!x) {
               return data;
            }
            codes[j] = x;
         } else if ((x & 224) == 192) {
            if (i + 1 >= l) {
               return data;
            }
            y = data[++i] & 255;
            if ((y & 192) != 128) {
               return data;
            }
            codes[j] = ((x & 31) << 6) | (y & 63);
         } else if ((x & 240) == 224) {
            if (i + 2 >= l) {
               return data;
            }
            y = data[++i] & 255;
            if ((y & 192) != 128) {
               return data;
            }
            z = data[++i] & 255;
            if ((z & 192) != 128) {
               return data;
            }
            codes[j] = ((x & 15) << 12) | ((y & 63) << 6) | (z & 63);
         } else {
            return data;
         }
         if (j == 65535) {
            var charLength = codes.length;
            for (var index = 0; index < charLength; index++) {
               result.push(String.fromCharCode(codes[index]));
            }
            j = -1;
         }
      }
      if (j > 0) {
         codes.length = j;
         var charLength = codes.length;
         for (var index = 0; index < charLength; index++) {
            result.push(String.fromCharCode(codes[index]));
         }
      }
      return result.join("");
   }

   /**
    * 删除字符串中的指定字符。
    *
    * @param source 源字符串
    * @param target 目标字符串
    * @return 删除后的字符串
    */
   public static remove(value: any, t: any) {
      return value.replace(t, '');
   }

   /**
    * 删除字符串中的指定字符集合。
    *
    * @param value 字符串
    * @param removes 移除内容
    * @return 删除后的字符串
    */
   public static removeChars(value: string, removes: string) {
      if (value != null) {
         var count = value.length;
         var result = new Array();
         for (var i = 0; i < count; i++) {
            var char = value.charAt(i);
            if (removes.indexOf(char) != -1) {
               continue;
            }
            result[result.length] = char;
         }
         return result.join('');
      }
      return value;
   }

   /**
    * 判断内容是否含在项目集合中。
    *
    * @param source 来源
    * @param items 项目集合
    * @return 是否含有
    */
   public static itemConstains(source: string, items: Array<string>): any {
      var count = items.length;
      for (var i = 0; i < count; i++) {
         var item = items[i];
         if (items.indexOf(item) == -1) {
            if (source.indexOf(name) != -1) {
               return true;
            }
         }
      }
   }

   /**
    * 根据分割字符对字符串进行分割处理。
    *
    * @param source 来源
    * @param chars 字符集合
    * @return 分割集合
    */
   public static spliteByChars(source: string, chars: string): Array<string> {
      var result = new Array<string>();
      var count = source.length;
      var value = '';
      for (var i = 0; i < count; i++) {
         var char = source.charAt(i);
         if (chars.indexOf(char) != -1) {
            if (value != '') {
               result.push(value);
               value = '';
            }
            result.push(char);
         } else {
            value += char;
         }
      }
      if (value != '') {
         result.push(value);
      }
      return result;
   }

   /**
    * 数据转换为字符串。
    *
    * @param value 内容
    * @return 字符串
    */
   public static sortAsc(value1: string, value2: string) {
      if (value1 > value2) {
         return 1;
      } else if (value1 < value2) {
         return -1;
      }
      return 0;
   }

   /**
    * 数据转换为字符串。
    *
    * @param value 内容
    * @return 字符串
    */
   public static toString(value: any) {
      if (value != null) {
         if (value.constructor == String) {
            return value;
         } else {
            return value.toString();
         }
      }
      return '';
   }

   /**
    * 数据转换为非空字符串。
    *
    * @param value 内容
    * @return 字符串
    */
   public static toNotEmptyString(value: any) {
      if (value != null) {
         if (value.constructor == String) {
            value = value.toString();
         }
         if (value.length > 0) {
            return value;
         }
      }
      return null;
   }

   /** 
    * @param value 需要替换的字符或串
    * @param resString 被替换字符串
    * @param pos 原字符串中的位置
    * @param length 需要替换字符串的长度
    * @return 返回替换后的字符串
    */
   public static replaceCharAt(value: string, resString: string, pos: number, length: number = 1): string {
      var ret = resString;
      if (pos >= resString.length) {
         return ret;
      }
      if (length > value.length) {
         length = value.length;
      }
      if (pos + length >= resString.length) {
         length = resString.length - pos;
      }
      var str = resString.slice(0, pos);
      var val = value.slice(0, length);
      ret = str + val;
      str = resString.slice(pos + length, resString.length);
      ret = ret + str;
      return ret;
   }

   /**
    * UTF8数组转字符串。
    * 
    * @param array 数组
    * @return 字符串
    */
   public static utf8ToString(array: ArrayBuffer): string {
      var buffer = new Int8Array(array);
      var out: string;
      var i, len, c;
      var char2, char3;
      out = "";
      len = buffer.length;
      i = 0;
      while (i < len) {
         c = buffer[i++];
         switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
               // 0xxxxxxx
               out += String.fromCharCode(c);
               break;
            case 12: case 13:
               // 110x xxxx   10xx xxxx
               char2 = buffer[i++];
               out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
               break;
            case 14:
               // 1110 xxxx  10xx xxxx  10xx xxxx
               char2 = buffer[i++];
               char3 = buffer[i++];
               out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
               break;
         }
      }
      return out;
   }

   /**
    * 字符串转UTF8数组。
    * 
    * @param value 字符串
    * @return 数组
    */
   public static stringToUtf8(value: string): ArrayBuffer {
      var array = [];
      var chr1, chr2;
      var code = null;
      var count = value.length;
      for (var i = 0; i < count; i++) {
         code = value.charCodeAt(i);
         if (code < 0x80) {
            array.push(code);
         } else if (code < 0x800) {
            chr1 = code & 0xff;
            chr2 = (code >> 8) & 0xff;
            array.push(0xC0 | (chr2 << 2) | ((chr1 >> 6) & 0x3));
            array.push(0x80 | (chr1 & 0x3F));
         } else {
            chr1 = code & 0xff;
            chr2 = (code >> 8) & 0xff;
            array.push(0xE0 | (chr2 >> 4));
            array.push(0x80 | ((chr2 << 2) & 0x3C) | ((chr1 >> 6) & 0x3));
            array.push(0x80 | (chr1 & 0x3F));
         }
      }
      var intArray = new Int8Array(array);
      return intArray.buffer as any;
   }
}
