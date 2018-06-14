"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _UI = require("egov-common-components/UI");

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GenericForm = function GenericForm(_ref) {
  var form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      formKey = _ref.formKey;

  var fields = form.fields || {};
  return _react2.default.createElement(_UI.Card, {
    textChildren: _react2.default.createElement(
      "div",
      { className: formKey + " col-xs-12" },
      Object.keys(fields).map(function (fieldKey, index) {
        return _react2.default.createElement(
          "div",
          { key: index, className: fields[fieldKey].numCols ? "col-xs-" + fields[fieldKey].numCols : "col-xs-6" },
          _react2.default.createElement(_field2.default, { fieldKey: fieldKey, field: fields[fieldKey], handleFieldChange: handleFieldChange })
        );
      })
    )
  });
};
exports.default = GenericForm;