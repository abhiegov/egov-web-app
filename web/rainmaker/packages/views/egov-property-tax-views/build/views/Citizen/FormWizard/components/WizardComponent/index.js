"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _UI = require("egov-common-components/UI");

var _BreadCrumbs = require("./components/BreadCrumbs");

var _BreadCrumbs2 = _interopRequireDefault(_BreadCrumbs);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WizardComponent = function WizardComponent(_ref) {
  var content = _ref.content,
      onTabClick = _ref.onTabClick,
      selected = _ref.selected,
      handlePrev = _ref.handlePrev,
      handleNext = _ref.handleNext;

  return _react2.default.createElement(
    "div",
    { className: "wizard-cont" },
    _react2.default.createElement(_UI.Label, {
      label: "Assessment Form",
      containerStyle: { padding: "24px 0 16px 0" },
      dark: true,
      bold: true,
      labelStyle: { letterSpacing: 0 },
      fontSize: "20px"
    }),
    _react2.default.createElement(_BreadCrumbs2.default, { onTabClick: onTabClick, selected: selected }),
    _react2.default.createElement(
      "div",
      { className: "wizard-content clearfix" },
      content
    ),
    _react2.default.createElement(
      "div",
      { className: "wizard-footer col-xs-12", style: { textAlign: "right" } },
      _react2.default.createElement(
        "div",
        { className: "col-xs-6", style: { float: "right" } },
        _react2.default.createElement(_UI.Button, {
          label: "GO BACK",
          onClick: handlePrev,
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
          buttonStyle: { border: "1px solid #fe7a51" },
          style: { marginRight: 45, width: "36%" }
        }),
        _react2.default.createElement(_UI.Button, {
          label: "NEXT",
          style: { width: "36%" },
          backgroundColor: "#fe7a51",
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
          buttonStyle: { border: 0 },
          onClick: handleNext
        })
      )
    )
  );
};

exports.default = WizardComponent;