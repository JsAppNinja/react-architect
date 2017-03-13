/* eslint-env jest */
/* eslint-disable max-len */
jest.unmock('../NavigationDrawer');
jest.unmock('../../Dialogs/Dialog');
jest.unmock('../../Drawers/Drawer');
jest.unmock('../../Drawers/DrawerTypes');
jest.unmock('../../Drawers/isType');

import React from 'react';
import { mount } from 'enzyme';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import NavigationDrawer from '../NavigationDrawer';
import Drawer from '../../Drawers/Drawer';
import Dialog from '../../Dialogs/Dialog';
import Portal from '../../Helpers/Portal';

describe('NavigationDrawer', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog id="test"><NavigationDrawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, NavigationDrawer);
    expect(drawer.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  it('should not render in the Portal component by default', () => {
    const MATCH_MEDIA = window.matchMedia;
    window.matchMedia = jest.fn(() => ({ matches: false }));
    const drawer = mount(<NavigationDrawer />);
    expect(drawer.find(Portal).length).toBe(0);

    window.matchMedia = MATCH_MEDIA;
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    const drawer = mount(<NavigationDrawer portal />);
    expect(drawer.find(Portal).length).toBe(1);
  });

  describe('Drawer', () => {
    const MATCH_MEDIA = window.matchMedia;
    const matchesMobile = jest.fn(query => ({
      matches: query.indexOf(Drawer.defaultProps.mobileMinWidth) !== -1,
    }));
    const matchesTablet = jest.fn(query => ({
      matches: query.indexOf(Drawer.defaultProps.tabletMinWidth) !== -1,
    }));
    const matchesDesktop = jest.fn(query => ({
      matches: query.indexOf('max') === -1
        && query.indexOf(Drawer.defaultProps.desktopMinWidth) !== -1,
    }));
    afterAll(() => {
      window.matchMedia = MATCH_MEDIA;
    });

    it('should correctly set the default visibility on mobile devices', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on tablets', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesTablet;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(false);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.PERSISTENT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.DrawerTypes.PERSISTENT, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly set the default visibility on desktop', () => {
      const props = {
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.PERSISTENT,
        desktopDrawerType: Drawer.DrawerTypes.FULL_HEIGHT,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      const drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.FULL_HEIGHT);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.DrawerTypes.FULL_HEIGHT, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(1);
      expect(props.onVisibilityToggle).toBeCalledWith(true);
    });

    it('should not update the visibility to false when the defaultVisible prop is enabled and the drawer type is temporary for any screen size', () => {
      const props = {
        defaultVisible: true,
        navItems: [],
        mobileDrawerType: Drawer.DrawerTypes.TEMPORARY,
        tabletDrawerType: Drawer.DrawerTypes.TEMPORARY,
        desktopDrawerType: Drawer.DrawerTypes.TEMPORARY,
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesMobile;
      let drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(0);
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);

      window.matchMedia = matchesTablet;
      drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(1);
      expect(props.onMediaTypeChange).toBeCalledWith(props.tabletDrawerType, { mobile: false, tablet: true, desktop: false });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);

      window.matchMedia = matchesDesktop;
      drawer = renderIntoDocument(<NavigationDrawer {...props} />);
      expect(drawer.state.visible).toBe(true);
      expect(drawer.state.drawerType).toBe(NavigationDrawer.DrawerTypes.TEMPORARY);
      expect(props.onMediaTypeChange.mock.calls.length).toBe(2);
      expect(props.onMediaTypeChange).toBeCalledWith(props.desktopDrawerType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle.mock.calls.length).toBe(0);
    });

    it('should correctly update the visibility when the visible prop was defined and there was a media type change with visibility', () => {
      const props = {
        visible: false,
        defaultMedia: 'mobile',
        onMediaTypeChange: jest.fn(),
        onVisibilityToggle: jest.fn(),
      };

      window.matchMedia = matchesDesktop;
      renderIntoDocument(<NavigationDrawer {...props} />);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.defaultProps.desktopDrawerType, { mobile: false, tablet: false, desktop: true });
      expect(props.onVisibilityToggle).toBeCalledWith(true);

      window.matchMedia = matchesMobile;
      renderIntoDocument(<NavigationDrawer {...props} visible defaultMedia="desktop" />);
      expect(props.onMediaTypeChange).toBeCalledWith(NavigationDrawer.defaultProps.mobileDrawerType, { mobile: true, tablet: false, desktop: false });
      expect(props.onVisibilityToggle).toBeCalledWith(true);
    });
  });
});
