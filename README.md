# dk-dates

DK dates is a libary wrapper around DayJS that includes helper functions for commonly used date formats and calculations.

## How to use dk-dates

### Installing
```
> npm install @diamondkinetics/dk-dates
```

### Using dk-dates
```
import { dkdates, DateType, DateFormat, DateSegment } from '@diamondkinetics/dk-dates';

dkdates.fetchDayJS();
dkdates.isAfter(date1, date2);
dkdates.fetchFormattedDate(DateFormat.YEAR, date)
...
...
```

### Types and Enums
```
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
```

## Development
All code changes should be made in `dates.ts`. And of course add tests in `dates.spec.ts`

### Running Tests

```
> npm run tests
```

#### Releasing to NPM
A new release is created when we merge to `main.` The `semantic-release` library will handle versioning, tagging and release back to GitHub and to NPM.


