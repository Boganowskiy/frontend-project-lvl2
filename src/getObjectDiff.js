import _ from 'lodash';

const isComplexValue = (value) => value instanceof Object && !Array.isArray(value);

const getValue = (value) => ((Array.isArray(value)) ? `[ ${value} ]` : value);

const processLeafNode = (key, oldValue, newValue) => {
  const value = getValue(oldValue);
  if (_.isEqual(oldValue, newValue)) {
    return { key, status: 'unchanged', value };
  }
  const newVal = getValue(newValue);
  return {
    key, status: 'updated', value, newValue: newVal,
  };
};

const processNode = (key, oldValue, newValue, objectProcessFunc) => {
  const node = { key, value: oldValue, newValue };
  if (isComplexValue(oldValue) && isComplexValue(newValue)) {
    return {
      key,
      status: 'unchanged',
      children: objectProcessFunc(oldValue, newValue),
    };
  }
  const obj = (isComplexValue(oldValue)) ? oldValue : newValue;
  return { ...node, status: 'updated', children: objectProcessFunc(obj, obj) };
};

const getObjectsDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    if (!(_.has(obj1, key)) || !(_.has(obj2, key))) {
      const data = (_.has(obj1, key))
        ? { value: obj1[key], status: 'removed' }
        : { value: obj2[key], status: 'added' };
      const { value, status } = data;
      if (isComplexValue(value)) {
        return {
          key, value, status, children: getObjectsDiff(value, value),
        };
      }
      return { key, value, status };
    }
    if (isComplexValue(oldValue) || isComplexValue(newValue)) {
      return processNode(key, oldValue, newValue, getObjectsDiff);
    }
    return processLeafNode(key, oldValue, newValue);
  });
  return result;
};

export default getObjectsDiff;
