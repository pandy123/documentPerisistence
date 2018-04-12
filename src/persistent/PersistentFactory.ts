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
   /** 合并标志 */
   public optionMerge: boolean;
   /** 更新标志 */
   public optionUpdated: boolean;
   /** 字段类名 */
   public fieldClassName: string;
   /** 字段版本 */
   public fieldVersion: string;
   /** 字段编号 */
   public fieldIdentity: string;
   /** 字段存储编号 */
   public fieldStorageIdentity: string;
   /** 类工厂 */
   public factory: ClassFactory;
   /** 持久器 */
   public persistent: Converter;
   /** 描述器集合 */
   public annotationss: TypeMap<Function, Types<PersistentAnnotation>>;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.fieldClassName = 'class';
      this.fieldVersion = 'version';
      this.fieldIdentity = 'id';
      this.fieldStorageIdentity = 'guid';
      this.version = 1;
      this.factory = new ClassFactory();
      this.annotationss = new TypeMap<Function, Types<PersistentAnnotation>>();
   }


   /**
    * 注册类对象。
    *
    * @param clazz 类对象
    * @param className 类名称
    */
   public registerClass(type: any, className?: string) {
      var factory = this.factory;
      // 获得描述器
      var clazz = ClassUtil.get(type);
      if (className) {
         factory.register(className, type);
      } else if (type.CLASS_NAME) {
         factory.register(type.CLASS_NAME, type);
      } else {
         var annotation = clazz.getAnnotation(AnnotationEnum.PersistentClass) as PersistentClassAnnotation;
         factory.register(annotation.dataName, type);
      }
   }

   /**
    * 根据实例查找类名称。
    *
    * @param instance 实例
    * @return 类名称
    */
   public findClassName(instance: any): string {
      var factory = this.factory;
      // 获得类型
      var type = factory.find(instance);
      if (type) {
         // 获得描述器
         var name = factory.findName(type);
         if (!name) {
            var clazz = ClassUtil.get(type);
            AssertUtil.debugNotNull(clazz);
            var annotation = clazz.getAnnotation(AnnotationEnum.PersistentClass) as PersistentClassAnnotation;
            name = annotation.dataName;
         }
         return name;
      } else {
         // LoggerUtil.warn(this, 'Unknown factory class. (instance={1})', instance);
      }
      return null as any;
   }

   /**
    * 根据类名创建实例。
    *
    * @param className 类名称
    * @return 实例
    */
   public hasRegister(className: string): any {
      // 创建对象
      var result = this.factory.hasRegister(className);
      return result;
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public findAnnotations(instance: any): Types<PersistentAnnotation> {
      var clazz = instance.constructor;
      // 查找描述器集合
      var annotationss = this.annotationss;
      var annotations = annotationss.get(clazz);
      if (annotations) {
         return annotations;
      }
      // 根据描述器存储内容
      var map = new Object() as any;
      var instanceClass = ClassUtil.get(instance.constructor);
      var fieldAnnotations = instanceClass.findAnnotations(AnnotationEnum.Field);
      var persistenceAnnotations = instanceClass.findAnnotations(AnnotationEnum.Persistent);
      if (persistenceAnnotations) {
         var count = persistenceAnnotations.count;
         for (var i = 0; i < count; i++) {
            var annotation = new PersistentAnnotation();
            // 存储属性
            var persistenceAnnotation = persistenceAnnotations.at(i) as PersistentAnnotation;
            var code = persistenceAnnotation.code;
            annotation.assign(persistenceAnnotation);
            // 查找属性定义
            if (fieldAnnotations) {
               var fieldAnnotation = fieldAnnotations.get(code) as FieldAnnotation;
               if (fieldAnnotation) {
                  // 设置属性信息
                  if (!annotation.dataName) {
                     annotation.dataName = fieldAnnotation.dataName;
                  }
                  if (!annotation.dataCd) {
                     annotation.dataCd = fieldAnnotation.dataCd;
                  }
                  if (!annotation.dataContainerClass) {
                     annotation.dataContainerClass = fieldAnnotation.dataContainerClass;
                  }
                  if (!annotation.dataClass) {
                     annotation.dataClass = fieldAnnotation.dataClass;
                  }
                  if (!annotation.dataDefault) {
                     annotation.dataDefault = fieldAnnotation.dataDefault;
                  }
               }
            }
            // 设置转换器
            var dataConverter = annotation.dataConverter;
            if (dataConverter) {
               if (!ClassUtil.isFunction(annotation.dataConverter)) {
                  annotation.converter = dataConverter as Converter;
               }
            }
            // if (!annotation.converter) {
            //    annotation.converter = service.getConverter(annotation.dataCd, dataConverter as Function);
            // }
            AssertUtil.debugNotNull(annotation.converter);
            // 存储描述器
            map[code] = annotation;
         }
      }
      var annotations = new Types<PersistentAnnotation>();
      for (var code in map) {
         annotations.push(map[code]);
      }
      annotations.sort(PersistentAnnotation.prioritySorter);
      // 存储描述器集合
      annotationss.set(clazz, annotations);
      return annotations;
   }

   /**
    * 根据类名创建实例。
    *
    * @param className 类名称
    * @return 实例
    */
   public createInstance(className: string, context?: PersistentContext, config?: any): any {
      // 收集环境
      var persistentContext = context;
      if (!context) {
         persistentContext = new PersistentContext();
      }
      // 创建对象
      var instance = this.factory.create(className);
      if (instance) {
         // 加载配置
         if (config) {
            //this.load(persistentContext, instance, config);
         }
      }

      return instance;
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public create(context: PersistentContext, config: any): any {
      // 检查参数
      if (!config) {
         return null;
      }
      // 收集环境
      var persistentContext = context;
      if (!context) {
         persistentContext = new PersistentContext() as PersistentContext;
      }
      // 数组处理
      var result = null;
      if (Array.isArray(config)) {
         // 创建数组
         var instances = new Object();
         var count = config.length;
         for (var i = 0; i < count; i++) {
            var configItem = config[i];
            // 创建实例
            var className = configItem[this.fieldClassName];
            var storageIdentity = configItem[this.fieldStorageIdentity];
            var instance = this.createInstance(className, persistentContext);
            if (instance != null) {
               // this.persistent.load(this, persistentContext, instance, configItem);
               // AssertUtil.debugNotEmpty(storageIdentity);
               // instances[storageIdentity] = instance;
            }
         }
         result = instances;
      } else {
         //先判断是否存在，不存在则创建
         var guid = config[this.fieldStorageIdentity];
         var instance = persistentContext.find(guid);
         if (instance == null) {
            // 创建实例
            var className = config[this.fieldClassName];
            instance = this.createInstance(className, persistentContext);
            if (instance != null) {
               // this.persistent.load(this, persistentContext, instance, config);
            }
         }
         result = instance;
      }
      return result;
   }





   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param configs 设置对象
    */
   public loadArray(context: PersistentContext, datas: any, configs: Array<any>): any {
      var optionGuid = context.optionGuid;
      var items = datas || new Object();
      // 加载集合信息
      var fieldClassName = this.fieldClassName;
      var fieldStorageIdentity = this.fieldStorageIdentity;
      var count = configs.length as number;
      for (var i = 0; i < count; i++) {
         var itemConfig = configs[i];
         var className = itemConfig[fieldClassName];
         var identity = itemConfig[fieldStorageIdentity];
         // 创建实体
         var newItem = this.createInstance(className);
         if (newItem) {
            if (fieldStorageIdentity) {
               var storageId = itemConfig[fieldStorageIdentity];
               if (!optionGuid) {
                  newItem[fieldStorageIdentity] = storageId;
               }
            }
            context.set(identity, newItem);
            items[identity] = newItem;
         }
      }
      // 加载实体信息
      for (var i = 0; i < count; i++) {
         var itemConfig = configs[i];
         var identity = itemConfig[fieldStorageIdentity];
         var newItem = items[identity];
         if (newItem) {
            this.loadInstance(context, newItem, itemConfig);
         }
      }
      // 更新实体信息
      for (var i = 0; i < count; i++) {
         var itemConfig = configs[i];
         var identity = itemConfig[fieldStorageIdentity];
         var newItem = items[identity];
         if (newItem) {
            if (newItem.updateConfig) {
               newItem.updateConfig();
            }
         }
      }
   }

   /**
    * 合并设置信息。
    *
    * @param context 对象
    * @param item 对象
    * @param jconfig 配置
    */
   public merge(context: PersistentContext, item: any, config: any): any {
      this.optionMerge = true;
      this.load(context, this, config);
      this.optionMerge = false;
   }


   /**
   * 存储设置信息。
   *
   * @param item 对象
   * @param config 设置对象
   */
   protected innerFilter(items: Array<any>, item: any, converter?: any) {
      // 检查当前对象
      if (item == null) {
         return;
      }
      if (items.indexOf(item) != -1) {
         return;
      }
      // 增加对象
      if (converter) {
         converter.filter(items, item);
      } else {
         items.push(item);
      }
      // 获得描述
      var annotations = this.findAnnotations(item);
      if (annotations) {
         var count = annotations.count;
         for (var i = 0; i < count; i++) {
            var annotation = annotations.get(i);
            // 检查有效性
            if (!annotation.invalid) {
               continue;
            }
            var dataCd = annotation.dataCd;
            var dataConverter = annotation.dataConverter as any;
            if (dataCd == DataTypeEnum.Object) {
               // 查找对象集合
               if (dataConverter == ObjectIdConverter) {
                  var child = item[annotation.name];
                  if (child) {
                     this.innerFilter(items, child, annotation.converter);
                  }
               }
            } else if (dataCd == DataTypeEnum.Array) {
               // 查找数组集合
               var children = item[annotation.name];
               if ((dataConverter == ArrayIdConverter) || (dataConverter == ArrayIdGuidConverter)) {
                  if (children) {
                     for (var code in children) {
                        var child = children[code];
                        this.innerFilter(items, child, annotation.converter);
                     }
                  }
               }
            } else if (dataCd == DataTypeEnum.Map) {
               // 查找表集合
               var children = item[annotation.name];
               if (children) {
                  for (var code in children) {
                     var child = children[code];
                     this.innerFilter(items, child, annotation.converter);
                  }
               }
            }
         }
      }
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public load(context: PersistentContext, item: any, config: any): any {
      AssertUtil.debugNotNull(config);
      var optionGuid = context.optionGuid;
      // 加载信息
      if (item && !Array.isArray(item)) {
         // this.persistent.load(this, context, item, config);
      }
      // 加载集合信息
      var fieldClassName = this.fieldClassName;
      var fieldStorageIdentity = this.fieldStorageIdentity;
      var newItems = new Object() as any;
      if (Array.isArray(config)) {
         var count = config.length as number;
         for (var i = 0; i < count; i++) {
            var itemConfig = config[i];
            var className = itemConfig[fieldClassName];
            AssertUtil.debugNotNull(className);
            var identity = itemConfig[fieldStorageIdentity];
            AssertUtil.debugNotNull(identity);
            // 创建实体
            var newItem = this.createInstance(className);
            if (newItem) {
               if (fieldStorageIdentity) {
                  var storageId = itemConfig[fieldStorageIdentity];
                  AssertUtil.debugNotEmpty(storageId);
                  if (!optionGuid) {
                     newItem[fieldStorageIdentity] = storageId;
                  }
               }
            }
            context.set(identity, newItem);
            newItems[identity] = newItem;
         }
         // 加载实体信息
         for (var i = 0; i < count; i++) {
            var itemConfig = config[i];
            var identity = itemConfig[fieldStorageIdentity];
            var newItem = newItems[identity];
            if (newItem) {
               this.loadInstance(context, newItem, itemConfig);
            }
         }
         // 更新实体信息
         for (var i = 0; i < count; i++) {
            var itemConfig = config[i];
            var identity = itemConfig[fieldStorageIdentity];
            var newItem = newItems[identity];
            if (newItem) {
               if (newItem.updateConfig) {
                  newItem.updateConfig();
               }
            }
         }
      }
   }

   /**
  * 存储设置信息。
  *
  * @param item 对象
  * @param config 设置对象
  */
   public saveInstance(context: PersistentContext, item: any, config?: any): any {
      AssertUtil.debugNotNull(item);
      config = config || new Object();
      // 收集环境
      var persistentContext = context;
      if (!context) {
         persistentContext = new PersistentContext() as PersistentContext;
      }
      // 设置类型
      var className = this.findClassName(item);
      if (!className) {
         // className = persistentContext.findClassName(item);
      }
      if (className) {
         AssertUtil.debugNotNull(className);
         config[this.fieldClassName] = className;
         config[this.fieldVersion] = this.version;
      }
      // 获得描述器集合
      // this.persistent.save(this, persistentContext, item, config);

      return config;
   }

   /**
 * 加载设置信息。
 *
 * @param item 对象
 * @param config 设置对象
 */
   public loadInstance(context: PersistentContext, item: any, config: any): any {
      AssertUtil.debugNotNull(item);
      AssertUtil.debugNotNull(config);
      // 收集环境
      var persistentContext = context;
      if (!context) {
         persistentContext = new PersistentContext() as PersistentContext;
      }
      // 获得描述器集合
      var result;
      //var result = this.persistent.load(this, persistentContext, item, config);
      // 释放环境

      return result as any;
   }

   /**
    * 存储设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public save(context: any, item: any, config?: any): any {
      // 加载信息
      if (!config) {
         config = new Object();
      }
      if (!Array.isArray(config)) {
         //this.persistent.save(this, context, item, config);
      }
      // 过滤实体集合
      var items = new Array<any>();
      this.innerFilter(items, item);
      // 保存项目集合
      var count = items.length;
      for (var i = 0; i < count; i++) {
         var findItem = items[i];
         var className = this.findClassName(findItem);
         if (className) {
            // 存储内容
            var itemConfig = new Object() as any;
            itemConfig[this.fieldClassName] = className;
            itemConfig[this.fieldVersion] = this.version;
            this.saveInstance(context, findItem, itemConfig);
            // 是否需要保存
            var identity = findItem[this.fieldStorageIdentity];
            if (context.hasStore) {
               if (context.hasStore(identity)) {
                  continue;
               }
            }
            context.set(findItem[this.fieldStorageIdentity], findItem);
            config.push(itemConfig);
         }
      }
      return config;
   }
}
