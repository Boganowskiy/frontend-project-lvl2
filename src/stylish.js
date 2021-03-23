const prefixes = {
  added: '  + ',
  deleted: '  - ',
  unchanged: '    ',
};

const formatObj = (ind, status, key, oldV, newV, children) => {
  if (status === 'changed') {
    if (oldV instanceof Object) {
      return `
${ind}${prefixes.deleted}${key}: {${children}
${prefixes.unchanged}${ind}}
${ind}${prefixes.added}${key}: ${newV}`;
    }
    return `
${ind}${prefixes.deleted}${key}: ${oldV}
${ind}${prefixes.added}${key}: {${children}
${prefixes.unchanged}${ind}}`;
  }

  return `
${ind}${prefixes[status]}${key}: {${children}
${prefixes.unchanged}${ind}}`;
};

const formatPrimitive = {
  added: (ind, key, _oldV, newV) => `
${ind}${prefixes.added}${key}: ${newV}`,

  deleted: (ind, key, oldV) => `
${ind}${prefixes.deleted}${key}: ${oldV}`,

  unchanged: (ind, key, oldV) => `
${ind}${prefixes.unchanged}${key}: ${oldV}`,

  changed: (ind, key, oldV, newV) => `
${ind}${prefixes.deleted}${key}: ${oldV}
${ind}${prefixes.added}${key}: ${newV}`,
};

const stylish = (ast) => {
  const iter = (node, depth) => {
    const {
      key, status, oldValue, newValue, children,
    } = node;
    const currentIndent = prefixes.unchanged.repeat(depth);
    if (children) {
      const childrenArr = children.flatMap((child) => iter(child, depth + 1)).join('');
      return formatObj(currentIndent, status, key, oldValue, newValue, childrenArr);
    }
    const oldV = (oldValue && Array.isArray(oldValue)) ? `[ ${oldValue} ]` : oldValue;
    const newV = (newValue && Array.isArray(newValue)) ? `[ ${newValue} ]` : newValue;
    return formatPrimitive[status](currentIndent, key, oldV, newV);
  };
  const resArr = ast.map((child) => iter(child, 0));
  return `{${resArr.join('')}
}`;
};

export default stylish;
