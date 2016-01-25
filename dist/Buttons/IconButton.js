'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _keyCodes = require('../constants/keyCodes');

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconButton = function (_Component) {
  _inherits(IconButton, _Component);

  function IconButton(props) {
    _classCallCheck(this, IconButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IconButton).call(this, props));

    _this.handleKeyUp = function (e) {
      if ((e.keyCode || e.which) === _keyCodes.TAB) {
        _this.setState({ focused: true });
      }
    };

    _this.handleClick = function (e) {
      _this.props.onClick && _this.props.onClick(e);
      _this.setState({ focused: false });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { focused: false };
    return _this;
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var iconClassName = _props.iconClassName;
      var children = _props.children;
      var className = _props.className;
      var href = _props.href;
      var type = _props.type;
      var onClickInkMouseDown = _props.onClickInkMouseDown;

      var props = _objectWithoutProperties(_props, ['iconClassName', 'children', 'className', 'href', 'type', 'onClickInkMouseDown']);

      var btnProps = _extends({}, props, {
        onClick: this.handleClick,
        onKeyUp: this.handleKeyUp,
        onBlur: function onBlur() {
          return _this2.setState({ focused: false });
        },
        className: (0, _classnames2.default)(className, 'md-btn', 'md-icon-btn')
      });

      if (onClickInkMouseDown) {
        btnProps.onClick = null;
      }

      if (href) {
        btnProps.href = href;
      } else {
        btnProps.type = type;
      }

      return _react2.default.createElement(href ? 'a' : 'button', btnProps, [_react2.default.createElement(_Inks2.default, { key: 'ink', disabled: (0, _utils.isPropEnabled)(props, 'disabled'), onClick: onClickInkMouseDown ? this.handleClick : null, focused: this.state.focused }), children && children.type && children.type === _FontIcons2.default ? children : _react2.default.createElement(
        _FontIcons2.default,
        { key: 'icon', iconClassName: iconClassName },
        children
      )]);
    }
  }]);

  return IconButton;
}(_react.Component);

IconButton.propTypes = {
  iconClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  tooltipPosition: _react.PropTypes.string,
  tooltip: _react.PropTypes.string,
  href: _react.PropTypes.string,
  type: _react.PropTypes.string,
  onClickInkMouseDown: _react.PropTypes.bool
};
IconButton.defaultProps = {
  type: 'button',
  onClickInkMouseDown: false
};
exports.default = IconButton;
module.exports = exports['default'];