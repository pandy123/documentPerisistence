import { ObjectIdConverter } from './../persistent/converter/ObjectIdConverter';
import { DataTypeEnum } from './DataTypeEnum';
import { RuntimeUtil } from './../util/RuntimeUtil';
import { DataDocument } from '../document/DataDocument';
import { Field } from '../decorator/Field';
import { Persistent } from '../persistent/Persistent';
import { Property } from '../decorator/Property';
import { NodeObjectCollection } from './NodeObjectCollection';
import { PersistentAccessEnum } from '../persistent/PersistentAccessEnum';
import { IntegerConverter } from '../persistent/converter/IntegerConverter';
import { ArrayIdConverter } from '../persistent/converter/ArrayIdConverter';

/*
 * 数据节点集合。
 */

/*
 * 数据节点基类。
 */
export class DataNode {
   /** 编号计数器 */
   private static IdCounter: number = 0;
   /** 父节点 */
   public document: DataDocument;
   /** 父节点 */
   @Field('parent', DataTypeEnum.Object, Node, null)
   @Persistent(ObjectIdConverter)
   public parent: DataNode;
   /** 子集合 */
   @Field('children', DataTypeEnum.Object, NodeObjectCollection, null)
   @Persistent(ArrayIdConverter, 9999)
   public childNodes: Array<Node>;
   /** 标志集合 */
   public flags: number;
   /** 版本 */
   @Field('version', DataTypeEnum.Int32, Number, 0)
   @Persistent()
   @Persistent(new IntegerConverter(PersistentAccessEnum.Getter))
   public version: number

   /** 编号 */
   public id: number;
   /** 唯一编号 */
   @Field('guid', DataTypeEnum.String, String, null)
   @Property()
   @Persistent()
   public guid: string;

   /**
    * 构造处理。
    */
   public constructor() {
      this.id = ++DataNode.IdCounter;
      this.guid = RuntimeUtil.makeUuid();
   }


}
