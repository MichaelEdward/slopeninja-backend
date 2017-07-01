import fs from 'fs';
import {
  parseSierraSnow,
  parseSierraLifts,
  parseSierraLiftList,
  parseSierraTrailList,
  parseSierraTrails
} from '../sierra';
import { createHtmlParser } from '../../parserFactory';

test('fetches Sierra snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseSierraSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'sunny',
      temperature: 43,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 110,
      snowDepthSummit: 211,
    }
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseSierraSnow)('<html></html>');
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches Sierra lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseSierraLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: 14,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseSierraLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Sierra lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('liftList', parseSierraLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseSierraLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Sierra trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('trailList', parseSierraTrailList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseSierraTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});

test('fetches Sierra trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseSierraTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: 46,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseSierraTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
