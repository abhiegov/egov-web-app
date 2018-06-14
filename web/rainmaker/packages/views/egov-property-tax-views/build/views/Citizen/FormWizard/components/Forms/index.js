"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicFormHoc = exports.ExemptionCategoryHOC = exports.OwnerInfoHOC = exports.OwnershipTypeHOC = exports.PlotInformationHOC = exports.PropertyAddressHOC = exports.BasicInformationHOC = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("../GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

var _actions = require("egov-ui-kit/redux/form/actions");

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _UI = require("egov-common-components/UI");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [{ value: "Male", label: _react2.default.createElement(_translationNode2.default, { label: "Male" }) }, { value: "Female", label: _react2.default.createElement(_translationNode2.default, { label: "Female" }) }, { value: "Transgender", label: _react2.default.createElement(_translationNode2.default, { label: "Transgender" }) }];

var guardianOptions = [{ value: "Husband", label: _react2.default.createElement(_translationNode2.default, { label: "Husband" }) }, { value: "Father ", label: _react2.default.createElement(_translationNode2.default, { label: "Father" }) }];

var styles = {
  labelStyle: {
    color: "rgb(0, 188, 209)",
    font: "12px",
    letterSpacing: 0.6,
    marginBottom: 5,
    marginTop: 14
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px"
  },
  selectedLabelStyle: {
    color: "#00bbd3"
  },
  radioButtonLabelStyle: {
    lineHeight: 1,
    marginBottom: 8
  },
  iconStyle: {
    width: 16,
    height: 16
  }
};

var OwnerInformation = function OwnerInformation(_ref) {
  var form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      handleChange = _ref.handleChange,
      handleGuardianChange = _ref.handleGuardianChange;

  var fields = form.fields || {};
  return _react2.default.createElement(_UI.Card, {
    textChildren: _react2.default.createElement(
      "div",
      { className: "col-xs-12" },
      _react2.default.createElement(
        "div",
        { className: "col-xs-6" },
        _react2.default.createElement(_field2.default, { fieldKey: "ownerName", field: fields["ownerName"], handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-6", style: { height: 72 } },
        _react2.default.createElement(_translationNode2.default, { label: "Gender", fontSize: 12, labelStyle: styles.labelStyle, bold: true }),
        _react2.default.createElement(_UI.RadioButton, {
          id: "gender-selection",
          name: "gender-selection",
          options: options,
          handleChange: handleChange,
          radioButtonItemStyle: styles.radioButtonItemStyle,
          labelStyle: styles.radioButtonLabelStyle,
          selectedLabelStyle: styles.selectedLabelStyle,
          className: "owner-gender-selection",
          iconStyle: styles.iconStyle
        })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-6" },
        _react2.default.createElement(_field2.default, { fieldKey: "ownerMobile", field: fields["ownerMobile"], handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-6", style: { display: "flex", alignItems: "center" } },
        _react2.default.createElement(
          "div",
          { className: "col-xs-8", style: { padding: 0 } },
          _react2.default.createElement(_field2.default, { fieldKey: "ownerGuardian", field: fields["ownerGuardian"], handleFieldChange: handleFieldChange })
        ),
        _react2.default.createElement(
          "div",
          { className: "col-xs-4", style: { padding: 0 } },
          _react2.default.createElement(_UI.RadioButton, {
            id: "guardian-selection",
            name: "guardian-selection",
            options: guardianOptions,
            handleChange: handleGuardianChange,
            className: "owner-guardian-selection",
            iconStyle: styles.iconStyle,
            labelStyle: styles.radioButtonLabelStyle
          })
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-6" },
        _react2.default.createElement(_field2.default, { fieldKey: "ownerAadhar", field: fields["ownerAadhar"], handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-6" },
        _react2.default.createElement(_field2.default, { fieldKey: "ownerEmail", field: fields["ownerEmail"], handleFieldChange: handleFieldChange })
      ),
      _react2.default.createElement(
        "div",
        { className: "col-xs-6" },
        _react2.default.createElement(_field2.default, { fieldKey: "ownerAddress", field: fields["ownerAddress"], handleFieldChange: handleFieldChange })
      )
    )
  });
};

var BasicInformationHOC = (0, _form2.default)({ formKey: "basicInformation" })(_GenericForm2.default);
var PropertyAddressHOC = (0, _form2.default)({ formKey: "propertyAddress" })(_GenericForm2.default);
var PlotInformationHOC = (0, _form2.default)({ formKey: "plotInformation" })(_GenericForm2.default);
var OwnershipTypeHOC = (0, _form2.default)({ formKey: "ownershipType" })(_GenericForm2.default);
var OwnerInfoHOC = (0, _form2.default)({ formKey: "ownerInfo" })(OwnerInformation);
var ExemptionCategoryHOC = (0, _form2.default)({ formKey: "exemptionCategory" })(_GenericForm2.default);
var DynamicFormHoc = function DynamicFormHoc(formKey, Form) {
  return (0, _form2.default)({ formKey: formKey })(Form);
};

exports.BasicInformationHOC = BasicInformationHOC;
exports.PropertyAddressHOC = PropertyAddressHOC;
exports.PlotInformationHOC = PlotInformationHOC;
exports.OwnershipTypeHOC = OwnershipTypeHOC;
exports.OwnerInfoHOC = OwnerInfoHOC;
exports.ExemptionCategoryHOC = ExemptionCategoryHOC;
exports.DynamicFormHoc = DynamicFormHoc;