import { Dayjs } from 'dayjs';
export type DateType = Dayjs | Date | string | number;

export enum DateFormat {
  YEAR = 'YYYY',
  MONTH_FULL = 'MMMM',
  MONTH_ABB = 'MMM',
  MONTH_NUM = 'MM',
  FULL_SLASH = 'M/D/YYYY',
  FULL_DASH = 'MM-DD-YYYY',
  YEAR_REV = 'YYYY-MM-DD',
  ORDINAL = 'Do',
  MONTH_ORD = 'MMMM Do',
}

export enum DateSegment {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
}
