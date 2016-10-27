import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

import toTitle from 'utils/StringUtils/toTitle';
import flatten from 'utils/ListUtils/flatten';
import googleLogo from '../imgs/googleLogo.svg';
import reactLogo from '../imgs/reactLogo.svg';


function mapToNavItems(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;
  if (typeof route === 'string') {
    return {
      component: IndexLink,
      to: `${prefix}${route}`,
      className: 'md-text-capitalize',
      primaryText: toTitle(route).replace(' Helper', 's'),
    };
  }

  const {
    divider,
    subheader,
    path,
    primaryText,
    icon,
    avatarProps,
    nestedItems,
    component,
    ...props,
  } = route;

  if (divider) {
    return { divider, ...props };
  } else if (subheader) {
    return {
      primaryText,
      subheader,
      ...props,
    };
  }

  let resolvedNestedItems;
  let resolvedIcon;
  let resolvedAvatar;
  let resolvedComponent;
  if (nestedItems) {
    resolvedNestedItems = nestedItems.map(route => mapToNavItems(route, parents.length ? [...parents, path] : [path]));
  }

  if (icon) {
    resolvedIcon = <FontIcon>{icon}</FontIcon>;
  }

  if (avatarProps) {
    resolvedAvatar = <Avatar {...avatarProps} iconSized />;
  }

  if (component) {
    resolvedComponent = component;
  } else if (props.href) {
    resolvedComponent = 'a';
  } else if (!nestedItems) {
    resolvedComponent = Link;
  }

  let to;
  if (typeof path !== 'undefined' && !nestedItems) {
    to = `${prefix}${path}`;
  }

  return {
    ...props,
    to,
    className: 'md-text-capitalize',
    component: resolvedComponent,
    leftIcon: resolvedIcon,
    leftAvatar: resolvedAvatar,
    nestedItems: resolvedNestedItems,
    primaryText: primaryText || toTitle(path),
  };
}

const routes = [{
  path: 'getting-started',
  icon: 'info_outline',
  nestedItems: ['prerequisites', 'installation'],
}, {
  path: 'customization',
  icon: 'color_lens',
  nestedItems: [
    'colors',
    'themes',
    'media-queries',
    'grids',
    'typography',
  ],
}, {
  path: 'discover-more',
  icon: 'search',
  nestedItems: ['whats-new', 'upgrade-guides', 'comminutiy', 'contributing'],
}, {
  path: 'components',
  icon: 'build',
  nestedItems: [
    'autocompletes',
    'avatars',
    'bottom-navigations',
    'buttons',
    'cards',
    'chips',
    'data-tables',
    'dialogs',
    'dividers',
    'drawers',
    'expansion-panels',
    'file-inputs',
    'font-icons', {
      path: 'helpers',
      nestedItems: [
        'accessible-fake-button',
        'collapse',
        'focus-container',
        'icon-separator',
        'portal',
      ],
    }, 'lists',
    'inks',
    'menus',
    'navigation-drawers',
    'papers', {
      path: 'pickers',
      nestedItems: ['date', 'time'],
    }, {
      path: 'progress',
      nestedItems: ['circular', 'linear'],
    }, 'select-fields', {
      path: 'selection-controls',
      nestedItems: ['selection-control', 'checkboxes', 'radios', 'switches'],
    },
    'sliders',
    'snackbars',
    'subheaders',
    'tabs',
    'text-fields',
    'toolbars',
    'tooltips',
  ],
}, { divider: true }, {
  subheader: true,
  primaryText: 'References',
}, {
  href: 'https://facebook.github.io/react/',
  avatarProps: { src: reactLogo, alt: 'React Logo' },
  primaryText: 'React',
  target: '_blank',
}, {
  href: 'https://www.google.com/design/spec/material-design/introduction.html',
  avatarProps: { src: googleLogo, alt: 'Google Logo', className: 'google-logo' },
  primaryText: 'Material Design',
  target: '_blank',
}, {
  href: 'https://design.google.com/icons/',
  avatarProps: { src: googleLogo, alt: 'Google Logo', className: 'google-logo' },
  primaryText: 'Material Icons',
  target: '_blank',
}].map(route => mapToNavItems(route));

routes.unshift({
  to: '/',
  key: 'home',
  primaryText: 'Home',
  component: IndexLink,
  leftIcon: <FontIcon>home</FontIcon>,
});

export default routes;
export const FIRST_ROUTE = 'components/autocompletes';


function extractRealRoutes(route) {
  if (route.nestedItems) {
    return route.nestedItems.map(extractRealRoutes);
  } else if (route.to && route.to !== '/') {
    const { primaryText, to } = route;

    return { primaryText, to };
  }

  return null;
}

export const quickNavRoutes = flatten(routes.map(extractRealRoutes)).filter(r => !!r);
