"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _UI = require("egov-common-components/UI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FullOrPartialExemption = function FullOrPartialExemption(_ref) {
  var form = _ref.form,
      wizardFields = _ref.wizardFields,
      handleFieldChange = _ref.handleFieldChange;

  var fields = wizardFields(form.fields || {});
  return _react2.default.createElement(
    "div",
    { className: "exemption-form-cont" },
    _react2.default.createElement(_UI.DropDown, (0, _extends3.default)({
      fullWidth: true
    }, fields.propertcategoryNumber, {
      onChange: function onChange(e, value) {
        return handleFieldChange("propertcategoryNumber", value);
      },
      dropDownData: [{ label: "Category 1", value: "c1" }, { label: "Category 2", value: "c2" }]
    })),
    _react2.default.createElement(_UI.TextField, (0, _extends3.default)({}, fields.referenceId, { onChange: function onChange(e, value) {
        return handleFieldChange("referenceId", value);
      }, id: "referenceID" })),
    _react2.default.createElement(_UI.TextField, (0, _extends3.default)({}, fields.proof, { onChange: function onChange(e, value) {
        return handleFieldChange("proof", value);
      }, id: "proof" }))
  );
};

exports.default = FullOrPartialExemption;