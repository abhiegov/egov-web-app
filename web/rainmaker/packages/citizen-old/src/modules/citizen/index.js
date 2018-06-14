import React from "react";
import { RenderRoutes } from "egov-common-components/custom";

const Citizen = ({ match, routes = [] }) => {
  return <RenderRoutes match={match} routes={routes} />;
};

export default Citizen;
