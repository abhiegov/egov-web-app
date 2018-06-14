import React from "react";
import { connect } from "react-redux";
import { Drawer, Icon } from "egov-common-components/UI";
import { Header, ActionMenu } from "egov-common-components/custom";

const withoutAuthorization = (redirectionUrl) => (Component) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      if (this.props.authenticated) {
        this.props.history.push(redirectionUrl);
      }
    }
    render() {
      return (
        <div>
          <Drawer />
          <Component {...this.props} />
          <ActionMenu actionList={[]} />
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { authenticated } = state.auth;
    return { authenticated };
  };
  return connect(mapStateToProps)(Wrapper);
};

export default withoutAuthorization;
