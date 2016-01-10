import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';
import { IconButton } from '../Buttons';
import FontIcon from '../FontIcon';


export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: props.defaultChecked };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    labelBefore: PropTypes.bool,
    checkedIcon: PropTypes.node.isRequired,
    uncheckedIcon: PropTypes.node.isRequired,
    value: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    defaultChecked: false,
    checkedIcon: <FontIcon>check_box</FontIcon>,
    uncheckedIcon: <FontIcon>check_box_outline_blank</FontIcon>,
  };

  handleChange = (e) => {
    const { onChange, value, checked } = this.props;
    const nextChecked = !(typeof checked === 'undefined' ? this.state.checked : checked);
    if(onChange) {
      if(typeof value === 'undefined') {
        onChange(nextChecked, e);
      } else {
        onChange(nextChecked, value, e);
      }
    }

    if(typeof value === 'undefined') {
      this.setState({ checked: nextChecked });
    }
  };

  toggleCheck = () => {
    this.handleChange({ target: this.refs.checkbox });
  };

  render() {
    const { className, label, checked, checkedIcon, uncheckedIcon, style, ...props } = this.props;
    const isLabelBefore = isPropEnabled(props, 'labelBefore');
    const isChecked = typeof checked !== 'undefined' ? checked : this.state.checked;
    const isDisabled = isPropEnabled(props, 'disabled');

    const checkboxLabel = (
      <label className={classnames('label', { 'disabled': isDisabled })}>
        {label}
        <input
          ref="checkbox"
          type="checkbox"
          checked={isChecked}
          className="md-control-input"
          {...props}
          onChange={this.handleChange}
        />
      </label>
    );
    return (
      <div className={classnames('md-selection-control-container', className)} style={style}>
        {isLabelBefore && checkboxLabel}
        <IconButton
          disabled={isDisabled}
          onClick={this.toggleCheck}
          className={classnames('md-checkbox', { 'active': isChecked })}
          onClickInkMouseDown={true}
          >
          {isChecked ? checkedIcon : uncheckedIcon}
        </IconButton>
        {!isLabelBefore && checkboxLabel}
      </div>
    );
  }
}
