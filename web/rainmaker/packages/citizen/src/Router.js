import React from "react";
import { Route, Switch } from "react-router-dom";
import PropertyTax from "modules/PropertyTax";
import { ImageModalDisplay } from "egov-common-components/custom";

const Main = ({ routes }) => {
  return (
    <main>
      <Switch>
        <Route
          path={`/citizen`}
          render={(props) => {
            return <PropertyTax match={props.match} routes={routes.propertyTax} />;
          }}
        />
        <Route path={`/image`} component={ImageModalDisplay} />
      </Switch>
    </main>
  );
};

export default Main;
