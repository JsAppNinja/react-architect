import { LOAD_DOCUMENTATION } from 'constants/ActionTypes';
import { toJsonName, toTitle } from 'utils/StringUtils';

export function loadDocumentation(component, section) {
  return (dispatch, getState) => {
    let name = toTitle(component);
    if (section) {
      name += ` ${toTitle(section)}`;
    }

    name = name.replace(' Selection Controls', '');

    if (getState().documentation.name === name) {
      return;
    }

    // Have to copy for client and other cuz wepback whines otherwise.
    if (__CLIENT__) {
      require.ensure([], require => {
        const folder = (section ? `${section}/` : '') + component;
        const docgens = require(`docgens/${toJsonName(section ? `${component}-${section}` : component)}`);

        // Unable to resolve folder names as index.js for some reason
        const examples = require(`examples/${folder}/index.js`).default;
        const description = require(`examples/${folder}/README.md`);

        if (section === 'pickers') {
          // Hack to show DateTimeFormat defaultValue on pickers.
          docgens[0].props.DateTimeFormat.defaultValue = {
            computed: false,
            value: 'Intl.DateTimeFormat || (locales, options) => { format: date => date }',
          };
        }

        dispatch({
          type: LOAD_DOCUMENTATION,
          payload: {
            name,
            description,
            docgens,
            examples,
          },
        });
      });
    } else {
      const folder = (section ? `${section}/` : '') + component;
      const docgens = require(`docgens/${toJsonName(section ? `${component}-${section}` : component)}`);

      // Unable to resolve folder names as index.js for some reason
      const examples = require(`examples/${folder}/index.js`).default;
      const description = require(`examples/${folder}/README.md`);

      if (section === 'pickers') {
        // Hack to show DateTimeFormat defaultValue on pickers.
        docgens[0].props.DateTimeFormat.defaultValue = {
          computed: false,
          value: 'Intl.DateTimeFormat || (locales, options) => { format: date => date }',
        };
      }

      dispatch({
        type: LOAD_DOCUMENTATION,
        payload: {
          name,
          description,
          docgens,
          examples,
        },
      });
    }
  };
}
