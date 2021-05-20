import { resolve } from 'path';
import { writeFileSync } from 'fs';
import pcaData from '../src/pca';
import pcData from '../src/pc';
import antPcData from '../src/ant-design-pc';
import antPcaData from '../src/ant-design-pca';

const OUT_DIR = resolve(__dirname, '../data-source');

function exportPcJson() {
  console.log('export:json >> export pc.json');
  const json = JSON.stringify(pcData);

  writeFileSync(resolve(OUT_DIR, './pc.json'), json);
}

function exportPcaJson() {
  console.log('export:json >> export pca.json');
  const json = JSON.stringify(pcaData);

  writeFileSync(resolve(OUT_DIR, './pca.json'), json);
}

function exportAntPcJson() {
  console.log('export:json >> export ant-design-pc.json');
  const json = JSON.stringify(antPcData);

  writeFileSync(resolve(OUT_DIR, './ant-design-pc.json'), json);
}

function exportAntPcaJson() {
  console.log('export:json >> export ant-design-pca.json');
  const json = JSON.stringify(antPcaData);

  writeFileSync(resolve(OUT_DIR, './ant-design-pca.json'), json);
}

console.log('export:json >> start');

exportPcJson();
exportPcaJson();
exportAntPcJson();
exportAntPcaJson();

console.log('export:json >> end');
