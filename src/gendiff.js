import { Command } from 'commander';

const program = new Command();

program
  .version('0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <filepath1> <filepath2>');

export default program;
