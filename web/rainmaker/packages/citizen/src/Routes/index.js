import React from "react";
import withAuthorization from "egov-ui-kit/hocs/withAuthorization";
import withoutAuthorization from "egov-ui-kit/hocs/withoutAuthorization";
// import pgrRoutes from "./pgr";
import propertyTaxRoutes from "./propertyTax";
//import citizenRoutes from "./citizen";

const mapRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, component, options, redirectionUrl, needsAuthentication } = route;
    return {
      ...route,
      component: withoutAuthorization(redirectionUrl)(component),
    };
  });
};

const routes = {
  // pgr: mapRoutes(pgrRoutes),
  propertyTax: mapRoutes(propertyTaxRoutes),
  //citizen: mapRoutes(citizenRoutes),
};
export default routes;

//needsAuthentication ? withAuthorization(options)(component) : withoutAuthorization(redirectionUrl)(component),
