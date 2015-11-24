import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

const MD_BTN_TYPES = ['flat', 'raised', 'floating'];
const MD_BTN_COLORS = ['default', 'primary', 'secondary'];


export default class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      size: '88px',
      ripples: [],
    };
  }

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    flat: PropTypes.bool,
    raised: PropTypes.bool,
    floating: PropTypes.bool,
    type: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    type: 'button',
  }

  createRipple = (e) => {
    const button = ReactDOM.findDOMNode(this);
    const size = Math.max(button.offsetWidth, button.offsetHeight) + 'px';

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = size;
    ripple.style.height = size;

    button.insertBefore(ripple, button.firstChild);
    const { pageX, pageY } = e;

    setTimeout(() => {
      ripple.style.left = `${pageX - button.offsetLeft - ripple.offsetWidth / 2}px`;
      ripple.style.top = `${pageY - button.offsetTop - ripple.offsetHeight / 2}px`;
      ripple.classList.add('active');
    }, 1);
    return ripple;
  }

  isKeyEnabled = (keys, k) => {
    return keys.indexOf(k) !== -1 && this.props[k] !== false;
  }

  getBtnClassName = () => {
    const keys = Object.keys(this.props);
    let className = 'md-btn';
    if(this.isKeyEnabled(keys, 'disabled')) {
      return className;
    }

    let color = MD_BTN_COLORS[0];
    let mdType = MD_BTN_TYPES[0];
    let colorFound = false;
    let typeFound = false;
    keys.some(k => {
      if(this.isKeyEnabled(MD_BTN_COLORS, k)) {
        color = k;
        colorFound = true;
      } else if(this.isKeyEnabled(MD_BTN_TYPES, k)) {
        mdType = k;
        typeFound = true;
      }
      return colorFound && typeFound;
    });
    return `${className} md-btn-${color} md-btn-${mdType}`;
  }

  handleMouseDown = (e) => {
    const { ripples } = this.state;
    ripples.push(this.createRipple(e));
  }

  handleMouseUp = () => {
    const lastRipple = this.state.ripples[0];
    lastRipple.classList.add('leave');
    setTimeout(() => {
      ReactDOM.findDOMNode(this).removeChild(lastRipple);
    }, 300);

    this.setState({ ripples: this.state.ripples.slice(1, this.state.ripples.length) });
  }

  render() {
    const { className, icon, children, ...props } = this.props;
    const btnClassName = classnames(this.getBtnClassName(), className);
    return (
      <button {...props} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} className={btnClassName}>
        {icon && <i className="material-icons md-24">{icon}</i>}
        {children}
      </button>
    );
  }
}
