import { AssertUtil } from "../util/AssertUtil";


export class BooleanUtil {

   /**
    * 获得非空值。
    *
    * @param value 值
    * @param defaultValue 默认值
    * @return 非空值
    */
   public static nvl(value: any, defaultValue: any): boolean {
      var result = false;
      if (value == null) {
         result = defaultValue;
      } else {
         result = value;
      }
      return result ? true : false;
   }

   /**
    * 把布尔值转化为字符串。
    *
    * @param value 布尔值
    * @return 字符串
    */
   public static format(value: boolean): any {
      //return value ? BooleanEnum.True : BooleanEnum.False;
   }

   /**
    * 解析字符串为布尔值。
    *
    * @param value 内容
    * @param defaultValue 默认值
    * @return 布尔值
    */
   public static parse(value: any, defaultValue?: boolean): boolean {
      if (value != null) {
         if (value.constructor == Boolean) {
            return value;
         } else if (value.constructor == Number) {
            return value > 0;
         } else if (value.constructor == String) {
            if (value == '1') {
               return true;
            }
            if (value == 'Y' || value == 'yes') {
               return true;
            }
            if (value == 'T' || value == 'true') {
               return true;
            }
            return false;
         } else {
            // AssertUtil.unimplemented(this);
         }
      }
      return defaultValue;
   }

   /**
    * 把布尔值转化为字符串。
    *
    * @param value 布尔值
    * @param valueTrue 真字符串
    * @param valueFalse 假字符串
    * @return 字符串
    */
   // public static toString(value: any, valueTrue: string = BooleanEnum.True, valueFalse: string = BooleanEnum.False): string {
   //    return value ? valueTrue : valueFalse;
   // }
}

/**
 * 布尔集合。
 */
export type BooleanMap = {
   [key: string]: boolean
};
