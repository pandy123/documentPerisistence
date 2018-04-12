import { PersistentClassAnnotation } from './PersistentClassAnnotation';
import { ClassUtil } from '../decorator/ClassUtil';


export function PersistentClass(
   dataName: string,
   serialize: boolean = true) {
   return function (type: any): void {
      // 注册描述器
      var annotation = new PersistentClassAnnotation(dataName, serialize);
      ClassUtil.registerAnnotation(type, annotation as any);
   }
}
