import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';

export default (filepath) => {
  const cwd = process.cwd();
  const fullpath = path.resolve(cwd, filepath);
  const extension = path.extname(filepath);
  const content = fs.readFileSync(fullpath, 'utf-8');
  const parsed = parsers[extension](content);
  return parsed;
};
