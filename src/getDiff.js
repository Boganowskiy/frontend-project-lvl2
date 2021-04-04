import getObjectsDiff from './getObjectDiff.js';
import parseFile from './parseFile.js';
import getFormatter from './formatters/index.js';

const getDiff = (file1, file2, formatter = 'stylish') => {
  const file1ContentObj = parseFile(file1);
  const file2ContentObj = parseFile(file2);
  const format = getFormatter(formatter);
  const diff = getObjectsDiff(file1ContentObj, file2ContentObj);
  const formatted = format(diff);
  return formatted;
};
export default getDiff;
