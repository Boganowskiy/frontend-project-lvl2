import getObjectsDiff from './getObjectDiff.js';
import parseJSONFile from './parseFile.js';

export default (json1, json2) => {
  const file1ContentObj = parseJSONFile(json1);
  const file2ContentObj = parseJSONFile(json2);
  const diff = getObjectsDiff(file1ContentObj, file2ContentObj);
  return diff;
};
