import React from "react";
import { Route, Switch } from "react-router-dom";
const RenderRoutes = ({ match, routes = [] }) => {
  console.log(routes);
  return (
    <Switch>
      {routes.map((route, index) => {
        let { component: Component, path } = route;
        console.log(`${match.url}/${path}`);
        return (
          <Route
            key={index}
            exact
            path={`${match.url}/${path}`}
            render={(props) => {
              console.log("props");
              return <Component {...props} />;
            }}
          />
        );
      })}
    </Switch>
  );
};

export default RenderRoutes;
