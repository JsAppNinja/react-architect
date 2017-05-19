import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

const DISABLED_INTERACTIONS = ['mouse'];

/**
 * This is the `Thumb` for the switch. The `ink` in the Thumb is only active on touch and keyboard
 * interactions, so the `AccessibleFakeInkButton` does not work for this case.
 *
 * This component really just is used for custom inkage.
 */
export default class SwitchThumb extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'touch', 'mouse'])),
  };

  _handleClick = (e) => {
    // The switch's thumb needs to have an onClick handler to enable keyboard accessibility, however,
    // this actually triggers two click events since the slider's track needs to be clickable as well.
    // Stop propagation to prevent the thumb click AND track propagation click.
    e.stopPropagation();
    this.props.onClick(e);
  };

  render() {
    const { disabled, checked, className, disabledInteractions, ...props } = this.props;
    return (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._handleClick}
        disabled={disabled}
        disabledInteractions={disabledInteractions || DISABLED_INTERACTIONS}
        inkContainerClassName="md-ink-container--2x"
        className={cn('md-switch-thumb', {
          'md-switch-thumb--disabled': disabled,
          'md-switch-thumb--on': checked,
          'md-switch-thumb--off': !checked,
        }, className)}
      />
    );
  }
}
