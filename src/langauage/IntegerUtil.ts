import { StringUtil } from './StringUtil';

/**
 * 整型工具类。
 * 
 * @author maocy
 * @version 141229
 */
export class IntegerUtil {
   /** 字符集合 */
   public static CHARS: string = '0123456789-%';
   /** 左侧填充字符 */
   public static LEFT_CHAR: string = '0';
   /** 最大16位数字 */
   public static MAX_UINT16: number = 65535;
   /** 最大32位数字 */
   public static MAX_UINT32: number = 4294967295;

   /**
    * 检验传入值是否是整型值。
    *
    * @param value 待检验的字符串
    * @return 是否整数
    */
   public static isInteger(value: any): boolean {
      return StringUtil.isPattern(value, 'n');
   }

   /**
    * 获取非空内容。
    *
    * @param value 数字
    * @param defaultValue 默认内容
    * @return 非空内容
    */
   public static nvl(value: any, defaultValue: number = 0): number {
      if (value != null) {
         return parseInt(value);
      }
      if (defaultValue != null) {
         return defaultValue;
      }
      return 0;
   }

   /**
    * 计算一个整数的字节宽。
    *
    * @param value 整数
    * @return 字节宽
    */
   public static strideByte(value: number): number {
      if (value > 4294967295) {
         return 8;
      } else if (value > 65535) {
         return 4;
      } else if (value > 255) {
         return 2;
      } else {
         return 1;
      }
   }

   /**
    * 计算一个整数的位宽。
    *
    * @param value 整数
    * @return 位宽
    */
   public static strideBit(value: number): number {
      if (value > 4294967295) {
         return 64;
      } else if (value > 65535) {
         return 32;
      } else if (value > 255) {
         return 16;
      } else {
         return 8;
      }
   }

   /**
    * 计算最接近2的指数的数字。
    *
    * @param value 数字
    * @return 数字
    */
   public static pow2(value: number): number {
      if (value > 4096) {
         return 8192;
      } else if (value > 2048) {
         return 4096;
      } else if (value > 1024) {
         return 2048;
      } else if (value > 512) {
         return 1024;
      } else if (value > 256) {
         return 512;
      } else if (value > 128) {
         return 256;
      } else if (value > 64) {
         return 128;
      } else if (value > 32) {
         return 64;
      } else if (value > 16) {
         return 32;
      } else if (value > 8) {
         return 16;
      } else if (value > 4) {
         return 8;
      } else if (value > 2) {
         return 4;
      } else if (value > 1) {
         return 2;
      }
      return 1;
   }

   /**
    * 将传入值转换为整型值。
    *
    * @param value 待转换的字符串
    * @param defaultValue 默认值
    * @return 转换后的整型值
    */
   public static parse(value: string, defaultValue: number = 0): number {
      // 设置默认值
      if (defaultValue == null) {
         defaultValue = 0;
      }
      // 判断内容为空
      if (value == null) {
         return defaultValue;
      }
      if (value == '') {
         return defaultValue;
      }
      // 去掉两边不可见字符
      value = StringUtil.trim(value.toString());
      // 去掉左边0字符
      while (true) {
         if (value.charAt(0) != '0') {
            break;
         }
         value = value.substr(1);
      }
      // 变换类型
      var r = (value.length > 0) ? parseInt(value) : defaultValue;
      return isNaN(r) ? defaultValue : r;
   }

   /**
    * 格式化数字。
    *
    * @param value 数字
    * @param length 格式化长度
    * @param pad 补足字符串
    * @return 格式化内容
    */
   public static format(value: number, length: number, pad: string = IntegerUtil.LEFT_CHAR): string {
      var source = value.toString();
      var count = length - source.length;
      for (var i = 0; i < count; i++) {
         source = pad + source;
      }
      return source;
   }

   /**
    * 格式化内存大小。
    *
    * @param value 数字
    * @return 格式化内容
    */
   public static formatMemory(value: number): string {
      var b = parseInt(value as any) % 1024;
      var k = parseInt((value / 1024) as any) % 1024;
      var m = parseInt((value / 1024 / 1024) as any) % 1024;
      var g = parseInt((value / 1024 / 1024 / 1024) as any) % 1024;
      var result = '';
      if (g > 0) {
         result += g + 'g';
      }
      if (m > 0) {
         result += m + 'm';
      }
      if (k > 0) {
         result += k + 'k';
      }
      if (b > 0) {
         result += b + 'b';
      }
      return result;
   }

   /**
    * 把整数转化为字符串。
    *
    * @param value 数字
    * @return 字符串
    */
   public static toString(value: any): string {
      return (value == null) ? '0' : value.toString();
   }

   // /**
   //  * 返回范围内的数字化。
   //  *
   //  * @param value 数字
   //  * @param min 最小数字
   //  * @param max 最大数字
   //  * @return 数字
   //  */
   // public static toRange(value: number, min: number, max: number): number {
   //    if (value == null) {
   //       value = 0;
   //    }
   //    if (isNaN(value)) {
   //       value = 0;
   //    }
   //    if (value < min) {
   //       value = min;
   //    }
   //    if (value > max) {
   //       value = max;
   //    }
   //    return value;
   // }

   // /**
   //  * 计算参数集合的和。
   //  *
   //  * @param arguments 参数集合
   //  * @return 合计数字
   //  */
   // public static sum(): number {
   //    var r = 0;
   //    var a = arguments;
   //    var c = a.length;
   //    for (var n = 0; n < c; n++) {
   //       if (a[n] != null) {
   //          r += parseInt(a[n]);
   //       }
   //    }
   //    return r;
   // }

   // /**
   //  * 把两个字符串进行算术运算。
   //  *
   //  * @param method 方法
   //  * @param value1 内容1
   //  * @param value1 内容2
   //  * @return 计算内容
   //  */
   // public static calculate(method: string, value1: string, value2: string) {
   //    var data1 = this.parse(value1);
   //    var data2 = this.parse(value2);
   //    var result = 0;
   //    if (method == '+') {
   //       result = data1 + data2;
   //    } else if (method == '-') {
   //       result = data1 - data2;
   //    } else if (method == 'x') {
   //       result = data1 * data2;
   //    } else if (method == '/') {
   //       result = data1 / data2;
   //    }
   //    return result.toString();
   // }

   // /**
   //  * 复制整数数组。
   //  *
   //  * @param outputData 输出数据
   //  * @param outputIndex 输出位置
   //  * @param inputData 输入数据
   //  * @param inputIndex 输入位置
   //  * @param count 总数
   //  */
   // public static copy(outputData: Array<number>, outputIndex: number, inputData: Array<number>, inputIndex: number, count: number) {
   //    for (var i = 0; i < count; i++) {
   //       outputData[outputIndex++] = inputData[inputIndex++];
   //    }
   // }
}
