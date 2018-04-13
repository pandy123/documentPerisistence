import { DataNode } from './DataNode';
import { PointNode } from './PointNode';
import { DataTypeEnum } from './DataTypeEnum';
import { ObjectIdConverter } from '../persistent/converter/ObjectIdConverter';
import { Persistent } from '../persistent/Persistent';
import { Field } from '../decorator/Field';
import { RotationNode } from './RotationNode';
import { ObjectConverter } from '../persistent/converter/ObjectConverter';


/**
 * 材质节点集合。
 */
export type WallNodeMap = {
   [key: string]: WallNode
}
/**
 * 墙体节点。
 */
export class WallNode extends DataNode {
   /** 类名称 */
   public static CLASS_NAME = "FloorplanNodeEnum.Wall";

   /** 开始点实体 */
   @Field('from', DataTypeEnum.Object, PointNode)
   @Persistent(ObjectIdConverter)
   public from: PointNode;
   /** 结束点实体 */
   @Field('to', DataTypeEnum.Object, PointNode)
   @Persistent(ObjectIdConverter)
   public to: PointNode;

   /** 结束点实体 */
   @Field('ratation', DataTypeEnum.Object, RotationNode)
   @Persistent(ObjectConverter)
   public ratation: RotationNode

   /**
    * 构造处理。
    *
    * @param from 起点
    * @param to 终点
    */
   public constructor() {
      super();
      this.ratation = new RotationNode();
   }
}
