import { LOAD_DOCUMENTATION } from 'constants/ActionTypes';
import { toJsonName } from 'utils/StringUtils';

export function loadDocumentation(component, section) {
  return (dispatch) => {
    require.ensure([], require => {
      const folder = (section ? `${section}/` : '') + component;
      const docgens = require(`docgens/${toJsonName(section ? `${component}-${section}` : component)}`);

      // Unable to resolve folder names as index.js for some reason
      const examples = require(`examples/${folder}/index.js`).default;
      const description = require(`examples/${folder}/README.md`);

      dispatch({
        type: LOAD_DOCUMENTATION,
        payload: {
          component,
          section,
          description,
          docgens,
          examples,
        },
      });
    });
  };
}
