import { Command } from 'commander';

const program = new Command();

program.version('0.1');
program.description('Compares two configuration files and shows a difference.');

export default program;
