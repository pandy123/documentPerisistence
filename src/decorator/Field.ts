import { ClassUtil } from './ClassUtil';
import { FieldAnnotation } from './FieldAnnotation';
import { DataTypeEnum } from '../model/DataTypeEnum';


export function Field(
   dataName?: String,                           // 字段名称
   dataCd: DataTypeEnum = DataTypeEnum.Object,  // 字段类型枚举
   dataClass?: any) {
   return function (target: any, name: string): void {
      // 注册描述器
      var annotation = new FieldAnnotation(name, dataName, dataCd, dataClass);
      ClassUtil.registerAnnotation(target.constructor, annotation);
   }
}
