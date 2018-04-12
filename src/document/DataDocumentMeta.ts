
import { DateUtil } from '../langauage/DateUtil';
import { DataTypeEnum } from '../model/DataTypeEnum';
import { Persistent } from '../persistent/Persistent';
import { Field } from '../decorator/Field';
import { PersistentAccessEnum } from '../persistent/PersistentAccessEnum';
import { StringConverter } from '../persistent/converter/StringConverter';

/**
 * 数据文档信息。
 */
export class DataDocumentMeta {
   /** 公司 */
   @Field('company', DataTypeEnum.String, String)
   @Persistent(StringConverter)
   public company: string;
   /** 版权 */
   @Field('copyright', DataTypeEnum.String, String)
   @Persistent(StringConverter)
   public copyright: string;

   /** 版本 */
   @Field('version', DataTypeEnum.String, String)
   @Persistent(new StringConverter(PersistentAccessEnum.GetSet, true))
   public version: string;

   /** 创建日期 */
   @Field('create_date', DataTypeEnum.String, String)
   @Persistent(StringConverter)
   public createDate: string;
   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.company = 'huang';
      this.copyright = 'Copyright © 2017';
      this.version = 'current';
      this.createDate = DateUtil.format('yymmddhh24miss');
   }

   /**
    * 加载数据
    * @param jmeta 
    */
   public loadJson(jmeta: any) {
      this.company = jmeta.company;
      this.copyright = jmeta.copyright;
      this.version = jmeta.version;
      this.createDate = jmeta.createDate;
   }

   /**
    * 保存数据
    * @param jmeta 
    */
   public saveJson(jmeta: any) {
      jmeta.company = this.company;
      jmeta.copyright = this.copyright;
      jmeta.version = this.version;
      jmeta.createData = this.createDate;
   }
}