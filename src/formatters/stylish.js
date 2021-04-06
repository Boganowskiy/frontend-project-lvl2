const prefixes = {
  added: '  + ',
  removed: '  - ',
  unchanged: '    ',
};

const formatObj = (ind, status, key, value, newV, children) => {
  if (status === 'updated') {
    if (value instanceof Object) {
      return `
${ind}${prefixes.removed}${key}: {${children}
${prefixes.unchanged}${ind}}
${ind}${prefixes.added}${key}: ${newV}`;
    }
    return `
${ind}${prefixes.removed}${key}: ${value}
${ind}${prefixes.added}${key}: {${children}
${prefixes.unchanged}${ind}}`;
  }

  return `
${ind}${prefixes[status]}${key}: {${children}
${prefixes.unchanged}${ind}}`;
};

const formatPrimitive = {
  added: (ind, key, value) => `
${ind}${prefixes.added}${key}: ${value}`,

  removed: (ind, key, value) => `
${ind}${prefixes.removed}${key}: ${value}`,

  unchanged: (ind, key, value) => `
${ind}${prefixes.unchanged}${key}: ${value}`,

  updated: (ind, key, value, newV) => `
${ind}${prefixes.removed}${key}: ${value}
${ind}${prefixes.added}${key}: ${newV}`,
};

const getStylishFormatted = (ast) => {
  const iter = (node, depth) => {
    const {
      key, status, value, newValue, children,
    } = node;
    const currentIndent = prefixes.unchanged.repeat(depth);
    if (children) {
      return formatObj(currentIndent, status, key, value, newValue, children.flatMap((child) => (
        iter(child, depth + 1))).join(''));
    }
    return formatPrimitive[status](currentIndent, key, value, newValue);
  };
  const resArr = ast.map((child) => iter(child, 0));
  return `{${resArr.join('')}
}`;
};
export default getStylishFormatted;
