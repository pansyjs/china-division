import data from '@/pca';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

const OUT_DIR = resolve(__dirname, '../dist');

function exportJson() {
  const json = JSON.stringify(data);

  writeFileSync(resolve(OUT_DIR, './pca.json'), json);
}

exportJson();
