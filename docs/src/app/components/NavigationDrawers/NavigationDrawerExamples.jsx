import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';

import { RadioGroup, Radio } from 'react-md/lib/SelectionControls';
import FontIcon from 'react-md/lib/FontIcons';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
const { FULL_HEIGHT, CLIPPED, FLOATING, PERSISTENT, PERSISTENT_MINI, TEMPORARY, TEMPORARY_MINI } = NavigationDrawer.DrawerType;

// amazing way to keep state between routes
let state = {
  isOpen: false,
  drawerType: FULL_HEIGHT,
  contentNode: null,
};

const LOCATION = '/components/navigation-drawers';

export default class NavigationDrawerExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = state;
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // MINI versions doesn't stay fixed for some reason
    const contentNode = ReactDOM.findDOMNode(this).querySelector('.md-navigation-drawer-content');
    const toolbar = contentNode.querySelector('.md-navigation-drawer-toolbar');
    contentNode.addEventListener('scroll', this.fakeFixedPositioning);
    state = Object.assign({}, state, { contentNode, toolbar });
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.drawerType !== nextState.drawerType && nextState.drawerType.indexOf('mini') === -1 && state.toolbar) {
      state.toolbar.style.top = null;
    }
  }

  fakeFixedPositioning = () => {
    const { contentNode, toolbar, drawerType } = state;

    toolbar.style.top = drawerType.indexOf('mini') === -1 ? null : contentNode.scrollTop + 'px';
  };

  closeDrawer = () => {
    state = Object.assign({}, state, { isOpen: false });
    this.setState(state);
  };

  openDrawer = () => {
    state = Object.assign({}, state, { isOpen: true });
    this.setState(state);
  };

  handlePermanentTypeChange = (drawerType) => {
    state = Object.assign({}, state, { drawerType });
    this.setState(state);
  };

  getTitle = (path) => {
    switch(path) {
      case 'starred':
        return 'Starred';
      case 'sent-mail':
        return 'Sent Mail';
      case 'drafts':
        return 'Drafts';
      case 'all-mail':
        return 'All Mail';
      case 'trash':
        return 'Trash';
      case 'spam':
        return 'Spam';
      default:
        return 'Inbox';
    }
  };

  getLinkParts = (suffix) => {
    const to = `${LOCATION}/${suffix}`;
    return {
      to,
      component: Link,
      activeClassName: 'active',
      primaryText: this.getTitle(suffix),
    };
  };

  render() {
    const { isOpen, drawerType } = this.state;

    const currentPath = this.props.location.pathname.replace(LOCATION, '').replace('/', '');
    const navItems = [{
      leftIcon: <FontIcon>move_to_inbox</FontIcon>,
      primaryText: 'Inbox',
      component: Link,
      className: this.props.location.pathname === LOCATION ? 'active' : null,
      to: LOCATION,
    }, {
      leftIcon: <FontIcon>star</FontIcon>,
      ...this.getLinkParts('starred'),
    }, {
      leftIcon: <FontIcon>send</FontIcon>,
      ...this.getLinkParts('sent-mail'),
    }, {
      leftIcon: <FontIcon>drafts</FontIcon>,
      ...this.getLinkParts('drafts'),
    }, {
      divider: true,
    }, {
      leftIcon: <FontIcon>mail</FontIcon>,
      ...this.getLinkParts('all-mail'),
    }, {
      leftIcon: <FontIcon>delete</FontIcon>,
      ...this.getLinkParts('trash'),
    }, {
      leftIcon: <FontIcon>error_outline</FontIcon>,
      ...this.getLinkParts('spam'),
    }];

    if(drawerType === TEMPORARY_MINI && !isOpen) {
      navItems.unshift({
        leftIcon: <FontIcon>keyboard_arrow_right</FontIcon>,
        onClick: this.openDrawer,
      });
    }
    return (
      <div className="drawer-container">
        <NavigationDrawer
          title="Title"
          toolbarTitle={this.getTitle(currentPath)}
          isOpen={isOpen}
          closeDrawer={this.closeDrawer}
          openDrawer={this.openDrawer}
          drawerType={drawerType}
          navItems={navItems}
        >
          <div style={{ padding: '1em' }}>
            <h3 className="md-subheading-1">Change <code>drawerType</code></h3>
            <RadioGroup value={drawerType} onChange={this.handlePermanentTypeChange}>
              <Radio label="Full height" value={FULL_HEIGHT} />
              <Radio label="Clipped" value={CLIPPED} />
              <Radio label="Floating" value={FLOATING} />
              <Radio label="Persistent" value={PERSISTENT} />
              <Radio label="Persistent mini" value={PERSISTENT_MINI} />
              <Radio label="Temporary" value={TEMPORARY} />
              <Radio label="Temporary mini" value={TEMPORARY_MINI} />
            </RadioGroup>
          </div>
          {this.props.children}
        </NavigationDrawer>
      </div>
    );
  }
}
