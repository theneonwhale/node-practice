import * as fs from 'fs/promises';
import { isAccessible } from './lib/accessible.js';
import SortFiles from './module/sort.js';
import program from './lib/commander.js';
import { handleError } from './lib/hadleError.js';
import { resolve } from 'path';

import createDirnameAndFilename from './lib/dirname.js';
const { __dirname, __filename } = createDirnameAndFilename(import.meta.url);

program.parse(process.argv);
console.log(program.opts());
const output = program.opts().output;
if (!(await isAccessible(output))) {
  await fs.mkdir(output);
}
try {
  const sorting = new SortFiles(output);
  await sorting.readFolder(resolve(__dirname, program.opts().folder));
} catch (error) {
  handleError(error);
}

console.log('Done. We can delete source folder.');
