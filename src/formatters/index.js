import plain from './plain.js';
import stylish from './stylish.js';
import toJSON from './jsonFormatter.js';

const getFormatter = (formatter) => {
  if (formatter === 'plain') return plain;
  if (formatter === 'stylish') return stylish;
  if (formatter === 'json') return toJSON;
  throw Error('Unknown format');
};

export default getFormatter;
