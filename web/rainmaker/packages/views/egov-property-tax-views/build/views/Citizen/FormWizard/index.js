"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _WizardComponent = require("./components/WizardComponent");

var _WizardComponent2 = _interopRequireDefault(_WizardComponent);

var _custom = require("egov-common-components/custom");

var _Forms = require("./components/Forms");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormWizard = function (_Component) {
  (0, _inherits3.default)(FormWizard, _Component);

  function FormWizard() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FormWizard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FormWizard.__proto__ || Object.getPrototypeOf(FormWizard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selected: 0
    }, _this.getFormContent = function (index) {
      switch (index) {
        case 0:
          return {
            component: _react2.default.createElement(_Forms.PropertyAddressHOC, null)
          };
        case 1:
          return {
            component: _react2.default.createElement(_Forms.BasicInformationHOC, null)
          };
        case 2:
          return {
            component: _react2.default.createElement(_Forms.PlotInformationHOC, null)
          };
        case 3:
          return {
            component: _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_Forms.OwnershipTypeHOC, null),
              _react2.default.createElement(_Forms.OwnerInfoHOC, null),
              _react2.default.createElement(_Forms.ExemptionCategoryHOC, null)
            )
          };
        default:
          return {
            component: null
          };
      }
    }, _this.handleNext = function () {
      var selected = _this.state.selected;

      if (selected < 3) {
        _this.setState({ selected: selected + 1 });
      } else {
        _this.props.history.push("/citizen/pt-payment/review-property");
      }
    }, _this.handlePrev = function () {
      var selected = _this.state.selected;

      if (selected > 0) {
        _this.setState({ selected: selected - 1 });
      }
    }, _this.onTabClick = function (index) {
      _this.setState({ selected: index });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FormWizard, [{
    key: "render",
    value: function render() {
      var selected = this.state.selected;

      var _getFormContent = this.getFormContent(selected),
          component = _getFormContent.component;

      return _react2.default.createElement(
        "div",
        { className: "wizard-form-main-cont" },
        _react2.default.createElement(_WizardComponent2.default, {
          content: component,
          onTabClick: this.onTabClick,
          selected: selected,
          handleNext: this.handleNext,
          handlePrev: this.handlePrev
        })
      );
    }
  }]);
  return FormWizard;
}(_react.Component);

exports.default = FormWizard;