import _ from 'lodash';

const isComplexValue = (value) => value instanceof Object && !Array.isArray(value);

const processLeafNode = (key, oldValue, newValue) => {
  const node = { key };
  if (_.isEqual(oldValue, newValue)) {
    node.status = 'unchanged';
    node.value = oldValue;
  } else {
    node.status = 'updated';
    node.value = oldValue;
    node.newValue = newValue;
  }

  if (Array.isArray(oldValue) || Array.isArray(newValue)) {
    node.value = `[ ${oldValue} ]`;
    if (node.status === 'updated') {
      node.newValue = `[ ${newValue} ]`;
    }
  }
  return node;
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
  node.status = 'updated';
  const obj = (isComplexValue(oldValue)) ? oldValue : newValue;
  node.children = objectProcessFunc(obj, obj);
  return node;
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
      const node = { key };
      if (_.has(obj1, key)) {
        node.value = obj1[key];
        node.status = 'removed';
      } else {
        node.value = obj2[key];
        node.status = 'added';
      }
      const { value } = node;
      if (isComplexValue(value)) {
        return { ...node, children: getObjectsDiff(value, value) };
      }
      return node;
    }
    if (isComplexValue(oldValue) || isComplexValue(newValue)) {
      return processNode(key, oldValue, newValue, getObjectsDiff);
    }
    return processLeafNode(key, oldValue, newValue);
  });
  return result;
};

export default getObjectsDiff;
