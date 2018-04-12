import { DateUtil } from './DateUtil';
import { IntegerUtil } from './IntegerUtil';

/**
 * 日期时间的工具类。
 * 
 * @author maochunyang
 * @version 1.0.1
 */
export class DateTime {
   /** 时间 */
   public date: Date;
   /** 年 */
   public year: number;
   /** 月 */
   public month: number;
   /** 日 */
   public day: number;
   /** 时 */
   public hour: number;
   /** 分 */
   public minute: number;
   /** 秒 */
   public second: number;
   /** 毫秒 */
   public ms: number;

   /**
    * 构造处理。
    *
    * @param date:Date 日期对象
    */
   public constructor(date: Date = null as any) {
      this.date = date ? date : new Date();
      this.update();
   }

   /**
    * 判断数据是否相等。
    *
    * @param date 日期对象
    * @return 是否相等
    */
   public equals(date: DateTime): boolean {
      return this.date.getTime() == date.date.getTime();
   }

   /**
    * 判断当前时间是否在指定时间之前。
    *
    * @param date 日期对象
    * @return 是否之前
    */
   public isBefore(date: DateTime): boolean {
      return this.date.getTime() < date.date.getTime();
   }

   /**
    * 判断当前时间是否在指定时间之后。
    *
    * @param date:Date 日期对象
    * @return 是否之后
    */
   public isAfter(date: DateTime): boolean {
      return this.date.getTime() > date.date.getTime();
   }

   /**
    * 取得当前的月的天数。
    *
    * @return 天数
    */
   public monthDays(): number {
      return DateUtil.monthDays(this.year, this.month);
   }

   /**
    * 取得当前的周的天数。
    *
    * @return 天数
    */
   public monthWeekDay(): number {
      return (8 - (this.day - this.weekDay()) % 7) % 7;
   }

   /**
    * 取得当前周的天数。
    *
    * @return 天数
    */
   public weekDay(): number {
      return this.date.getDay();
   }

   /**
    * 取得总秒数。
    *
    * @return 总秒数
    */
   public totalSecond(): number {
      return parseInt((this.date.getTime() / 1000) as any);
   }

   /**
    * 取得当日秒数。
    *
    * @return 秒数
    */
   public daySecond(): number {
      return this.hour * 3600 + this.minute * 60 + this.second;
   }

   /**
    * 设置年。
    *
    * @param value 内容
    */
   public setYear(value: number) {
      this.date.setFullYear(value);
      this.update();
   }

   /**
    * 设置月。
    *
    * @param value 内容
    */
   public setMonth(value: number) {
      this.date.setMonth(parseInt(value as any, 10) - 1);
      this.update();
   }

   /**
    * 设置天。
    *
    * @param value 内容
    */
   public setDay(value: number) {
      this.date.setDate(value);
      this.update();
   }

   /**
    * 设置小时。
    *
    * @param value 内容
    */
   public setHour(value: number) {
      this.date.setHours(value);
      this.update();
   }

   /**
    * 设置分钟。
    *
    * @param value 内容
    */
   public setMinute(value: number) {
      this.date.setMinutes(value);
      this.update();
   }

   /**
    * 设置秒。
    *
    * @param value 内容
    */
   public setSecond(value: number) {
      this.date.setSeconds(value);
      this.update();
   }

   /**
    * 设置时间，并改变相应的时间变量。
    *
    * @param value 日期对象
    */
   public setDate(value: Date) {
      this.date = value;
      this.update();
   }

   /**
    * 设定为当前时间。
    */
   public setNow() {
      this.date = new Date();
      this.update();
   }

   /**
    * 接收数据。
    *
    * @param value 
    * @return 时间日期
    */
   public assign(value: DateTime): DateTime {
      this.date.setTime(value.date.getTime());
      this.update();
      return this;
   }

   /**
    * 增加指定的年数。
    *
    * @param value 年数
    */
   public addYear(value: number) {
      var year = this.date.getFullYear();
      this.date.setFullYear(year + IntegerUtil.nvl(value, 1));
      this.update();
   }

   /**
    * 增加指定的月数。
    *
    * @param value 月数
    */
   public addMonth(value: number) {
      var month = this.date.getMonth();
      this.date.setMonth(month + IntegerUtil.nvl(value, 1));
      this.update();
   }

   /**
    * 增加指定的天数。
    *
    * @param value 天数
    */
   public addDay(value: number) {
      var time = this.date.getTime();
      var tick = time + (1000 * 60 * 60 * 24 * IntegerUtil.nvl(value, 1));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 增加指定的小时。
    *
    * @param value 小时
    */
   public addHour(value: number) {
      var time = this.date.getTime();
      var tick = time + (1000 * 60 * 60 * IntegerUtil.nvl(value, 1));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 增加指定的分钟。
    *
    * @param value 分钟
    */
   public addMinute(value: number) {
      var time = this.date.getTime();
      var tick = time + (1000 * 60 * IntegerUtil.nvl(value, 1));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 增加指定的秒数。
    *
    * @param value 秒数
    */
   public addSecond(value: number) {
      var time = this.date.getTime();
      var tick = time + (1000 * IntegerUtil.nvl(value, 1));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 增加指定的毫秒。
    *
    * @param value 毫秒数
    */
   public add(value: number) {
      var time = this.date.getTime();
      var tick = time + IntegerUtil.nvl(value, 1);
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 截取掉天时间。
    *
    * @param value 天数
    */
   public truncDay(value: number) {
      var time = this.date.getTime();
      var tick = time - (time % (1000 * 60 * 60 * 24 * IntegerUtil.nvl(value, 1)));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 截取掉小时时间。
    *
    * @param value 小时数
    */
   public truncHour(value: number) {
      var time = this.date.getTime();
      var tick = time - (time % (1000 * 60 * 60 * IntegerUtil.nvl(value, 1)));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 截取掉分钟时间。
    *
    * @param value 分钟数
    */
   public truncMinute(value: number) {
      var time = this.date.getTime();
      var tick = time - (time % (1000 * 60 * IntegerUtil.nvl(value, 1)));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 截取掉秒时间。
    *
    * @param value 秒数
    */
   public truncSecond(value: number) {
      var time = this.date.getTime();
      var tick = time - (time % (1000 * IntegerUtil.nvl(value, 1)));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 截取掉毫秒时间。
    *
    * @param value 毫秒数
    */
   public trunc(value: number) {
      var time = this.date.getTime();
      var tick = time - (time % IntegerUtil.nvl(value, 1));
      this.date.setTime(tick);
      this.update();
   }

   /**
    * 获得数据。
    *
    * @return 数据
    */
   public get(): number {
      return this.date.getTime();
   }

   /**
    * 设置数据。
    *
    * @param value 数据
    */
   public set(value: number) {
      this.date.setTime(value);
      this.update();
   }

   /**
    * 根据格式解析时间字符串。
    *
    * @param value 字符串
    * @param format 格式
    */
   public parse(value: string, format?: string) {
      return DateUtil.parse(value, format, this);
   }

   /**
    * 根据格式解析时间字符串。
    *
    * @param value 字符串
    */
   public parseAuto(value: any) {
      return DateUtil.autoParse(value, this);
   }

   /**
    * 根据指定格式格式化时间。
    *
    * @param format 格式
    * @return 字符串
    */
   public format(format?: string) {
      return DateUtil.formatDate(this, format);
   }

   /**
    * 更新数据。
    */
   public update() {
      var date = this.date;
      if (date) {
         this.year = date.getFullYear();
         this.month = date.getMonth() + 1;
         this.day = date.getDate();
         this.hour = date.getHours();
         this.minute = date.getMinutes();
         this.second = date.getSeconds();
         this.ms = date.getMilliseconds();
      }
   }

   /**
    * 复制当前对象为新对象。
    *
    * @return 时间
    */
   public clone(): DateTime {
      var value = new Date();
      value.setTime(this.date.getTime());
      return new DateTime(value);
   }
}
