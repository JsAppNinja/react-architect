const GITHUB_URL = require('../../../package.json').bugs.url.replace('/issues', '');

module.exports = function transformSassdocVariable(sassdoc, file) {
  const {
    context: {
      name,
      type,
      value,
      scope,
    },
    description,
    usedBy,
    file: { path },
    type: variableType,
    example: examples,
    link: links,
    see,
  } = sassdoc;

  let { code } = sassdoc.context;

  if (!code) {
    code = `$${name}: ${value}${scope === 'default' ? ' !default' : ''};`;
  }

  return {
    name,
    type,
    variableType,
    code,
    description,
    links,
    examples,
    see,
    usedBy: usedBy ? usedBy.map(({ context: { type, name } }) => ({ type, name })) : [],
    path: `${GITHUB_URL}/blob/master/src/scss/${path}`,
  };
};
