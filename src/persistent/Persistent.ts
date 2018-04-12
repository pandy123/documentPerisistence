
import { PersistentAnnotation } from './PersistentAnnotation';
import { ClassUtil } from '../decorator/ClassUtil';
import { AnnotationEnum } from '../decorator/AnnotationEnum';
import { AssertUtil } from '../util/AssertUtil';

/**
 * 获得默认持久化描述器。
 * 
 * @param type 类型
 * @param name 名称
 */
function syncAnnotation(type: Function, name: string): PersistentAnnotation {
   var clazz = ClassUtil.get(type);
   var annotation = clazz.findClassAnnotation(AnnotationEnum.Persistent, name) as PersistentAnnotation;
   if (!annotation) {
      annotation = new PersistentAnnotation(name);
      clazz.register(annotation);
   }
   return annotation;
}

/**
 * 持久化描述器。
 * 
 * @param dataConverter 数据转换器
 * @param priority 优先级
 */
export function Persistent(
   dataConverter?: any,
   priority: number = 0) {
   // containerType?: any,
   // invalid: boolean = true) {
   return function (target: any, name: string): void {
      var annotation = syncAnnotation(target.constructor, name);
      if (dataConverter) {
         annotation.dataConverter = dataConverter;
         // annotation.priority = dataConverter.
      }
      // if (containerType) {
      //    annotation.dataContainerClass = containerType;
      // }
      // annotation.invalid = invalid;
      annotation.priority = priority;
   }
}

/**
 * 持久化获得描述器。
 */
export function PersistentGetter(
   dataNames?: Array<string>) {
   return function (target: any, name: string): void {
      var annotation = syncAnnotation(target.constructor, name);
      if (dataNames) {
         AssertUtil.debugArrayNotEmpty(dataNames);
         annotation.dataGetNames = dataNames;
      }
   }
}

/**
 * 持久化设置描述器。
 */
export function PersistentSetter(
   dataNames?: Array<string>) {
   return function (target: any, name: string): void {
      var annotation = syncAnnotation(target.constructor, name);
      if (dataNames) {
         AssertUtil.debugArrayNotEmpty(dataNames);
         annotation.dataSetNames = dataNames;
      }
   }
}
