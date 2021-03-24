import _ from 'lodash';

const processNode = (key, o1, o2, childrenDiffFunc) => {
  const oldValue = o1[key];
  const newValue = o2[key];
  const node = {
    key,
    oldValue,
    newValue,
  };
  if (Array.isArray(oldValue) || Array.isArray(newValue)) {
    const status = (_.isEqual(oldValue, newValue)) ? 'unchanged' : 'changed';
    node.status = status;
  } else if (!(_.has(o1, key)) || !(_.has(o2, key))) {
    const data = (!(_.has(o1, key)))
      ? { status: 'added', value: newValue }
      : { status: 'deleted', value: oldValue };
    const { value, status } = data;
    node.status = status;
    if (value instanceof Object && !Array.isArray(value)) {
      node.children = childrenDiffFunc(value, value);
    }
  } else if (oldValue instanceof Object || newValue instanceof Object) {
    if (oldValue instanceof Object && newValue instanceof Object) {
      node.status = 'unchanged';
      node.children = childrenDiffFunc(oldValue, newValue);
    } else {
      const obj = (oldValue instanceof Object)
        ? oldValue
        : newValue;
      node.status = 'changed';
      node.children = childrenDiffFunc(obj, obj);
    }
  } else {
    const status = (oldValue === newValue) ? 'unchanged' : 'changed';
    node.status = status;
  }
  return node;
};

const getObjectsDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();
  const result = keys.map((key) => processNode(key, obj1, obj2, getObjectsDiff));
  return result;
};

export default getObjectsDiff;
