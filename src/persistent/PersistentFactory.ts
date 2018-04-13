import { ObjectConverter } from './converter/ObjectConverter';
import { Converter } from './Converter';
import { PersistentAnnotation } from './PersistentAnnotation';
import { PersistentClassAnnotation } from './PersistentClassAnnotation';
import { PersistentContext } from './PersistentContext';
import { ClassFactory } from '../decorator/ClassFactory';
import { Types } from '../langauage/Types';
import { TypeMap } from '../langauage/TypeMap';
import { ClassUtil } from '../decorator/ClassUtil';
import { AnnotationEnum } from '../decorator/AnnotationEnum';
import { AssertUtil } from '../util/AssertUtil';
import { FieldAnnotation } from '../decorator/FieldAnnotation';
import { DataTypeEnum } from '../model/DataTypeEnum';
import { ObjectIdConverter } from './converter/ObjectIdConverter';
import { ArrayIdConverter } from './converter/ArrayIdConverter';
import { ArrayIdGuidConverter } from './converter/ArrayIdGuidConverter';


/**
 * 持久化工厂。
 */
export class PersistentFactory {
   /** 当前版本 */
   public version: number;
   /** 字段类名 */
   public fieldClassName: string;
   /** 字段版本 */
   public fieldVersion: string;
   /** 字段存储编号 */
   public fieldStorageIdentity: string;
   /** 类工厂 */
   public classFactory: ClassFactory;
   /** 持久化环境 */
   public context: PersistentContext;

   /**
    * 构造处理。
    */
   public constructor(context: PersistentContext) {
      // 设置属性
      this.fieldClassName = 'class';
      this.fieldVersion = 'version';
      this.fieldStorageIdentity = 'guid';
      this.version = 1;
      this.classFactory = new ClassFactory();
   }

   /**
    * 注册类对象。
    *
    * @param clazz 类对象
    * @param className 类名称
    */
   public registerClass(type: any, className?: string) {
      var factory = this.classFactory;
      // 获得描述器
      var clazz = ClassUtil.get(type);
      if (className) {
         factory.register(className, type);
      } else {
         factory.register(type.CLASS_NAME, type);
      }
   }

   /**
    * 根据实例查找类名称。
    *
    * @param instance 实例
    * @return 类名称
    */
   public findClassName(instance: any): string {
      var factory = this.classFactory;
      var type = factory.find(instance);
      var name = factory.findName(type);
      return name as any;
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public findPeistenceAnnotations(instance: any): Types<PersistentAnnotation> {
      var clazz = instance.constructor;
      // 根据描述器存储内容
      var annotations = new Types<PersistentAnnotation>();
      var instanceClass = ClassUtil.get(instance.constructor);
      var fieldAnnotations = instanceClass.findAnnotations(AnnotationEnum.Field);
      var persistenceAnnotations = instanceClass.findAnnotations(AnnotationEnum.Persistent);
      if (persistenceAnnotations) {
         var count = persistenceAnnotations.count;
         for (var i = 0; i < count; i++) {
            var persistenceAnnotation = persistenceAnnotations.at(i) as PersistentAnnotation;
            annotations.push(persistenceAnnotation);
         }
      }
      annotations.sort(PersistentAnnotation.prioritySorter);
      return annotations;
   }

   /**
    * 根据类名创建实例。
    *
    * @param className 类名称
    * @return 实例
    */
   public createInstance(className: string, ): any {
      // 收集环境
      var instance = this.classFactory.create(className);
      return instance;
   }

   /**
   * 存储设置信息。
   *
   * @param item 对象
   * @param config 设置对象
   */
   public saveInstance(item: any, config?: any): any {
      var config = config || new Object();
      var className = this.findClassName(item);

      config[this.fieldClassName] = className;
      config[this.fieldStorageIdentity] = item[this.fieldStorageIdentity];
      config[this.fieldVersion] = this.version;
      config[className] = new Object();

      var itemConfig = config[className]
      var annotations = this.findPeistenceAnnotations(item);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.get(i);
            var dataConverter = annotation.dataConverter as any;
            var converter = new dataConverter();
            converter.save(this, this.context, item, itemConfig, annotation);
         }
      }
      return config;
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param configs 设置对象
    */
   public loadArray(context: PersistentContext, datas: any, configs: Array<any>): any {
      var items = datas || new Object();
      // 加载集合信息
      var fieldClassName = this.fieldClassName;
      var fieldStorageIdentity = this.fieldStorageIdentity;
      var count = configs.length as number;
      for (var i = 0; i < count; i++) {
         var itemConfig = configs[i];
         // 创建实体
         var node = this.createInstance(itemConfig[this.fieldClassName]);
         if (node) {
            var identity = itemConfig[fieldStorageIdentity];
            node[fieldStorageIdentity] = identity;
            context.set(identity, node);
            items[identity] = node;
         }
      }
      // 加载实体信息
      for (var i = 0; i < count; i++) {
         var itemConfig = configs[i];
         var identity = itemConfig[fieldStorageIdentity];
         var node = items[identity];
         if (node) {
            this.loadInstance(context, node, itemConfig);
         }
      }
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public loadInstance(context: PersistentContext, item: any, config: any): any {
      // 加载集合信息
      var className = this.findClassName(item);
      var itemConfig = config[className];
      var annotations = this.findPeistenceAnnotations(item);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.get(i);
            if (itemConfig[annotation.dataName]) {
               var dataConverter = annotation.dataConverter as any;
               var converter = new dataConverter();
               converter.load(this, context, item, itemConfig, annotation);
            }
         }
      }
   }
}
