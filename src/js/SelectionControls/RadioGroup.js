import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.defaultValue || React.Children.toArray(props.children)[0].props.value,
    };
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node),
    component: PropTypes.string,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    component: 'div',
    inline: false,
  };

  handleChange = (value, e) => {
    this.props.onChange && this.props.onChange(value, e);
    // prevents 2 change events triggering
    e.stopPropagation();

    if(typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  };

  getValue = () => {
    return typeof this.props.value === 'undefined' ? this.state.value : this.props.value;
  };

  render() {
    const { component, className, children, name, inline, ...props } = this.props;
    const fullProps = {
      ...props,
      className: classnames('md-radio-group', className),
    };
    const value = this.getValue();

    return React.createElement(component, fullProps, React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        key: i,
        checked: value === child.props.value,
        onChange: this.handleChange,
        name: name || child.props.name,
        className: classnames({ inline }),
      });
    }));
  }
}
