import { StringConverter } from './../persistent/converter/StringConverter';
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
import { Node } from './Node';

/*
 * 数据节点集合。
 */

/*
 * 数据节点基类。
 */
export class DataNode extends Node {
   /** 编号计数器 */
   private static IdCounter: number = 0;
   /** 父节点 */
   public document: DataDocument;
   /** 父节点 */
   @Field('parent', DataTypeEnum.Object, DataNode)
   @Persistent(ObjectIdConverter)
   public parent: DataNode;
   /** 子集合 */
   @Field('children', DataTypeEnum.Object, NodeObjectCollection)
   @Persistent(ArrayIdConverter, 9999)
   public childNodes: Array<Node>;
   /** 标志集合 */
   public flags: number;
   /** 版本 */
   @Field('version', DataTypeEnum.Int32, Number)
   @Persistent(IntegerConverter)
   @Persistent(new IntegerConverter(PersistentAccessEnum.Getter))
   public version: number

   /** 编号 */
   public id: number;
   /** 唯一编号 */
   @Field('guid', DataTypeEnum.String, String)
   @Property()
   @Persistent(StringConverter)
   public guid: string;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      this.id = ++DataNode.IdCounter;
      this.guid = RuntimeUtil.makeUuid();
   }

   public addChild(node: DataNode) {
      if (!this.childNodes) {
         this.childNodes = new Array<Node>();
      }
      this.childNodes.push(node);
   }
}
