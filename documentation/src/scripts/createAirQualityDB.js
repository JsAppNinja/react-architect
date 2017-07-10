/* eslint-disable no-console */
import 'babel-polyfill';
// import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

const LIMIT = 3682;

import sourceData from '../server/airQuality.json';

const writeFile = Promise.promisify(fs.writeFile);
const fileName = path.resolve(process.cwd(), 'src', 'server', 'databases', 'airQuality.json');

async function createAirQualityDB() {
  // const response = await fetch('https://data.cdc.gov/api/views/cjae-szjv/rows.json?accessType=DOWNLOAD')
  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }

  // const sourceData = await response.json();
  let startIndex = -1;
  const keys = [];
  const { columns } = sourceData.meta.view;
  const meta = columns.reduce((list, { id, name, description, dataTypeName, position, fieldName }, i) => {
    if (position > 0) { // non-hidden field
      if (startIndex === -1) {
        startIndex = i;
      }

      keys.push(name.substring(0, 1).toLowerCase() + name.substring(1));
      list.push({
        id,
        name,
        description,
        numeric: dataTypeName === 'number',
      });
    }

    return list;
  }, []);

  const data = sourceData.data.map(datum => datum.reduce((formatted, part, i) => {
    if (i >= startIndex && i <= (LIMIT + startIndex)) {
      const index = i - startIndex;
      const { numeric } = meta[index];
      formatted[keys[index]] = numeric ? parseInt(part, 10) : part;
    }

    return formatted;
  }, {}));

  await writeFile(fileName, JSON.stringify({ meta, data }), 'utf-8');
  console.log(`Created air quality database at ${fileName}`);
}

createAirQualityDB();
