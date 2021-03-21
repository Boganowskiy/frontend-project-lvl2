const prefixes = {
  added: '  + ',
  deleted: '  - ',
  unchanged: '    ',
};

const objStyle = {
  added: (ind, key, _oldV, _newV, children) => `
${ind}${prefixes.added}${key}: {${children}
${prefixes.unchanged}${ind}}`,
  deleted: (ind, key, _oldV, _newV, children) => `
${ind}${prefixes.deleted}${key}: {${children}
${prefixes.unchanged}${ind}}`,
  unchanged: (ind, key, _oldV, _newV, children) => `
${ind}${prefixes.unchanged}${key}: {${children}
${prefixes.unchanged}${ind}}`,

  changed: (ind, key, oldV, newV, children) => {
    if (oldV) {
      return `
${ind}${prefixes.deleted}${key}: ${oldV}
${ind}${prefixes.added}${key}: {${children}
${prefixes.unchanged}${ind}}`;
    }
    return `
${ind}${prefixes.deleted}${key}: {${children}
${prefixes.unchanged}${ind}}
${ind}${prefixes.added}${key}: ${newV}`;
  },
};

const style = {
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
    if (!children) {
      const oldV = (oldValue && Array.isArray(oldValue)) ? `[ ${oldValue} ]` : oldValue;
      const newV = (newValue && Array.isArray(newValue)) ? `[ ${newValue} ]` : newValue;
      return style[status](currentIndent, key, oldV, newV);
    }

    if (children) {
      return objStyle[status](currentIndent, key, oldValue, newValue, children.flatMap((child) => (
        iter(child, depth + 1))).join(''));
    }
    return style[status](currentIndent, key, oldValue, newValue);
  };
  const resArr = ast.map((child) => iter(child, 0));
  return `{${resArr.join('')}
}`;
};

export default stylish;
