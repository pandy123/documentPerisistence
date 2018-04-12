/**
 * 数据节点标志枚举。
 */
export class DataNodeFlagEnum {
   /** 有效 */
   public static Validation = 0x0001;
   /** 可编辑 */
   public static Editable = 0x0002;
   /** 编辑中 */
   public static Editing = 0x0004;
   /** 可选中 */
   public static Selectable = 0x0008;
   /** 选中 */
   public static Selected = 0x0010;
   /** 隐藏 */
   public static Hidden = 0x0020;
   /** 移除 */
   public static Removed = 0x0040;
   /** 条件 */
   public static Condition = 0x0080;
   /** 锁定 */
   public static Freezed = 0x0100;
   /** 透明 */
   public static Transparent = 0x0200;
   /** 热点 */
   public static Hover = 0x0400;
   /** 准备好 */
   public static Ready = 0x0800;
   /** 标注 */
   public static Dimension = 0x1000;
   /** 拖拽 */
   public static Dragging = 0x2000;
}
/**
 * 数据节点变更枚举。
 */
export class DataNodeChangedEnum {
   /** 形状 */
   public static Shape = 0x0001;
   /** 空间 */
   public static Transform = 0x0002;
   /** 材质 */
   public static Material = 0x0004;
}
