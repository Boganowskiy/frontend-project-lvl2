import { Command } from 'commander';
import parseJSONFile from './parseJSON.js';
import getObjectsDiff from './getObjectDiff.js';

const program = new Command();

program
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1ContentObj = parseJSONFile(filepath1);
    const file2ContentObj = parseJSONFile(filepath2);
    const diff = getObjectsDiff(file1ContentObj, file2ContentObj);
    console.log(diff);
  });

export default program;
