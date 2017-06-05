import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { withRouter } from 'react-router';
import shallowEqual from 'shallowequal';
import Helmet from 'react-helmet';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { updateMedia } from 'state/media';
import { updateLocation } from 'state/routing';
import navItems from 'constants/navItems';
import scrollRestoration from 'utils/scrollRestoration';
import Link from 'components/Link';
import DocumentationTabs from 'components/DocumentationTabs';
import Search from 'components/Search';

import Routes from './Routes';
import Footer from './Footer';

const helmetConfig = {
  htmlAttributes: { lang: 'en', class: 'custom-theme' },
  defaultTitle: 'react-md',
  titleTemplate: '%s - react-md',
};

@withRouter
@connectAdvanced((dispatch) => {
  let result;

  return (state, props) => {
    const {
      drawer,
      helmet,
      media: { defaultMedia, mobile },
    } = state;

    const nextResult = {
      ...props,
      ...drawer,
      ...helmet,
      dispatch,
      defaultMedia,
      mobile,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})
export default class App extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    defaultMedia: PropTypes.string.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    toolbarProminent: PropTypes.bool.isRequired,
    visibleBoxShadow: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
    meta: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
    link: PropTypes.arrayOf(PropTypes.shape({
      rel: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })).isRequired,

    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { history, dispatch } = this.props;
    history.listen((location) => {
      dispatch(updateLocation(location));
      if (typeof window.ga !== 'undefined') {
        window.ga('send', 'pageview', location.pathname);
      }
    });
    scrollRestoration();
  }

  componentDidUpdate() {
    scrollRestoration();
  }

  updateMedia = (drawerType, media) => {
    this.props.dispatch(updateMedia(drawerType, media));
  };

  render() {
    const {
      defaultMedia,
      toolbarTitle,
      visibleBoxShadow,
      toolbarProminent,
      mobile,
      meta,
      link,
    } = this.props;

    let tabs;
    if (!mobile && toolbarProminent) {
      tabs = <DocumentationTabs key="tabs" />;
    }

    return (
      <NavigationDrawer
        drawerId="main-navigation"
        drawerTitle="react-md"
        toolbarTitle={toolbarTitle}
        defaultMedia={defaultMedia}
        onMediaTypeChange={this.updateMedia}
        toolbarZDepth={visibleBoxShadow ? undefined : 0}
        toolbarProminent={!mobile && toolbarProminent}
        toolbarChildren={tabs}
        toolbarActions={<Search key="search" />}
        navItems={navItems.map(({ divider, subheader, ...route }) => {
          if (divider || subheader) {
            return { divider, subheader, ...route };
          }

          return <Link {...route} />;
        })}
      >
        <Helmet {...helmetConfig} title={toolbarTitle} meta={meta} link={link} />
        <Routes />
        <Footer />
      </NavigationDrawer>
    );
  }
}
