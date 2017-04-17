import React, { PureComponent, Children, isValidElement, cloneElement } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import Collapse from '../Helpers/Collapse';
import FontIcon from '../FontIcons';

/**
 * The `BottomNav` component is used for rendering the navigation tab/link in the `BottomNavigation`
 * component.
 */
export default class BottomNav extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    active: PropTypes.bool,
    fixed: PropTypes.bool,
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    label: PropTypes.node.isRequired,
    colored: PropTypes.bool,
    iconChildren: PropTypes.node,
    iconClassName: PropTypes.string,
    onClick: PropTypes.func,
    onNavChange: PropTypes.func,
    role: PropTypes.string,
    animate: PropTypes.bool,
  };

  static defaultProps = {
    component: 'a',
    role: null,
  };

  _handleClick = (e) => {
    const { onClick, onNavChange, index } = this.props;
    if (onClick) {
      onClick(index, e);
    }

    if (onNavChange) {
      onNavChange(index, e);
    }
  };

  render() {
    const {
      active,
      fixed,
      className,
      iconClassName,
      iconChildren,
      colored,
      animate,
      /* eslint-disable no-unused-vars */
      index,
      label: propLabel,
      onClick,
      onNavChange,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { label } = this.props;
    const labelClassName = cn('md-bottom-nav-label', { 'md-bottom-nav-label--shifting-inactive': !active && !fixed });
    if (Children.count(label) === 1 && isValidElement(label)) {
      const labelEl = Children.only(label);
      label = cloneElement(label, {
        className: cn(labelClassName, labelEl.props.className),
      });
    } else {
      label = <div className={labelClassName}>{label}</div>;
    }

    return (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._handleClick}
        className={cn('md-bottom-nav', {
          'md-bottom-nav--active': active,
          'md-bottom-nav--fixed': fixed,
          'md-bottom-nav--shifting': !fixed,
          'md-bottom-nav--shifting-active': !fixed && active,
          'md-bottom-nav--shifting-inactive': !fixed && !active,
          'md-text': !active && !colored,
          'md-text--theme-primary': active && !colored,
        }, className)}
      >
        <FontIcon iconClassName={iconClassName} className="md-icon--inherit">{iconChildren}</FontIcon>
        <Collapse collapsed={!fixed && !active} animate={animate}>
          {label}
        </Collapse>
      </AccessibleFakeInkedButton>
    );
  }
}
