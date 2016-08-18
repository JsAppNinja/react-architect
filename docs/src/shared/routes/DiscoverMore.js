const childRoutes = ['community', 'contributing'].map(route => ({
  path: route,
  getComponent(nextState, cb) {
    require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
  },
}));

export default {
  path: 'discover-more',
  indexRoute: {
    onEnter(params, replace) {
      replace('/discover-more/community');
    },
  },
  childRoutes,
};
