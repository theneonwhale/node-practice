import * as fs from 'fs/promises';
import path from 'path';
import { isAccessible } from '../lib/accessible.js';
import { handleError } from '../lib/hadleError.js';

class SortFiles {
  constructor(dist) {
    this.dist = dist;
  }

  async #copyFile(file) {
    const folder = path.extname(file.name);
    const targetFolder = path.join(this.dist, folder);
    try {
      if (!(await isAccessible(targetFolder))) {
        await fs.mkdir(targetFolder);
      }
      await fs.copyFile(file.path, path.join(targetFolder, file.name));
    } catch (error) {
      handleError(error);
    }
  }

  async readFolder(base) {
    const files = await fs.readdir(base);
    for (const item of files) {
      const localBase = path.join(base, item);
      const state = await fs.stat(localBase);
      if (state.isDirectory()) {
        await this.readFolder(localBase);
      } else {
        await this.#copyFile({ name: item, path: localBase });
      }
    }
  }
}

export default SortFiles;
