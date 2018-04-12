import { StringConverter } from './../persistent/converter/StringConverter';
import { DataTypeEnum } from './DataTypeEnum';
import { Field } from '../decorator/Field';
import { Persistent } from '../persistent/Persistent';
import { Property } from '../decorator/Property';
/*
 * 数据节点集合。
 */

/*
 * 数据节点基类。
 */
export class Node {
   /** 唯一编号 */
   @Field('objectBase', DataTypeEnum.String, String)
   @Property()
   @Persistent(StringConverter)
   public objectBase: string;

   /**
    * 构造处理。
    */
   public constructor() {
      this.objectBase = "objectBase";

   }
}
