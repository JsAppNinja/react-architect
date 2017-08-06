import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class FloatingLabel extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.node,
    floating: PropTypes.bool,
    error: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    iconOffset: PropTypes.bool,
    customSize: PropTypes.string,
    htmlFor: PropTypes.string,
  };

  render() {
    const {
      label,
      htmlFor,
      className,
      floating,
      active,
      error,
      disabled,
      iconOffset,
      customSize,
      ...props
    } = this.props;

    if (!label) {
      return null;
    }

    return (
      <label
        {...props}
        htmlFor={htmlFor}
        className={cn('md-floating-label', {
          'md-text--secondary': !active && !error,
          'md-text--disabled': disabled,
          'md-text--error': !disabled && error,
          'md-text--theme-primary': !error && active,
          'md-floating-label--inactive': !floating,
          'md-floating-label--inactive-sized': !floating && !customSize,
          [`md-floating-label--${customSize}`]: customSize,
          [`md-floating-label--inactive-${customSize}`]: customSize && !floating,
          'md-floating-label--floating': floating,
          'md-floating-label--icon-offset': iconOffset,
        }, className)}
      >
        {label}
      </label>
    );
  }
}
