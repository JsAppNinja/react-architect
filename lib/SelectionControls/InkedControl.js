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

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InkedControl = function (_Component) {
  _inherits(InkedControl, _Component);

  function InkedControl(props) {
    _classCallCheck(this, InkedControl);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InkedControl).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(InkedControl, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var checked = _props.checked;
      var disabled = _props.disabled;
      var type = _props.type;
      var ink = _props.ink;

      var props = _objectWithoutProperties(_props, ['children', 'checked', 'disabled', 'type', 'ink']);

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-' + type, { 'active': checked, disabled: disabled }) }, props),
        ink,
        children
      );
    }
  }]);

  return InkedControl;
}(_react.Component);

InkedControl.propTypes = {
  children: _react.PropTypes.node.isRequired,
  type: _react.PropTypes.string.isRequired,
  disabled: _react.PropTypes.bool,
  checked: _react.PropTypes.bool,

  // Injected from injectInk
  ink: _react.PropTypes.node.isRequired
};
exports.default = (0, _Inks2.default)(InkedControl);
module.exports = exports['default'];