import { Annotation } from './Annotation';
import { AnnotationEnum } from './AnnotationEnum';


export class LoggerAnnotation extends Annotation {
   /** 个数 */
   protected _count: number;
   /** 成功个数 */
   protected _successCount: number;
   /** 回调处理 */
   protected _callback: Function;

   /**
    * 构造处理。
    *
    * @param name 名称
    */
   public constructor(name: string, callback: Function) {
      super(name);
      // 设置选项
      this._count = 0;
      this._successCount = 0;
      this._annotationCd = AnnotationEnum.Logger;
      this._callback = callback;
   }

   /**
    * 调用处理。
    */
   public invoke(instance: any, parameters: Array<any>): void {
      var result: any = null;
      this._count++;
      // 日志前处理
      console.log('Call ' + name + ' being.');
      // 调用处理
      result = this._callback.apply(instance, parameters);
      // 日志后处理
      console.log('Call ' + name + ' end.');
      this._successCount++;
      return result;
   }
}
