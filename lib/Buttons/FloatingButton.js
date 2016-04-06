'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FloatingButton = function (_Component) {
  _inherits(FloatingButton, _Component);

  function FloatingButton(props) {
    _classCallCheck(this, FloatingButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FloatingButton).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(FloatingButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var fixed = _props.fixed;
      var mini = _props.mini;
      var primary = _props.primary;
      var secondary = _props.secondary;
      var children = _props.children;
      var iconClassName = _props.iconClassName;

      var props = _objectWithoutProperties(_props, ['className', 'fixed', 'mini', 'primary', 'secondary', 'children', 'iconClassName']);

      return _react2.default.createElement(
        _IconButton2.default,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-floating-btn', className, {
            mini: mini,
            fixed: fixed,
            'md-primary': primary,
            'md-secondary': secondary
          }),
          iconClassName: iconClassName
        }),
        children
      );
    }
  }]);

  return FloatingButton;
}(_react.Component);

FloatingButton.propTypes = {
  className: _react.PropTypes.string,
  iconClassName: _react.PropTypes.string,
  children: _react.PropTypes.string,
  fixed: _react.PropTypes.bool,
  mini: _react.PropTypes.bool,
  avatar: _react.PropTypes.node,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool
};
exports.default = FloatingButton;
module.exports = exports['default'];