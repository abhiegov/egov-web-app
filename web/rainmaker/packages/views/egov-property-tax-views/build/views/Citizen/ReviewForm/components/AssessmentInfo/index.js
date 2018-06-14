"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _UI = require("egov-common-components/UI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssessmentInfo = function AssessmentInfo(_ref) {
  var icon = _ref.icon,
      editIcon = _ref.editIcon;

  return _react2.default.createElement(_UI.Card, {
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "pt-rf-title" },
        _react2.default.createElement(
          "span",
          { className: "pt-rf-icon" },
          icon
        ),
        _react2.default.createElement(
          "span",
          { className: "pt-rf-title-text" },
          "Assessment Info"
        ),
        _react2.default.createElement(
          "span",
          { className: "pt-rf-edit-icon" },
          editIcon
        )
      ),
      _react2.default.createElement("div", { className: "pt-review-form col-xs-12" })
    )
  });
};

exports.default = AssessmentInfo;