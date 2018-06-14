import React from "react";
import { RenderRoutes } from "egov-common-components/custom";

const PropertyTax = ({ match, routes = [] }) => {
  return <RenderRoutes match={match} routes={routes} />;
};

export default PropertyTax;
