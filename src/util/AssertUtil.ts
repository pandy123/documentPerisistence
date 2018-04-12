

export class AssertUtil {
   /**
    * 调试开始。
    */
   public static debugBegin() {
   }

   /**
    * 执行内容。
    * Release版本，本行只保留内容，去掉函数外壳。
    *
    * @param value 内容
    */
   public static debug(value: any) {
      return value;
   }

   /**
    * 调试结束。
    */
   public static debugEnd() {
   }

   /**
    * 判断内容是否定义。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugDefine(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value == void 0) {
            throw new Error('Assert null failure.');
         }
      }
   }

   /**
    * 判断内容是否布尔值。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugBoolean(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value !== true && value !== false) {
            throw new Error('Assert boolean failure.');
         }
      }
   }

   /**
    * 判断内容是否为真。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugTrue(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (!value) {
            throw new Error('Assert true failure.');
         }
      }
   }

   /**
    * 判断内容是否为假。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugFalse(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value) {
            throw new Error('Assert false failure.');
         }
      }
   }

   /**
    * 判断内容是否为空。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugNull(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value != null) {
            throw new Error('Assert null failure.');
         }
      }
   }

   /**
    * 判断内容是否为非空。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugNotNull(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value == null) {
            throw new Error('Assert not null failure.');
         }
      }
   }

   /**
    * 判断内容是否为有效数字。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugNumber(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value == null) {
            throw new Error('Assert value is null.');
         }
         if (isNaN(value)) {
            throw new Error('Assert value is nan invalid.');
         }
         if (!isFinite(value)) {
            throw new Error('Assert value is finite invalid.');
         }
      }
   }

   /**
    * 判断内容是否字符串。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugString(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value != null) {
            if (typeof value != 'string') {
               throw new Error('Assert string failure.');
            }
         }
      }
   }

   /**
    * 判断内容是否函数。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugFunction(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value != null) {
            if (typeof value != 'function') {
               throw new Error('Assert function failure.');
            }
         }
      }
   }

   /**
    * 判断内容是否为空。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugEmpty(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if ((value != null) && (value.length != 0)) {
            throw new Error('Assert empty failure.');
         }
      }
   }

   /**
    * 判断内容是否为非空。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugNotEmpty(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value == null) {
            throw new Error('Assert not empty failure, value is null.');
         }
         if (value.length == 0) {
            throw new Error('Assert not empty failure, value length is empty.');
         }
      }
   }

   /**
    * 判断对象是否有效。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugObject(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         var value = arguments[i];
         if (value == null) {
            throw new Error('Assert not null failure.');
         }
         if (value.__dispose) {
            throw new Error('Assert is already disposed.');
         }
      }
   }

   /**
    * 判断对象是否为数组。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugArray(values: Array<any>) {
      if (values == null) {
         throw new Error('Assert array is null.');
      }
      if (!(values instanceof Array)) {
         throw new Error('Assert array type invalid.');
      }
   }

   /**
    * 判断数组是否为非空。
    * Release版本，本行不保留。
    *
    * @param values 内容
    */
   public static debugArrayNotEmpty(values: Array<any>) {
      if (values == null) {
         throw new Error('Assert array not empty failure, value is null.');
      }
      if (values.length == 0) {
         throw new Error('Assert array not empty failure, value length is empty.');
      }
      for (var name in values) {
         if (values[name] == null) {
            throw new Error('Assert array not empty failure, value item is empty.');
         }
      }
   }

   /**
    * 判断实例是否指定类型名称。
    * Release版本，本行不保留。
    *
    * @param instance 实例
    * @param parameters 参数集合
    */
   public static debugType(instance: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      if (instance == null) {
         throw new Error('Instance is null.');
      }
      var typeName = typeof instance;
      var result = false;
      var count = arguments.length;
      for (var i = 1; i < count; i++) {
         var type = arguments[i];
         if (typeName == type) {
            result = true;
            break;
         }
      }
      if (!result) {
         throw new Error('Instance is invalid type.');
      }
   }

   /**
    * 判断实例是否指定类型。
    * Release版本，本行不保留。
    *
    * @param instance 实例
    * @param parameters 参数集合
    */
   public static debugInstance(instance: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      if (instance == null) {
         throw new Error('Instance is null.');
      }
      var result = false;
      var count = arguments.length;
      for (var i = 1; i < count; i++) {
         var type = arguments[i];
         if (instance instanceof type) {
            result = true;
            break;
         }
      }
      if (!result) {
         throw new Error('Instance is invalid type.');
      }
   }

   /**
    * 判断实例是否指定类型。
    * Release版本，本行不保留。
    *
    * @param instance 实例
    * @param parameters 参数集合
    */
   public static debugNvlInstance(instance: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      if (instance) {
         var result = false;
         var count = arguments.length;
         for (var i = 1; i < count; i++) {
            var type = arguments[i];
            if (instance instanceof type) {
               result = true;
               break;
            }
         }
         if (!result) {
            throw new Error('Instance is invalid type.');
         }
      }
   }

   /**
    * 判断实例是否指定枚举类型。
    * Release版本，本行不保留。
    *
    * @param enumClass 枚举类型
    * @param parameters 参数集合
    */
   public static debugEnum(enumClass: any, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any) {
      var result = false;
      var items = enumClass.Description;
      if (items) {
         var itemCount = items.length;
         var count = arguments.length;
         for (var j = 1; j < count; j++) {
            var type = arguments[j];
            var inRage = false;
            for (var i = 0; i < itemCount; i++) {
               var item = items[i];
               if (type == item.value) {
                  inRage = true;
                  break;
               }
            }
            if (!inRage) {
               result = false;
               break;
            }
         }
      }
      if (!result) {
         throw new Error('Enum is invalid.');
      }
   }

   /**
    * 判断实例是否重复。
    * Release版本，本行不保留。
    *
    * @param values 实例集合
    * @param invokeName 调用函数
    */
   public static debugRepeat(values: Array<any>, invokeName: any) {
      var count = values.length;
      var map = new Object() as any
      for (var i = 0; i < count; i++) {
         var value = values[i];
         var identity = value[invokeName]();
         AssertUtil.debugNull(map[identity]);
         map[identity] = value;
      }
      console.log(map);
   }
}
