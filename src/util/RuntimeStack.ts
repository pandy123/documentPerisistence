
export class RuntimeStack {
   /** 线程名称 */
   public threadName: string;
   /** 类 */
   public className: string;
   /** 函数 */
   public methodName: string;
   /** 代码 */
   public source: string;

   /**
    * 构造处理。
    *
    * @param source 代码
    */
   public constructor(source?: string) {
      if (source != null) {
         this.parse(source);
      }
   }

   /**
    * 解析字符串。
    *
    * @param source 代码
    * @return 解析结果
    */
   public parse(source: string): boolean {
      var find1 = source.indexOf('at ');
      if (find1 != -1) {
         var find2 = source.indexOf(' (', find1);
         if (find2 != -1) {
            var find3 = source.indexOf(')', find2);
            if (find3 != -1) {
               var method = source.substring(find1 + 3, find2);
               var find4 = method.indexOf('.');
               if (find4 != -1) {
                  this.className = method.substring(0, find4);
                  this.methodName = method.substring(find4 + 1);
               } else {
                  this.methodName = method;
               }
               this.source = source.substring(find2 + 2, find3);
               return true;
            }
         }
      }
      return false;
   }

   /**
    * 保存信息为JSON配置。
    *
    * @param jconfig 配置信息
    * @return JSON配置
    */
   public saveJson(jconfig?: any): any {
      var jresult = jconfig || new Object() as any;
      jresult.thread = this.threadName;
      jresult.class = this.className;
      jresult.method = this.methodName;
      jresult.source = this.source;
      return jresult;
   }
}
