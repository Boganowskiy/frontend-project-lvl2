import getObjectsDiff from './getObjectDiff.js';
import parseFile from './parseFile.js';
import stylish from './stylish.js';

const getDiff = (file1, file2, format = stylish) => {
  const file1ContentObj = parseFile(file1);
  const file2ContentObj = parseFile(file2);
  const diff = getObjectsDiff(file1ContentObj, file2ContentObj);
  const formatted = format(diff);
  return formatted;
};

export default getDiff;
