import { RuntimeUtil } from "../util/RuntimeUtil";
import { Map } from "./Map";
import { StringBuffer } from "./StringBuffer";


export class Dictionary<V> extends Map<string, V> {
   /**
    * 按照名称排序。
    *
    * @param comparer 比较器
    * @param parameters 参数集合
    */
   public sortByName(comparer: Function, parameters?: any) {
      RuntimeUtil.pairSort(this._names, this._values, 0, this._count, comparer, parameters);
      this.rebuild();
   }

   /**
    * 将内部所有名称关联成一个字符串。
    *
    * @param split 分隔符
    * @return 字符串
    */
   public joinName(split: any) {
      var source = new StringBuffer();
      var count = this._count;
      for (var i: number = 0; i < count; i++) {
         if (i > 0) {
            source.append(split);
         }
         source.append(this._names[i]);
      }
      return source.flush();
   }

   /**
    * 获得数组的内部信息。
    *
    * @return 字符串
    */
   public dump(): string {
      var result = new StringBuffer();
      var count = this._count;
      result.append(RuntimeUtil.className(this), ': ', count);
      if (count > 0) {
         var names = this._names;
         var values = this._values;
         result.append(' {\n');
         for (var i = 0; i < count; i++) {
            result.append('   ', names[i], '=[', values[i], ']\n');
         }
         result.append('}');
      }
      return result.flush();
   }
}
