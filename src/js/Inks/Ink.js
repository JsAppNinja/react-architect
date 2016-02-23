import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { LEFT_MOUSE, TAB } from '../constants/keyCodes';
import InkTransition from './InkTransition';
import { getOffset } from '../utils';

export default class Ink extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      inks: [],
    };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
  };

  calcR = (a, b) => {
    return Math.sqrt((a * a) + (b * b));
  };

  invalidClickEvent = ({ button, ctrlKey }) => {
    return button !== LEFT_MOUSE || ctrlKey;
  };

  createInk = (pageX, pageY) => {
    const container = ReactDOM.findDOMNode(this.refs.container);

    let left = 0, top = 0;
    let size, x, y;
    if(typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
      const offset = getOffset(container);

      x = pageX - offset.left;
      y = pageY - offset.top;
    } else {
      const node = container.parentNode;
      x = node.offsetWidth / 2;
      y = node.offsetHeight / 2;
    }

    const { offsetWidth, offsetHeight } = container;
    const r = Math.max(
      this.calcR(x, y),
      this.calcR(offsetWidth - x, y),
      this.calcR(offsetWidth - x, offsetHeight - y),
      this.calcR(x, offsetHeight - y)
    );

    left = x - r;
    top = y - r;
    size = r * 2;

    const ink = {
      style: {
        left,
        top,
        width: size,
        height: size,
      },
      time: new Date(),
    };
    this.setState({
      inks: [
        ...this.state.inks,
        ink,
      ],
    });
  };

  popInk = () => {
    if(!this.state.inks.length) { return; }
    let inks = this.state.inks.slice();
    inks.pop();
    this.setState({ inks });
  };

  handleMouseDown = (e) => {
    if(this.props.disabled || this.invalidClickEvent(e)) { return; }
    this.createInk(e.pageX, e.pageY);
    this.setState({
      skipMouseUp: false,
    });
  };

  handleMouseLeave = () => {
    if(!this.props.disabled) {
      this.popInk();
      this.setState({
        skipMouseUp: true,
      });
    }
  };

  handleMouseUp = (e) => {
    if(this.props.disabled || this.invalidClickEvent(e) || this.state.skipMouseUp) { return; }
    this.popInk();
  };

  handleTouchStart = (e) => {
    if(this.props.disabled) { return; }
    const { pageX, pageY } = e.changedTouches[0];
    this.createInk(pageX, pageY);
  };

  handleTouchEnd = () => {
    if(this.props.disabled) { return; }
    this.popInk();
  };

  handleKeyUp = (e) => {
    if(!this.props.disabled && (e.which || e.keyCode) === TAB) {
      this.createInk();
    }
  };

  handleBlur = () => {
    if(!this.props.disabled) {
      this.popInk();
    }
  };

  render() {
    const { className, children, ...props } = this.props;
    if(!children) { return null; }
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
    }, [(
      <TransitionGroup
        key="inks"
        ref="container"
        className={classnames('md-ink-container', className)}
      >
        {this.state.inks.map(ink => (
          <InkTransition key={ink.time.getTime()} {...ink} />
        ))}
      </TransitionGroup>),
      child.props.children,
    ]);
  }
}
