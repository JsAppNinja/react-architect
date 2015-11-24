import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { wrapped: props.label.length > 33 };
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    valueLink: PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      requestChange: PropTypes.func.isRequired,
    }),
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const { label, className, valueLink, ...props } = this.props;
    return (
      <li className={classnames('md-tab', className, { 'active': valueLink.checked, 'wrapped': this.state.wrapped })} {...props}>
        <label className="md-tab-label">
          {label}
          <input type="radio" className="hidden" name="md-tabs" valueLink={valueLink} />
        </label>
      </li>
    );
  }
}
