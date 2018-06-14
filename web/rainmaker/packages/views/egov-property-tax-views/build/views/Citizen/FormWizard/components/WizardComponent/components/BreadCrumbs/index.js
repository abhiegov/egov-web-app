"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _UI = require("egov-common-components/UI");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
  heading: "Property Address",
  icon: {
    name: "home",
    action: "action"
  }
}, {
  heading: "Basic Information",
  icon: {
    name: "assignment",
    action: "action"
  }
}, {
  heading: "Tax Assessment",
  icon: {
    name: "home",
    action: "action"
  }
}, {
  heading: "Owner Information",
  icon: {
    name: "person",
    action: "social"
  }
}];

var selectedTabStyle = {
  background: "#fe7a51"
};

var defaultTabStyle = {
  background: "#b3b3b3"
};

var BreadCrumbs = function BreadCrumbs(_ref) {
  var onTabClick = _ref.onTabClick,
      selected = _ref.selected;

  return _react2.default.createElement(
    "div",
    { className: "breadcrumb flat" },
    tabs.map(function (tab, index) {
      return _react2.default.createElement(
        "a",
        { onClick: function onClick() {
            return onTabClick(index);
          }, key: index, style: selected === index ? selectedTabStyle : defaultTabStyle, href: "#" + index },
        _react2.default.createElement(
          "div",
          { className: "breadcrumb-tab" },
          _react2.default.createElement(_UI.Icon, { action: tab.icon.action, name: tab.icon.name, color: "#fff", style: { marginRight: 10 } }),
          _react2.default.createElement(_UI.Label, { label: tab.heading, labelStyle: { letterSpacing: 0.6 }, color: "#fff", bold: true })
        )
      );
    })
  );
};

exports.default = BreadCrumbs;