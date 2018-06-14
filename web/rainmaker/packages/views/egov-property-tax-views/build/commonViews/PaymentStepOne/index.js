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

var _UI = require("egov-common-components/UI");

var _custom = require("egov-common-components/custom");

var _YearDialogue = require("./components/YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabStyle = {
  letterSpacing: "0.6px"
};

var PaymentStepOne = function (_Component) {
  (0, _inherits3.default)(PaymentStepOne, _Component);

  function PaymentStepOne(props) {
    (0, _classCallCheck3.default)(this, PaymentStepOne);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PaymentStepOne.__proto__ || Object.getPrototypeOf(PaymentStepOne)).call(this, props));

    _this.getYearList = function () {
      var today = new Date();
      var month = today.getMonth() + 1;
      var yearRange = [];
      var counter = 0;
      if (month <= 3) {
        return _this.getLastFourYear(yearRange, today.getFullYear() - 1, counter);
      } else {
        return _this.getLastFourYear(yearRange, today.getFullYear(), counter);
      }
    };

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.state = {
      dialogueOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(PaymentStepOne, [{
    key: "getLastFourYear",
    value: function getLastFourYear(yearRange, currentYear, counter) {
      if (counter < 4) {
        counter++;
        yearRange.push(currentYear + "-" + (currentYear + 1));
        this.getLastFourYear(yearRange, currentYear - 1, counter);
      }
      return yearRange;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _custom.Screen,
        null,
        _react2.default.createElement(_UI.List, {
          onItemClick: function onItemClick() {
            _this2.setState({ dialogueOpen: true });
          },
          listContainerStyle: { marginTop: "16px" },
          listItemStyle: {
            borderBottom: "1px solid #e0e0e0",
            paddingTop: "8px",
            paddingBottom: "8px"
          },
          nestedListStyle: { padding: "0px", background: "#f2f2f2" },
          autoGenerateNestedIndicator: false,
          primaryTogglesNestedList: true,
          items: [{
            primaryText: _react2.default.createElement(_UI.Label, { label: "PT_HOME_PAY" }),
            leftIcon: _react2.default.createElement(_UI.Icon, { action: "action", name: "credit-card" }),
            rightIcon: _react2.default.createElement(_UI.Icon, { action: "hardware", name: "keyboard-arrow-right" })
          }, {
            primaryText: _react2.default.createElement(_UI.Label, { label: "PT_PAYMENT_DRAFTS" }),
            leftIcon: _react2.default.createElement(_UI.Icon, { action: "image", name: "edit" }),
            rightIcon: _react2.default.createElement(_UI.Icon, { action: "hardware", name: "keyboard-arrow-right" })
          }, {
            primaryText: _react2.default.createElement(_UI.Label, { label: "PT_MY_RECEIPTS" }),
            leftIcon: _react2.default.createElement(_UI.Icon, { action: "action", name: "receipt" }),
            rightIcon: _react2.default.createElement(_UI.Icon, { action: "hardware", name: "keyboard-arrow-right" })
          }, {
            primaryText: _react2.default.createElement(_UI.Label, { label: "PT_EXAMPLES" }),
            leftIcon: _react2.default.createElement(_UI.Icon, { action: "action", name: "check-circle" }),
            rightIcon: _react2.default.createElement(_UI.Icon, { action: "hardware", name: "keyboard-arrow-right" })
          }, {
            primaryText: _react2.default.createElement(_UI.Label, { label: "PT_HOW_IT_WORKS" }),
            leftIcon: _react2.default.createElement(_UI.Icon, { action: "action", name: "help" }),
            rightIcon: _react2.default.createElement(_UI.Icon, { action: "hardware", name: "keyboard-arrow-right" })
          }]
        }),
        _react2.default.createElement(_YearDialogue2.default, {
          open: this.state.dialogueOpen,
          yearList: this.getYearList(),
          closeDialogue: this.closeYearRangeDialogue
        })
      );
    }
  }]);
  return PaymentStepOne;
}(_react.Component);

exports.default = PaymentStepOne;