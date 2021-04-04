import _ from 'lodash';

const getStartOfString = (fullPath) => `Property '${fullPath}' was`;

const tailsOfString = {
  added: (_oldV, newV) => ` added with value: ${newV}`,
  removed: () => ' removed',
  updated: (oldV, newV) => ` updated. From ${oldV} to ${newV}`,
  unchanged: () => '',
};

const outputString = (status, path, oldValue, newValue) => {
  if (status === 'unchanged') return '';
  const startPart = getStartOfString(path);
  const endPart = tailsOfString[status](oldValue, newValue);
  const resultString = `${startPart}${endPart}`;
  return resultString;
};

const isComplexValue = (value) => value instanceof Object && !Array.isArray(value);

const getValue = (value) => {
  if (isComplexValue(value)) {
    return '[complex value]';
  }
  if (Array.isArray(value)) {
    return `[ ${value} ]`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlainFormatted = (ast) => {
  const iter = (node, path) => {
    const {
      key, status, oldValue, newValue, children,
    } = node;
    const currentPath = path.length === 0 ? `${key}` : `${path}.${key}`;
    const oldV = getValue(oldValue);
    const newV = getValue(newValue);
    if (children) {
      const currentOutput = outputString(status, currentPath, oldV, newV);
      const childrenOutputsArr = children.flatMap((child) => iter(child, currentPath));
      const filteredChildrenOutputs = childrenOutputsArr.filter((output) => output.length !== 0);
      return `${currentOutput}${filteredChildrenOutputs.join('\n')}`;
    }
    return outputString(status, currentPath, oldV, newV);
  };
  const resArr = ast.map((child) => iter(child, ''));
  return `${resArr.join('\n')}`;
};

export default getPlainFormatted;
