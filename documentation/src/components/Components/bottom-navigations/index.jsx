import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import Fixed from './Fixed';
import FixedRaw from './Fixed/code';
import Shifting from './Shifting';
import ShiftingRaw from './Shifting/code';

import README from './README.md';

const examples = [{
  title: 'Fixed BottomNavigation',
  description: `
This example shows a fixed BottomNavigation. This means that all the labels and icons will always be visible
instead of dynamically hiding when the user scrolls or only showing the label for the active tab. The
active tab will change its color to the \`$md-primary-color\` and increase the font size to show prominence.
When a tab is clicked, the ink effect will only stay within the tab itself.

When using the \`BottomNavigation\`, you can apply the \`.md-bottom-navigation-offset\` class name to an element
to add \`padding-bottom\` to offset the content for the \`BottomNavigation\`.
  `,
  code: FixedRaw,
  children: <Fixed />,
}, {
  title: 'Shifting BottomNavigation',
  description: `
This example shows a shifting BottomNavigation. This means that only the active tab will display a label. With
the help of the \`react-md-theme-bottom-navigations-colored\` mixin, you can even have the theme of the bottom
navigation change with each click. Just for funs.

If you have a mobile device or an emulator, this example also shows off the \`dynamic\` version of the bottom navigation.
When the user scrolls down the page, the navigation will hide. The navigation can be viewed again after a small scroll
upwards.

> NOTE: The \`BottomNavigation\` is a **MOBILE ONLY** component so it only has event listeners for touch events.
  `,
  code: ShiftingRaw,
  children: <Shifting />,
}];

const BottomNavigations = () => <ExamplesPage description={README} examples={examples} className="bottom-navigations" />;
export default BottomNavigations;
