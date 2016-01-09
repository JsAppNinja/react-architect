import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';
import FontIcon from '../FontIcon';
import Ink from '../Ink';

export default class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    tooltipPosition: PropTypes.string,
    tooltip: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'button',
  };

  render() {
    const { iconClassName, children, className, href, type, ...props } = this.props;
    let btnProps = {
      ...props,
      className: classnames(className, 'md-btn', 'md-btn-icon'),
    };

    if(href) {
      btnProps.href = href;
    } else {
      btnProps.type = type;
    }

    return React.createElement(href ? 'a' : 'button', btnProps, [
      <Ink key="ink" disabled={isPropEnabled(props, 'disabled')} />,
      <FontIcon key="icon" iconClassName={iconClassName}>{children}</FontIcon>,
    ]);
  }
}
