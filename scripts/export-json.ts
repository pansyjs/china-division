import { resolve } from 'path';
import { writeFileSync } from 'fs';
import data from '../src/pca';
import cascaderOptions from '../src/cascader-options';

const OUT_DIR = resolve(__dirname, '../data-source');

function exportJson() {
  console.log('export:json >> export pca.json');
  const json = JSON.stringify(data);

  writeFileSync(resolve(OUT_DIR, './pca.json'), json);
}

function exportCascaderJson() {
  console.log('export:json >> export cascader-options.json');
  const json = JSON.stringify(cascaderOptions);

  writeFileSync(resolve(OUT_DIR, './cascader-options.json'), json);
}

console.log('export:json >> start');

exportJson();
exportCascaderJson();

console.log('export:json >> end');
