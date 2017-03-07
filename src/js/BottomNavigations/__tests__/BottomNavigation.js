/* eslint-env jest */
jest.unmock('../BottomNavigation');
jest.unmock('../../Dialogs/Dialog');

import React from 'react';
import { shallow } from 'enzyme';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import BottomNavigation from '../BottomNavigation';
import Dialog from '../../Dialogs/Dialog';
import Portal from '../../Helpers/Portal';

describe('BottomNavigation', () => {
  it('should inherit the dialog\'s renderNode context', () => {
    const links = [{ label: '' }, { label: '' }, { label: '' }];
    const dialog = renderIntoDocument(<Dialog id="test"><BottomNavigation links={links} /></Dialog>);
    const bottomNav = findRenderedComponentWithType(dialog, BottomNavigation);
    expect(bottomNav.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  it('should not render in the Portal component by default', () => {
    const links = [{ label: '' }, { label: '' }, { label: '' }];
    const nav = shallow(<BottomNavigation links={links} />);
    expect(nav.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    const links = [{ label: '' }, { label: '' }, { label: '' }];
    const nav = shallow(<BottomNavigation links={links} portal />);
    expect(nav.find(Portal).length).toBe(1);
  });
});

