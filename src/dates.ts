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
function getDayJS(date?: DateType): Dayjs {
  return dateLib(date);
}

/**
 *
 * @param date optional
 * @returns UTC extended DayJS function
 */
function getUTC(date?: DateType): Dayjs {
  return dateLib.utc(date);
}

/**
 *
 * @param format
 * @param date optional
 * @returns formatted date string
 */

function getFormattedDate(format: DateFormat, date?: string): string {
  return dateLib(date).format(format);
}

function getISOString(date?: DateType): string {
  return getUTC(date).toISOString();
}

/* The following two functions return the same result */
function getApiDateTimeString(): string {
  return getUTC().toISOString().slice(0, -1);
}

function getSubstring(): string {
  return getUTC().toISOString().substring(0, 23);
}

function addDate(segment: DateSegment, date?: DateType, amount = 1): DateType {
  return getUTC(date).add(amount, segment).toDate();
}

function subtractDate(segment: DateSegment, date?: DateType, amount = 1): DateType {
  return getUTC(date).subtract(amount, segment).toDate();
}

function isBefore(isBefore: DateType, compareDate?: DateType): boolean {
  return getUTC(compareDate).isBefore(isBefore);
}

function isAfter(isAfter: DateType, compareDate?: DateType): boolean {
  return getUTC(compareDate).isAfter(isAfter);
}

function getIsBetween(afterDate: DateType, beforeDate: DateType, compareDate?: DateType): boolean {
  return isAfter(afterDate, compareDate) && isBefore(beforeDate, compareDate);
}

function isValidDate(date?: DateType): boolean {
  return getUTC(date).isValid();
}

/* returns a UNIX timestamp */
function getValueOf(date?: DateType): number {
  return getDayJS(date).valueOf();
}

function getToDate(date?: DateType): DateType {
  return getDayJS(date).toDate();
}

function isSameMonth(compareDate: DateType, date: DateType): boolean {
  return getUTC(compareDate).isSame(date, DateSegment.MONTH);
}

function isSameYear(compareDate: DateType, date: DateType): boolean {
  return getUTC(compareDate).isSame(date, DateSegment.YEAR);
}

function isSameDate(date: DateType, compareDate?: DateType): boolean {
  return getUTC(compareDate).isSame(date);
}

export default {
  getDayJS,
  getUTC,
  getFormattedDate,
  getISOString,
  getApiDateTimeString,
  getSubstring,
  getIsBetween,
  getValueOf,
  getToDate,
  addDate,
  subtractDate,
  isBefore,
  isAfter,
  isValidDate,
  isSameMonth,
  isSameDate,
  isSameYear,
};
