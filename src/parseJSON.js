import path from 'path';
import fs from 'fs';

export default (filepath) => {
  const cwd = process.cwd();
  const fullpath = path.resolve(cwd, filepath);
  const content = fs.readFileSync(fullpath, 'utf-8');
  const parsed = JSON.parse(content);
  return parsed;
};
