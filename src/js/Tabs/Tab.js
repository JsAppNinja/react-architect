import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import Ink from '../Inks';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string,
    label2: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
  };

  render() {
    const { className, icon, label, label2, checked, value, onChange, ...props } = this.props;

    return (
      <Ink>
        <div
          className={classnames('md-tab', className, { 'active': checked })}
          {...props}
        >
          <label
            className={classnames('md-tab-label', {
              'multiline': !!label && !!label2,
              'with-icon': !!label && !!icon,
            })}
          >
            {icon}
            {label && <div>{label}</div>}
            {label2 && <div>{label2}</div>}
            <input
              type="radio"
              className="md-tab-control"
              checked={checked}
              value={value}
              onChange={onChange}
            />
          </label>
        </div>
      </Ink>
    );
  }
}
