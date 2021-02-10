import { Command } from 'commander';
import getJsonsDiff from './getJsonsDiff.js';

const program = new Command();

program
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = getJsonsDiff(filepath1, filepath2);
    console.log(diff);
  });

export default program;
