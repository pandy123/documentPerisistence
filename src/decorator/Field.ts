import { ClassUtil } from './ClassUtil';
import { FieldAnnotation } from './FieldAnnotation';
import { DataTypeEnum } from '../model/DataTypeEnum';


export function Field(
   dataName?: String,
   dataCd: DataTypeEnum = DataTypeEnum.Object,
   dataClass?: any,
   dataDefault: any = null) {
   return function (target: any, name: string): void {
      // 注册描述器
      var annotation = new FieldAnnotation(name, dataName, dataCd, dataClass, dataDefault);
      ClassUtil.registerAnnotation(target.constructor, annotation);
   }
}


export function FieldArray(
   dataName?: String,
   dataCd: DataTypeEnum = DataTypeEnum.Object,
   dataContainerClass?: any,
   dataClass?: any,
   dataDefault: any = null) {
   return function (target: any, name: string): void {
      // 注册描述器
      var annotation = new FieldAnnotation(name, dataName, dataCd, dataClass, dataDefault);
      annotation.dataContainerClass = dataContainerClass;
      ClassUtil.registerAnnotation(target.constructor, annotation);
   }
}
