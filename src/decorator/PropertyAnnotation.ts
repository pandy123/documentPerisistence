import { Annotation } from './Annotation';
import { AnnotationEnum } from './AnnotationEnum';
import { DataTypeEnum } from '../model/DataTypeEnum';
import { StringUtil } from '../langauage/StringUtil';


export class PropertyAnnotation extends Annotation {
   /** 数据名称 */
   public dataName: string;
   /** 数据类型 */
   public dataCd: DataTypeEnum;
   /** 数据默认 */
   public dataDefault: any;
   /** 数据对象 */
   public dataClass: Function;
   /** 数据转换器 */
   public dataConverter: Function;
   /** 数据持久化 */
   public dataPersistent: Function;

   /**
    * 构造处理。
    *
    * @param name 名称
    */
   public constructor(name: string, dataName: String = null as any, dataCd: DataTypeEnum = DataTypeEnum.Unknown, dataDefault: any = null, dataClass: any = null, dataConverter: any = null, dataPersistent: any = null) {
      super(name);
      // 设置属性
      this._annotationCd = AnnotationEnum.Property;
      this._inherit = true;
      // 设置数据名称
      var code = null;
      if (dataName == null) {
         if (StringUtil.startsWith(name, '_')) {
            code = name.substring(1);
         } else {
            code = name;
         }
         code = StringUtil.toUnderline(code);
      } else {
         code = dataName;
      }
      this.dataName = code as any;
      this.dataCd = dataCd;
      this.dataDefault = dataDefault;
      this.dataClass = dataClass;
      this.dataConverter = dataConverter;
      this.dataPersistent = dataPersistent;
   }

   /**
    * 获得代码。
    *
    * @return String 代码
    */
   public get code(): string {
      return this.dataName;
   }

   /**
    * 绑定处理。
    */
   public build() {
   }

   /**
    * 加载属性值。
    *
    * @param value 对象
    * @param config 配置
    */
   public load(value: any, config: any) {
      value[this._name] = config.get(this.dataName);
   }

   /**
    * 存储属性值。
    *
    * @param value 对象
    * @param config 配置
    */
   public save(value: any, config: any) {
      config.set(this.dataName, value[this._name]);
   }

   /**
    * 获得字符串。
    *
    * @return String 字符串
    */
   public toString() {
      return '<' + this._annotationCd + ',data_name=' + this.dataName + '>';
   }
}
