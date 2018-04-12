import { DataNode } from "./DataNode";
import { DataTypeEnum } from "./DataTypeEnum";
import { Field } from "../decorator/Field";
import { Persistent } from "../persistent/Persistent";
import { WallNode, WallNodeMap } from "./WallNode";
import { MapIdConverter } from "../persistent/converter/MapIdConverter";
import { PointNode, PointNodeMap } from "./PointNode";


/**
 * 设计节点。
 */
export class FloorplanNode extends DataNode {
   /** 类名称 */
   public static CLASS_NAME = "FloorplanNodeEnum.Floorplan";

   @Field('walls', DataTypeEnum.Array, WallNode, null)
   @Persistent(MapIdConverter)
   public walls: WallNodeMap;
   /** 房间实体集合 */
   @Field('points', DataTypeEnum.Array, PointNode, null)
   @Persistent(MapIdConverter)
   public points: PointNodeMap;
   /**
    * 构造处理。
    */
   public constructor() {
      super();

      this.walls = new Object() as WallNodeMap;
      this.points = new Object() as PointNodeMap;

   }
}
