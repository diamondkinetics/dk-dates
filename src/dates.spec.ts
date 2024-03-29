import { describe, expect, it } from '@jest/globals';

import service from './dates';
import { DateFormat, DateSegment } from './dates.types';

describe('diamond-kinetics-date-lib', () => {
  describe('Base Functions', () => {
    it('should return a dayjs instance ', () => {
      expect(service.getDayJS()).toBeTruthy();
    });

    it('should return a dayjs UTC instance', () => {
      expect(service.getUTC()).toBeTruthy();
    });
  });

  describe('Formatted Dates', () => {
    it('should return formatted date ', () => {
      expect(service.getFormattedDate(DateFormat.FULL_DASH, '2024-01-24')).toBe('01-24-2024');
      expect(service.getFormattedDate(DateFormat.FULL_SLASH, '2024-01-24')).toBe('1/24/2024');
      expect(service.getFormattedDate(DateFormat.YEAR, '2024-01-24')).toBe('2024');
      expect(service.getFormattedDate(DateFormat.YEAR_REV, '2024-01-24')).toBe('2024-01-24');
    });

    it('should return formatted Month ', () => {
      expect(service.getFormattedDate(DateFormat.MONTH_NUM, '2024-01-24')).toBe('01');
      expect(service.getFormattedDate(DateFormat.MONTH_ABB, '2024-01-24')).toBe('Jan');
      expect(service.getFormattedDate(DateFormat.MONTH_FULL, '2024-01-24')).toBe('January');
      expect(service.getFormattedDate(DateFormat.MONTH_ORD, '2024-01-24')).toBe('January 24th');
    });

    it('should return ordinal formatted days ', () => {
      expect(service.getFormattedDate(DateFormat.ORDINAL, '2024-01-01')).toContain('st');
      expect(service.getFormattedDate(DateFormat.ORDINAL, '2024-01-02')).toContain('nd');
      expect(service.getFormattedDate(DateFormat.ORDINAL, '2024-01-03')).toContain('rd');
      expect(service.getFormattedDate(DateFormat.ORDINAL, '2024-01-24')).toContain('th');
    });

    it('should return API formatted datetime string ', () => {
      expect(service.getApiDateTimeString()).not.toContain('Z');
    });

    it('should return substring of API formatted datetime string ', () => {
      expect(service.getSubstring()).toContain('T');
      expect(service.getApiDateTimeString()).not.toContain('Z');
    });
  });

  describe('Before and After', () => {
    it('evaluate if date is isBefore ', () => {
      expect(service.isBefore('2024-01-24', '2024-01-25')).toBe(false);
      expect(service.isBefore('2024-01-25', '2024-01-24')).toBe(true);
      expect(service.isBefore('2024-01-25')).toBe(false);
    });

    it('evaluate if date is isAfter ', () => {
      expect(service.isAfter('2024-01-24', '2024-01-25')).toBe(true);
      expect(service.isAfter('2024-01-24', '2024-01-23')).toBe(false);
    });

    it('should return true if the date is between', () => {
      expect(service.getIsBetween('2024-01-23', '2024-01-01')).toBe(false);
    });

    it('should return false if the date out of range', () => {
      expect(service.getIsBetween(service.getDayJS(), '2024-03-10', '2024-03-24')).toBe(false);
    });
  });

  it('should return UNIX timestamp ', () => {
    const timestamp = service.getValueOf();
    expect(timestamp).toBeDefined();
    expect(timestamp).not.toBeNull();
    expect(typeof timestamp).toBe('number');
    expect(timestamp).toBeGreaterThan(0);
  });

  it('should return toDate value', () => {
    expect(service.getToDate(new Date('204-03-04'))).toEqual(new Date('204-03-04'));
  });

  it('should return true if its the same month', () => {
    expect(service.isSameMonth(new Date('2024-01-15'), service.getDayJS('2024-01-10'))).toBe(true);
  });

  //   it('should return true if the dates are the same ', () => {
  //     expect(service.isSameDate(new Date('2024-01-15'), service.getDayJS('2024-01-15'))).toBe(true);
  //   });

  it('should return false if the date cant be parsed', () => {
    expect(service.isValidDate('Today')).toBe(false);
    expect(service.isValidDate('2024-01-01')).toBe(true);
    // still valid becuase it can be parsed to a Date object.
    expect(service.isValidDate('2024-01-33')).toBe(true);
  });

  describe('Subtract Dates', () => {
    it('should subtract day(s)', () => {
      expect(service.subtractDate(DateSegment.DAY, '2024-01-24', 1)).toEqual(new Date('2024-01-23'));
    });

    it('should subtract month(s)', () => {
      expect(service.subtractDate(DateSegment.MONTH, '2024-01-24', 1)).toEqual(new Date('2023-12-24'));
    });

    it('should subtract year(s)', () => {
      expect(service.subtractDate(DateSegment.YEAR, '2024-01-24', 1)).toEqual(new Date('2023-01-24'));
    });
  });

  describe('Add Dates', () => {
    it('should add days', () => {
      expect(service.addDate(DateSegment.DAY, '2024-01-24', 1)).toEqual(new Date('2024-01-25'));

      expect(service.addDate(DateSegment.DAY, '2024-01-24', 5)).toEqual(new Date('2024-01-29'));

      expect(service.addDate(DateSegment.DAY, new Date('2024-01-31'), 1)).toEqual(new Date('2024-02-01'));
    });

    it('should add months ', () => {
      expect(service.addDate(DateSegment.MONTH, '2024-01-24', 1)).toEqual(new Date('2024-02-24'));

      expect(service.addDate(DateSegment.MONTH, '2024-01-24', 5)).toEqual(new Date('2024-06-24'));
    });

    it('should add years', () => {
      expect(service.addDate(DateSegment.YEAR, '2024-01-24', 1)).toEqual(new Date('2025-01-24'));

      expect(service.addDate(DateSegment.YEAR, '2024-01-24', 2)).toEqual(new Date('2026-01-24'));
    });
  });
});
