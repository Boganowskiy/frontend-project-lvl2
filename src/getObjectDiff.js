import _ from 'lodash';

const getObjectsDiff = (obj1, obj2) => {
  const buildAst = (o1, o2) => {
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    const keys = _.union(keys1, keys2).sort();
    const result = keys.reduce((acc, key) => {
      const oldValue = o1[key];
      const newValue = o2[key];
      const status = 'unchanged';
      const node = {
        key, status, oldValue, newValue,
      };
      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        const newStatus = (_.isEqual(oldValue, newValue)) ? status : 'changed';
        return [...acc, { ...node, status: newStatus }];
      }
      if (!(_.has(o1, key)) || !(_.has(o2, key))) {
        const data = (!(_.has(o1, key)))
          ? { newStatus: 'added', value: newValue }
          : { newStatus: 'deleted', value: oldValue };
        const { value, newStatus } = data;
        const newNodeData = { status: newStatus };
        if (value instanceof Object && !Array.isArray(value)) {
          newNodeData.children = buildAst(value, value);
        }
        return [...acc, { ...node, ...newNodeData }];
      }
      if (oldValue instanceof Object || newValue instanceof Object) {
        if (oldValue instanceof Object && newValue instanceof Object) {
          return [...acc, { ...node, children: buildAst(oldValue, newValue) }];
        }
        const obj = (oldValue instanceof Object)
          ? oldValue
          : newValue;
        return [...acc, {
          ...node, status: 'changed', children: buildAst(obj, obj),
        }];
      }
      if (oldValue === newValue) {
        return [...acc, node];
      }
      return [...acc, {
        ...node, status: 'changed', oldValue, newValue,
      }];
    }, []);
    return result;
  };
  return buildAst(obj1, obj2);
};

export default getObjectsDiff;
