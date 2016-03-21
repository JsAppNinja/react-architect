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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));

    _this.isChecked = function () {
      return typeof _this.props.checked === 'undefined' ? _this.state.checked : _this.props.checked;
    };

    _this.handleChange = function (e) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var checked = _this$props.checked;

      onChange && onChange(e);
      if (typeof checked === 'undefined') {
        _this.setState({ checked: !_this.state.checked });
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { checked: props.defaultChecked };
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var checked = this.isChecked();
      var _props = this.props;
      var className = _props.className;
      var disabled = _props.disabled;
      var label = _props.label;
      var labelBefore = _props.labelBefore;
      var checkedIcon = _props.checkedIcon;
      var uncheckedIcon = _props.uncheckedIcon;
      var name = _props.name;
      var value = _props.value;

      var props = _objectWithoutProperties(_props, ['className', 'disabled', 'label', 'labelBefore', 'checkedIcon', 'uncheckedIcon', 'name', 'value']);

      var icon = _react2.default.createElement(
        _Inks2.default,
        { disabled: disabled },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('md-checkbox', { 'active': checked, disabled: disabled }) },
          checked ? checkedIcon : uncheckedIcon
        )
      );

      return _react2.default.createElement(
        'label',
        _extends({}, props, {
          className: (0, _classnames2.default)('md-control-container', className, { disabled: disabled })
        }),
        labelBefore && label,
        _react2.default.createElement('input', {
          disabled: disabled,
          type: 'checkbox',
          className: 'md-control-input',
          checked: checked,
          onChange: this.handleChange,
          name: name,
          value: value
        }),
        icon,
        !labelBefore && label
      );
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  checked: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool.isRequired,
  label: _react.PropTypes.node,
  labelBefore: _react.PropTypes.bool.isRequired,
  checkedIcon: _react.PropTypes.node.isRequired,
  uncheckedIcon: _react.PropTypes.node.isRequired,
  name: _react.PropTypes.string
};
Checkbox.defaultProps = {
  defaultChecked: false,
  labelBefore: false,
  checkedIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'check_box'
  ),
  uncheckedIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'check_box_outline_blank'
  )
};
exports.default = Checkbox;
module.exports = exports['default'];