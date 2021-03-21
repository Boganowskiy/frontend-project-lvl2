import _ from 'lodash';

const getObjectsDiff = (obj1, obj2) => {
  const iter = (o1, o2) => {
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    const keys = _.union(keys1, keys2).sort();
    const result = keys.reduce((acc, key) => {
      const node = {
        key, status: 'unchanged', oldValue: null, newValue: null,
      };
      const value1 = o1[key];
      const value2 = o2[key];
      if (Array.isArray(value1) && Array.isArray(value2)) {
        if (_.isEqual(value1, value2)) {
          return [...acc, { ...node, oldValue: value1, newValue: value2 }];
        }
        return [...acc, {
          ...node, status: 'changed', oldValue: value1, newValue: value2,
        }];
      }
      if (!_.has(o1, key) && _.has(o2, key)) {
        if (Array.isArray(value2)) {
          return [...acc, { ...node, status: 'added', newValue: value2 }];
        }
        if (value2 instanceof Object) {
          return [...acc, { ...node, status: 'added', children: iter(value2, value2) }];
        }
        return [...acc, { ...node, status: 'added', newValue: value2 }];
      }
      if (_.has(o1, key) && !_.has(o2, key)) {
        if (Array.isArray(value1)) {
          return [...acc, { ...node, status: 'deleted', oldValue: value1 }];
        }
        if (value1 instanceof Object) {
          return [...acc, { ...node, status: 'deleted', children: iter(value1, value1) }];
        }
        return [...acc, { ...node, status: 'deleted', oldValue: value1 }];
      }

      if (value1 instanceof Object && value2 instanceof Object) {
        return [...acc, { ...node, children: iter(value1, value2) }];
      }
      if (value1 instanceof Object) {
        return [...acc, {
          ...node, status: 'changed', children: iter(value1, value1), newValue: value2,
        }];
      }
      if (value2 instanceof Object) {
        return [...acc, {
          ...node, status: 'changed', oldValue: value1, children: iter(value2, value2),
        }];
      }
      if (value1 === value2) {
        return [...acc, {
          ...node, status: 'unchanged', oldValue: value1, newValue: value2,
        }];
      }
      return [...acc, {
        ...node, status: 'changed', oldValue: value1, newValue: value2,
      }];
    }, []);
    return result;
  };
  return iter(obj1, obj2);
};

export default getObjectsDiff;
