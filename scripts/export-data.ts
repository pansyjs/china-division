import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import * as prettier from 'prettier';
import { formatDistrict, formatHMT, PcaCode } from './utils';

let pcaCode: PcaCode[] = require('china-division/dist/pca-code.json');
const HMT = require('china-division/dist/HK-MO-TW');

pcaCode = pcaCode.concat(formatHMT(HMT));

const ROOT_DIR = resolve(__dirname, '../src');

const district = formatDistrict(pcaCode, {
  code: 'v',
  name: 'n',
  children: 'c'
});

const cascaderOptions = formatDistrict(pcaCode, {
  code: 'value',
  name: 'label',
  children: 'children'
});

console.log('export:data >> 导出开始');
exportData();
console.log('export:data >> 导出精简数据');
exportCascaderData();
console.log('export:data >> 导出级联选择数据');

console.log('export:data >> 格式化代码');
prettierCode(resolve(ROOT_DIR, './pca.ts'));
prettierCode(resolve(ROOT_DIR, './cascader-options.ts'));

function exportData() {
  writeFileSync(
    resolve(ROOT_DIR, './pca.ts'),
    `
import { DivisionData } from './types';

const district: DivisionData[] = ${JSON.stringify(district)}

export default district;
`
  );
}

function exportCascaderData() {
  writeFileSync(
    resolve(ROOT_DIR, './cascader-options.ts'),
    `
import { CascaderOption } from './types';

const district: CascaderOption[] = ${JSON.stringify(cascaderOptions)}

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
