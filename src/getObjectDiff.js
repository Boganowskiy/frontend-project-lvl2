import _ from 'lodash';

const getObjectsDiff = (obj1, obj2) => {
  const obj1Entries = Object.entries(obj1).sort();
  const resultWithObj1Elements = obj1Entries.reduce((acc, [key, value]) => {
    const oldValue = `- ${key}: ${value}`;
    if (_.has(obj2, key)) {
      if (obj2[key] === value) {
        const newElem = `  ${key}: ${value}`;
        return [...acc, newElem];
      }
      const newValue = `+ ${key}: ${obj2[key]}`;
      return [...acc, oldValue, newValue];
    }
    return [...acc, oldValue];
  }, []);
  const obj1Keys = Object.keys(obj1);
  const obj2WithUniqueKeysElements = _.omit(obj2, obj1Keys);
  const obj2WithUniqueKeysElementsEntries = Object.entries(obj2WithUniqueKeysElements).sort();
  const resultArr = obj2WithUniqueKeysElementsEntries.reduce((acc, [key, value]) => (
    [...acc, `+ ${key}: ${value}`]
  ), resultWithObj1Elements);
  const resultStr = `{\n\t${resultArr.join('\n\t')}\n}`;
  return resultStr;
};

export default getObjectsDiff;
