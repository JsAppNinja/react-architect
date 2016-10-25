import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class Thumb extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    thumbLeft: PropTypes.string.isRequired,
    on: PropTypes.bool,
    off: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    dragging: PropTypes.bool,
  };

  render() {
    const {
      style,
      className,
      on,
      off,
      active,
      disabled,
      dragging,
      thumbLeft,
      ...props,
    } = this.props;

    return (
      <span
        {...props}
        style={Object.assign({}, style, { left: thumbLeft })}
        className={cn('md-slider-thumb', className, {
          'md-slider-thumb--active': active,
          'md-slider-thumb--dragging': dragging,
          'md-slider-thumb--disabled': disabled,
          'md-slider-thumb--on': on,
          'md-slider-thumb--off': off,
        })}
      />
    );
  }
}
