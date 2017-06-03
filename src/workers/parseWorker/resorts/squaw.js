import cheerio from 'cheerio';
import {
  degreeOrNull,
  inchOrNull,
} from '../util';

const initialWeather = {
  status: null,
  weatherIcon: null,
  temprature: null,
  baseCondition: null,
  newSnow: null,
  snowDepthBase: null,
  snowDepthSummit: null,

};

const parseSquawWeather = async ($) => {

  const temprature = $('#squaw-elevation-0 .row.current .cellwrapper .cell .value').first().text().trim();
  console.warn(temprature)
  //24
  const newSnow24Hr = $('.row.snow .cellwrapper .cell .value').slice(1,2).text().trim();
  // //Base
  const snowDepthBase = $('#squaw-elevation-2 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();
  const snowDepthSummit = $('#squaw-elevation-1 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();

  return {
    ...initialWeather,
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),

  };
}

export const fetchSquaw = async (html) => {
  const $ = cheerio.load(html)

  const weather = await parseSquawWeather($);

  return {
    weather,
  };
}
