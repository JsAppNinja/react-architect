import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { parse } from 'react-docgen';
import { kebabCase } from 'lodash/string';

import jsdocs from 'server/databases/jsdocs.json';
import { BASE_SOURCE_PATH } from 'server/constants';
import isPrivate from './isPrivate';
import prettifyProp from './prettifyProp';

const readFile = Promise.promisify(fs.readFile);

const CONTAINERS = ['DatePicker', 'TimePicker', 'Snackbar'];

const JSDOC_KEYS = Object.keys(jsdocs);
const regex = new RegExp(`static (${JSDOC_KEYS.join('|')})`, 'g');

function getEnums(source) {
  const matches = source.match(regex);
  if (matches) {
    return matches.reduce((enums, match) => {
      const name = match.replace('static ', '');
      const jsdoc = jsdocs[name];
      if (jsdoc) {
        enums.push(jsdoc);
      }

      return enums;
    }, []);
  }

  return [];
}

function getParams(parameters, file, method) {
  if (!parameters) {
    return [];
  }

  return parameters.map(({ name, description, type, optional }) => {
    if (!type) {
      throw new Error(`There is no defined param type for \`${file}\`'s method \`${method}\` param \`${name}\`. Please add one.`);
    }

    return {
      name,
      description,
      type: type.name,
      required: !optional,
    };
  });
}

function getMethods(componentMethods, file) {
  return componentMethods.reduce((methods, { name, params, returns, description, modifiers }) => {
    if (!isPrivate(name)) {
      if (!description) {
        throw new Error(`There is no documentation for \`${file}\`'s method \`${name}\`. Please add one.`);
      } else if (returns && returns.type === null) {
        throw new Error(`There is no defined return type for \`${file}\`'s method \`${name}\`. Please add one.`);
      }

      methods.push({
        name,
        type: modifiers.length ? 'function' : 'getter',
        description,
        returns: returns ? { description: returns.description, type: returns.type.name } : null,
        params: getParams(params, file, name),
      });
    }

    return methods;
  }, []);
}

export async function createComponentDocgen(folder, fullPath, file, customPropTypes) {
  const fileName = `${file}${CONTAINERS.indexOf(file) !== -1 ? 'Container' : ''}.js`;

  try {
    const source = await readFile(path.join(fullPath, fileName), 'UTF-8');
    const { description, methods: allMethods, props } = await parse(source.replace(/ComposedComponent => /, ''));
    const { methods, getters, enums } = getEnums(source).concat(getMethods(allMethods, file)).reduce((types, type) => {
      switch (type.type) {
        case 'function':
          types.methods.push(type);
          break;
        case 'getter':
          types.getters.push(type);
          break;
        case 'constant':
          types.enums.push(type);
          break;
        default:
          types.methods.push(type);
      }

      return types;
    }, { methods: [], getters: [], enums: [] });
    return {
      id: kebabCase(file),
      source: `${BASE_SOURCE_PATH}/src/js/${folder}/${fileName}`,
      component: file,
      methods,
      enums,
      getters,
      props: Object.keys(props).reduce((list, propName) => {
        const prop = props[propName];
        if (!isPrivate(propName) && !prop.description.match(/@access private/)) {
          list.push(prettifyProp(prop, propName, customPropTypes, file));
        }

        return list;
      }, []),
      description,
    };
  } catch (e) {
    throw new Error(`There was an error creating docgen for \`${fileName}\`. ${e.message}`);
  }
}

export default async function createComponentsDocgen({ folder, fullPath, components }, customPropTypes) {
  const docgens = await Promise.all(components.map(component => createComponentDocgen(folder, fullPath, component, customPropTypes)));
  return {
    docgens,
    group: kebabCase(folder),
  };
}
