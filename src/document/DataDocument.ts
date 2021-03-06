import { PersistentContext } from './../persistent/PersistentContext';
import { DataNode } from './../model/DataNode';
import { DataDocumentMeta } from './DataDocumentMeta';
import { PersistentFactory } from '../persistent/PersistentFactory';
import { BlueprintNode } from '../model/BlueprintNode';
import { WallNode } from '../model/WallNode';
import { PointNode } from '../model/PointNode';
import { RotationNode } from '../model/RotationNode';

/**
 * 数据文档。
 */
// document中创建的所有对象都会被持久化，反持久化时也会被反回来
export class DataDocument {
   /** 描述信息 */
   public meta: DataDocumentMeta;
   /** 内容节点集合 */
   public contents: any;
   /** 蓝图节点 */
   public blueprint: BlueprintNode;
   /*** 持久化工厂 */
   public factory: PersistentFactory;
   /*** 持久化环境 */
   public context: PersistentContext;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.meta = new DataDocumentMeta();
      this.contents = new Object();
      this.context = new PersistentContext();
      this.factory = new PersistentFactory(this.context);
      this.factory.registerClass(BlueprintNode);
      this.factory.registerClass(WallNode);
      this.factory.registerClass(PointNode);
      this.factory.registerClass(RotationNode);
      this.blueprint = this.createContent(BlueprintNode);
   }

   /** 
    * 创建内容节点，放在内容列表中。
    *
    * @param clazz 类
    * @param setuped 配置
    * @return 内容节点
    */
   public createContent(clazz: any): any {
      var content = this.factory.createInstance(clazz.CLASS_NAME) as DataNode;
      content.document = this;
      var contents = this.contents;
      contents[content.guid] = content;
      return content;
   }

   /** 
    * 移除内容节点。
    *
    * @param content 节点
    */
   public removeContent(content: DataNode) {
      var contents = this.contents;
      delete contents[content.guid];
   }

   /**
    * 加载JSON信息处理。
    *
    * @param jconfig 信息
    * @param options 配置
    */
   public loadJson(jconfig: any) {
      var factory = this.factory;
      // 加载信息
      var jmeta = jconfig.meta;
      this.meta.loadJson(jmeta);
      // 加载产品信息
      var factory = this.factory;
      // 创建环境
      this.context.instances = new Object();
      var context = this.context;
      // 加载实体集合
      var jcontents = jconfig.contents;
      if (jcontents) {
         var contents = this.contents = new Object() as any;
         factory.loadArray(context, contents, jcontents);
         this.blueprint = contents[jconfig.blueprint_guid] as BlueprintNode;
      }
   }

   /**
   * 保存配置数据处理。
   *
   * @return 数据
   */
   public saveJson(saveContext?: any): any {
      var factory = this.factory;
      var context = new PersistentContext();
      // 保存元信息
      var jconfig = new Object() as any;
      var jmeta = jconfig.meta = new Object() as any;
      this.meta.saveJson(jmeta);

      var contents = this.contents;
      var jcontents = jconfig.contents = new Array<any>();
      for (var guid in contents) {
         var content = contents[guid];
         var jcontent = factory.saveInstance(content);
         jcontents.push(jcontent);
      }
      var blueprint = this.blueprint;
      jconfig.blueprint_guid = blueprint.guid;

      return jconfig;
   }
}
