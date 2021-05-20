import { resolve } from 'path';
import cloneDeep from 'lodash/cloneDeep';
import { writeFileSync, readFileSync } from 'fs';
import * as prettier from 'prettier';
import { formatDistrict, formatHMT, PcaCode } from './utils';

let pcaCode: PcaCode[] = require('china-division/dist/pca-code.json');
const HMT = require('china-division/dist/HK-MO-TW');

pcaCode = pcaCode.concat(formatHMT(HMT));

const ROOT_DIR = resolve(__dirname, '../src');

const PCA_FILE = './pca.ts';
const ANT_PCA_FILE = './ant-design-pca.ts';

const PC_FILE = './pc.ts';
const ANT_PC_FILE = './ant-design-pc.ts';

const pcaData = formatDistrict(pcaCode, {
  code: 'v',
  name: 'n',
  children: 'c'
});

const antPcaData = formatDistrict(pcaCode, {
  code: 'value',
  name: 'label',
  children: 'children'
});

const pcData = getPcData(pcaData, 'c');
const antPcData = getPcData(antPcaData);

console.log('export:data >> start');

// export pca
exportPcaData();
console.log(`export:data >> export ${PCA_FILE}`);
exportAntPcaData();
console.log(`export:data >> export ${ANT_PCA_FILE}`);

// export pc
exportPcData();
console.log(`export:data >> export ${PC_FILE}`);
exportAntPcData();
console.log(`export:data >> export ${ANT_PC_FILE}`);

console.log('export:data >> prettier code');
prettierCode(resolve(ROOT_DIR, PCA_FILE));
prettierCode(resolve(ROOT_DIR, PC_FILE));
prettierCode(resolve(ROOT_DIR, ANT_PCA_FILE));
prettierCode(resolve(ROOT_DIR, ANT_PC_FILE));


// ----------------------------------------

function exportPcaData() {
  writeFileSync(
    resolve(ROOT_DIR, PCA_FILE),
    `
import { DivisionData } from './types';

const district: DivisionData[] = ${JSON.stringify(pcaData)}

export default district;
`
  );
}

function exportPcData() {
  writeFileSync(
    resolve(ROOT_DIR, PC_FILE),
    `
import { DivisionData } from './types';

const district: DivisionData[] = ${JSON.stringify(pcData)}

export default district;
`
  );
}


function exportAntPcaData() {
  writeFileSync(
    resolve(ROOT_DIR, ANT_PCA_FILE),
    `
import { CascaderOption } from './types';

const district: CascaderOption[] = ${JSON.stringify(antPcaData)}

export default district;
`
  );
}

function exportAntPcData() {
  writeFileSync(
    resolve(ROOT_DIR, ANT_PC_FILE),
    `
import { CascaderOption } from './types';

const district: CascaderOption[] = ${JSON.stringify(antPcData)}

export default district;
`
  );
}

function prettierCode(source: string) {
  prettier.resolveConfig(resolve(__dirname, '../node_modules/@walrus/plugin-prettier/lib/prettier.config.js'))
    .then((options) => {
      const text = readFileSync(source, 'utf8');
      const formatted = prettier.format(text, { ...options, parser: 'babel' });
      writeFileSync(source, formatted)
    })
}

export function getPcData(data: any[], children: string = 'children') {
  const list = cloneDeep(data);
  return list.map((item) => {
    if (item.children && item.children.length) {
      item.children = item.children.map((city) => {
        delete city[children];
        return city;
      });
    }
    return item;
  });
}

