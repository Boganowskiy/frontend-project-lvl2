import _ from 'lodash';

const getStartOfString = (fullPath) => `Property '${fullPath}' was`;

const tailsOfString = {
  added: (newV) => ` added with value: ${newV}`,
  removed: () => ' removed',
  updated: (oldV, newV) => ` updated. From ${oldV} to ${newV}`,
  unchanged: () => '',
};

const getOutputString = (status, path, oldValue, newValue) => {
  if (status === 'unchanged') return '';
  const startPart = getStartOfString(path);
  const endPart = tailsOfString[status](oldValue, newValue);
  const resultString = `${startPart}${endPart}`;
  return resultString;
};

const getValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlainFormatted = (ast) => {
  const iter = (node, path) => {
    const {
      key, status, value, newValue, children,
    } = node;
    const currentPath = path.length === 0 ? `${key}` : `${path}.${key}`;
    const val = getValue(value);
    const newV = getValue(newValue);
    if (children) {
      const currentOutput = getOutputString(status, currentPath, val, newV);
      const childrenOutputsArr = children.flatMap((child) => iter(child, currentPath));
      const filteredChildrenOutputs = childrenOutputsArr.filter((output) => output.length !== 0);
      return `${currentOutput}${filteredChildrenOutputs.join('\n')}`;
    }
    return getOutputString(status, currentPath, val, newV);
  };
  const resArr = ast.map((child) => iter(child, ''));
  return `${resArr.join('\n')}`;
};

export default getPlainFormatted;
