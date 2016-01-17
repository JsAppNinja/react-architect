import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import { githubHref } from '../utils';
import * as components from '../components';
import Toolbar, { ActionArea } from 'react-md/Toolbars';
import Avatar from 'react-md/Avatar';
import FontIcon from 'react-md/FontIcon';
import { IconButton } from 'react-md/Buttons';
import Sidebar from 'react-md/Sidebar';
import { List, ListItem, ListSubheader } from 'react-md/Lists';
import Divider from 'react-md/Divider';
import { isMobile } from 'react-md/utils';

import './_app.scss';

const componentLinks = Object.keys(components).map(k => {
  if(!components[k] || !components[k].name) { return; }

  const name = k.split(/(?=[A-Z])/);
  return {
    link: 'components/' + name.map(n => n.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(l => !!l);

export default class App extends Component {
  constructor(props) {
    super(props);

    // Not home and not a media device
    const isOpen = props.location.pathname !== '/' && !isMobile;
    this.state = { isOpen };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
  };

  componentWillUpdate({ location }, { isOpen }) {
    const { pathname } = this.props.location;
    if(pathname === location.pathname) { return; }

    const isRoot = location.pathname === '/';
    if(!isRoot && !isOpen && !isMobile) {
      this.setState({ isOpen: true });
    } else if(isRoot && isOpen || isMobile) {
      setTimeout(() => {
        this.setState({ isOpen: false });
      }, 150);
    }
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleItemClick = (link) => {
    if(this.props.location.pathname !== link) {
      window.scrollTo(0, 0);
    }
  };

  render() {
    const pathname = this.props.location.pathname;
    return (
      <div className="react-md-docs">
        <Toolbar
          primary
          fixed
          title="react md"
          className="react-md-docs-toolbar"
          menuButton={<IconButton onClick={this.toggleMenu}>menu</IconButton>}
          actionsRight={(
            <ActionArea>
              <IconButton href={githubHref} iconClassName="fa fa-github" />
            </ActionArea>
          )}
        />
        <Sidebar isOpen={this.state.isOpen} className="main-sidebar">
          <List>
            <ListItem
              component={Link}
              className={'/' === pathname ? 'active' : null}
              to="/"
              primaryText="Home"
              key={'home-link'}
              leftIcon={<FontIcon>home</FontIcon>}
            />
            <ListItem
              component="a"
              primaryText="SASS Doc"
              href="/sassdoc"
              key="sassdoc"
              leftAvatar={<Avatar src="/imgs/sass-icon.png" alt="SASS Icon" />}
            />
            <Divider />
            <ListSubheader primaryText="Components" />
          </List>
          <List className="scrollable">
            {componentLinks.map(({ link, label }) => {
              return (
              <ListItem
                component={Link}
                to={`/${link}`}
                className={classnames({ 'active': `/${link}` === pathname })}
                key={link}
                primaryText={label}
                onClick={this.handleItemClick.bind(this, link)}
              />
              );
            })}
          </List>
        </Sidebar>
        <main className={classnames({ 'active': this.state.isOpen })}>
          {this.props.children}
        </main>
      </div>
    );
  }
}
