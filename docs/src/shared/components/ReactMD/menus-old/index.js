import React from 'react';

import MenuButtonExamples from './MenuButtonExamples';
import MenuButtonExamplesRaw from '!!raw!./MenuButtonExamples';

import './_menus.scss';

export default [{
  title: 'Menu Button Examples',
  description: `
The \`Menu\` component might not be used as much since it is generally used by existing components.
The \`Autocomplete\`, \`SelectField\` and \`MenuButton\` components use this behind the scene.

The example below shows how a menu can be linked together with a button.
  `,
  code: MenuButtonExamplesRaw,
  children: <MenuButtonExamples />,
}];
