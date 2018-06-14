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

var _PropertyAddress = require("./components/PropertyAddress");

var _PropertyAddress2 = _interopRequireDefault(_PropertyAddress);

var _BasicInformation = require("./components/BasicInformation");

var _BasicInformation2 = _interopRequireDefault(_BasicInformation);

var _AssessmentInfo = require("./components/AssessmentInfo");

var _AssessmentInfo2 = _interopRequireDefault(_AssessmentInfo);

var _OwnerInfo = require("./components/OwnerInfo");

var _OwnerInfo2 = _interopRequireDefault(_OwnerInfo);

var _ActionFooter = require("./components/ActionFooter");

var _ActionFooter2 = _interopRequireDefault(_ActionFooter);

var _PropertyTaxDetails = require("./components/PropertyTaxDetails");

var _PropertyTaxDetails2 = _interopRequireDefault(_PropertyTaxDetails);

var _propertyAddress = require("./formConfigs/propertyAddress");

var _propertyAddress2 = _interopRequireDefault(_propertyAddress);

var _basicInformation = require("./formConfigs/basicInformation");

var _basicInformation2 = _interopRequireDefault(_basicInformation);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultIconStyle = {
  fill: "#767676",
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10
};
// import Label from "utils/translationNode";


var PropAddressIcon = _react2.default.createElement(_UI.Icon, { style: defaultIconStyle, color: "#ffffff", action: "action", name: "home" });
var BasicInfoIcon = _react2.default.createElement(_UI.Icon, { style: defaultIconStyle, color: "#ffffff", action: "action", name: "assignment" });
var AssessmentInfoIcon = _react2.default.createElement(_UI.Icon, { style: defaultIconStyle, color: "#ffffff", action: "action", name: "assessment" });
var OwnerInfoIcon = _react2.default.createElement(_UI.Icon, { style: defaultIconStyle, color: "#ffffff", action: "social", name: "person" });
var editIcon = _react2.default.createElement(_UI.Icon, { style: defaultIconStyle, color: "#ffffff", action: "image", name: "edit" });

var ReviewForm = function (_Component) {
  (0, _inherits3.default)(ReviewForm, _Component);

  function ReviewForm(props) {
    (0, _classCallCheck3.default)(this, ReviewForm);
    return (0, _possibleConstructorReturn3.default)(this, (ReviewForm.__proto__ || Object.getPrototypeOf(ReviewForm)).call(this, props));
  }

  (0, _createClass3.default)(ReviewForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _custom.Screen,
        null,
        _react2.default.createElement(_UI.Label, {
          label: "Review Form",
          fontSize: "20px",
          labelStyle: {
            fontFamily: "Roboto",
            color: "#484848",
            margin: "24px 0px 0px 16px"
          }
        }),
        _react2.default.createElement(_PropertyAddress2.default, { form: _propertyAddress2.default, icon: PropAddressIcon, editIcon: editIcon }),
        _react2.default.createElement(_BasicInformation2.default, { form: _basicInformation2.default, icon: BasicInfoIcon, editIcon: editIcon }),
        _react2.default.createElement(_AssessmentInfo2.default, { icon: AssessmentInfoIcon, editIcon: editIcon }),
        _react2.default.createElement(_OwnerInfo2.default, { icon: OwnerInfoIcon, editIcon: editIcon }),
        _react2.default.createElement(_PropertyTaxDetails2.default, null),
        _react2.default.createElement(_ActionFooter2.default, null)
      );
    }
  }]);
  return ReviewForm;
}(_react.Component);

exports.default = ReviewForm;