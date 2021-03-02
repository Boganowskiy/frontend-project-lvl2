import yaml from 'js-yaml';

export default {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};
