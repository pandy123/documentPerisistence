import { DataNode } from './DataNode';
import { FloatConverter } from './../persistent/converter/FloatConverter';

import { DataTypeEnum } from './DataTypeEnum';
import { Property } from '../decorator/Property';
import { Field } from '../decorator/Field';
import { Persistent } from '../persistent/Persistent';
import { ObjectIdConverter } from '../persistent/converter/ObjectIdConverter';

/**
 * 点节点。
 * 父对象是墙对象。
 * 记录关联点。
 */
export class RotationNode extends DataNode {
   /** 类名称 */
   public static CLASS_NAME = 'FloorplanNodeEnum.Rotation';

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
