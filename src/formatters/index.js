import plain from './plain.js';
import stylish from './stylish.js';

const getFormatter = (formatter) => {
  if (formatter === 'plain') return plain;
  if (formatter === 'stylish') return stylish;
  throw Error('Unknown format');
};

export default getFormatter;
