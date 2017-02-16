import { buildSassDocLink } from './buildSassDocList';

const GITHUB_URL = require('../../../package.json').bugs.url.replace('/issues', '');

export default function transformSassdocVariable(sassdoc) {
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
  } = sassdoc;

  let { code } = sassdoc.context;

  if (!code) {
    code = `$${name}: ${value}${scope === 'default' ? ' !default' : ''};`;
  } else if (type === 'placeholder') {
    code = `%${name} {${code}}`;
  }

  let { see } = sassdoc;
  if (see && see.length) {
    see = see.map(buildSassDocLink);
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
    usedBy: usedBy ? usedBy.map(buildSassDocLink) : [],
    path: `${GITHUB_URL}/blob/master/src/scss/${path}`,
  };
}
