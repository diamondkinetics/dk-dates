import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advanced from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import { DateType, DateFormat, DateSegment } from './dates.types';

const dateLib = dayjs;
dateLib.extend(utc);
dateLib.extend(advanced);
dateLib.extend(duration);

/**
 *
 * @param date optional
 * @returns DayJS function
 */
function fetchDayJS(date?: DateType): Dayjs {
  return dateLib(date);
}

/**
 *
 * @param date optional
 * @returns UTC extended DayJS function
 */
function fetchUTC(date?: DateType): Dayjs {
  return dateLib.utc(date);
}

/**
 *
 * @param format
 * @param date optional
 * @returns formatted date string
 */

function fetchFormattedDate(format: DateFormat, date?: string): string {
  return dateLib(date).format(format);
}

function getISOString(date?: DateType): string {
  return fetchUTC(date).toISOString();
}

/* The following two functions return the same result */
function getApiDateTimeString(): string {
  return fetchUTC().toISOString().slice(0, -1);
}

function getSubstring(): string {
  return fetchUTC().toISOString().substring(0, 23);
}

function addDate(segment: DateSegment, date?: DateType, amount = 1): DateType {
  return fetchUTC(date).add(amount, segment).toDate();
}

function subtractDate(segment: DateSegment, date?: DateType, amount = 1): DateType {
  return fetchUTC(date).subtract(amount, segment).toDate();
}

function fetchIsBefore(beforeDate: DateType, compareDate?: DateType): boolean {
  return fetchUTC(compareDate).isBefore(beforeDate);
}

function fetchIsAfter(afterDate: DateType, compareDate?: DateType): boolean {
  return fetchUTC(compareDate).isAfter(afterDate);
}

function fetchIsBetween(afterDate: DateType, beforeDate: DateType, compareDate?: DateType): boolean {
  return fetchIsAfter(afterDate, compareDate) && fetchIsBefore(beforeDate, compareDate);
}

function isValidDate(date?: DateType): boolean {
  return fetchUTC(date).isValid();
}

/* returns a UNIX timestamp */
function fetchValueOf(date?: DateType): number {
  return fetchDayJS(date).valueOf();
}

function fetchToDate(date?: DateType): DateType {
  return fetchDayJS(date).toDate();
}

function isSameMonth(compareDate: DateType, date: DateType): boolean {
  return fetchUTC(compareDate).isSame(date, DateSegment.MONTH);
}

function isSameYear(compareDate: DateType, date: DateType): boolean {
  return fetchUTC(compareDate).isSame(date, DateSegment.YEAR);
}

function isSameDate(date: DateType, compareDate?: DateType): boolean {
  return fetchUTC(compareDate).isSame(date);
}

// function setTimeStamp(
//   year: number,
//   month: number,
//   date: number,
//   hour: number,
//   minute: number,
//   second: number,
//   millisecond: number
// ) {
//   return fetchUTC()
//     .year(year)
//     .month(month)
//     .date(date)
//     .hour(hour)
//     .minute(minute)
//     .second(second)
//     .millisecond(millisecond)
//     .toDate();
// }

export default {
  fetchDayJS,
  fetchUTC,
  fetchFormattedDate,
  getISOString,
  getApiDateTimeString,
  getSubstring,
  addDate,
  subtractDate,
  fetchIsBefore,
  fetchIsAfter,
  fetchIsBetween,
  isValidDate,
  fetchValueOf,
  fetchToDate,
  isSameMonth,
  isSameDate,
  isSameYear,
};
