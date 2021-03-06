import { DataNode } from './DataNode';
import { FloatConverter } from './../persistent/converter/FloatConverter';

import { WallNode } from './WallNode';
import { DataTypeEnum } from './DataTypeEnum';
import { Property } from '../decorator/Property';
import { Field } from '../decorator/Field';
import { Persistent } from '../persistent/Persistent';
import { ObjectIdConverter } from '../persistent/converter/ObjectIdConverter';

/**
 * 材质节点集合。
 */
export type PointNodeMap = {
   [key: string]: PointNode
}
/**
 * 点节点。
 * 父对象是墙对象。
 * 记录关联点。
 */
export class PointNode extends DataNode {
   /** 类名称 */
   public static CLASS_NAME = 'FloorplanNodeEnum.Point';
   /** 墙体关联 */
   @Field('parent', DataTypeEnum.Object, WallNode)
   @Property()
   @Persistent(ObjectIdConverter)
   public parent: WallNode;

   @Field('x', DataTypeEnum.Float32, Number)
   @Property()
   @Persistent(FloatConverter)
   public x: number;

   @Field('y', DataTypeEnum.Float32, Number)
   @Property()
   @Persistent(FloatConverter)
   public y: number;

   @Field('z', DataTypeEnum.Float32, Number)
   @Property()
   @Persistent(FloatConverter)
   public z: number;

   /**
    * 构造处理。
    */
   public constructor(x: number = 0, y: number = 0, z: number = 0) {
      // 设置默认标志
      super();
      this.x = x;
      this.y = y;
      this.z = z;
   }
}
