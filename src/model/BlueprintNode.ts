import { DataNode } from './DataNode';
import { Field } from '../decorator/Field';
import { Property } from '../decorator/Property';
import { Persistent } from '../persistent/Persistent';
import { DataTypeEnum } from './DataTypeEnum';
import { ObjectIdConverter } from '../persistent/converter/ObjectIdConverter';
import { FloorplanNode } from './FloorplanNode';

/**
 * 蓝图节点。
 */
export class BlueprintNode extends DataNode {
   /** 类名称 */
   public static CLASS_NAME = "DataNodeEnum.Blueprint";

   /** 激活户型实体 */
   @Field('active_floorplan', DataTypeEnum.Object, FloorplanNode)
   @Property()
   @Persistent(ObjectIdConverter)
   public activeFloorplan: FloorplanNode;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
   }
}
