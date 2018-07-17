import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";

const innerDivStyle = {
  paddingLeft: 0,
};

class MyProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //selected: null,
      items: [
        {
          primaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
          route: "/my-properties/property",
          secondaryText: "Property ID: PQL-98-876",
        },
        {
          primaryText: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram",
          route: "/my-properties/property",
          secondaryText: "Property ID: JML-34-756",
        },
      ],
    };
  }

  componentDidMount = () => {
    const { addBreadCrumbs, title } = this.props;
    // const { pathname } = location;
    // let url = pathname && pathname.split("/").pop();
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  };

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "receipt-dialogue":
        break;
      default:
        this.props.history.push(path);
        break;
    }
  };

  // onBreadcrumbsClick = (index, path) => {
  //   const { history } = this.props;
  //   this.setState({
  //     selected: index,
  //   });
  //   history.push(path);
  // };

  render() {
    const { urls } = this.props;
    const { selected } = this.state;
    return (
      <Screen>
        <BreadCrumbs url={urls} onClick={this.onBreadcrumbsClick} />
        <AssessmentList onItemClick={this.onListItemClick} innerDivStyle={innerDivStyle} items={this.state.items} history={this.props.history} />
      </Screen>
    );
  }
}

const mapStateToProps = ({ app }) => {
  const { urls } = app;
  return { urls };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProperties);
