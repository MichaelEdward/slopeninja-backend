import fs from 'fs';
import { parseSquawSnow, parseSquawLifts, parseSquawTrails } from '../squaw';
import { createHtmlParser } from '../../parserFactory';

test('fetches Squaw snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-weather.html`);

  const resortData = await createHtmlParser('snow', parseSquawSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'sunny',
      temprature: 52,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 161,
    },
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseSquawSnow)('<html></html>');
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches Squaw lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-lifts.html`);
  const resortData = await createHtmlParser('lifts', parseSquawLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: 1,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseSquawLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Squaw trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-lifts.html`);
  const resortData = await createHtmlParser('trails', parseSquawTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseSquawTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
