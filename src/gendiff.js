import { Command } from 'commander';
import getDiff from './getDiff.js';

const program = new Command();

program
  .version('0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .usage('[options] <filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const diff = getDiff(filepath1, filepath2, format);
    console.log(diff);
  });

export default program;
