import React, { Component } from "react";
import { connect } from "react-redux";
import { MapLocation, Button, Icon } from "../../../components";
import pinIcon from "../../../assets/Location_pin.svg";
import { handleFieldChange } from "redux/form/actions";
import { setRoute } from "redux/app/actions";
import isUndefined from "lodash/isUndefined";
import "./index.css";

const pickBtn = {
  lineHeight: "38px",
  display: "block",
  margin: 0,
  backgroundColor: "#f5a623",
  color: "#ffffff",
  fontFamily: "Roboto",
  fontSize: "7px",
  height: 38,
  fontWeight: 500,
  fontStyle: "normal",
};

class TrackLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMyAddress: false,
      currLoc: { lat: 12.9715987, lng: 77.5945699998 },
      showMyLoc: false,
      pickedLoc: {},
      formKey: window.location.href.split("?")[1],
    };
    this.formConfig = require("config/forms/complaint").default;
  }

  componentDidMount() {
    var myLocation = { lat: 12.9279, lng: 77.6271 };
    if (this.state.showMyAddress === true && myLocation) {
      this.setState({
        currLoc: myLocation,
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          currLoc: { lat: position.coords.latitude, lng: position.coords.longitude },
        });
      });
    }
  }

  getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currLoc: { lat: position.coords.latitude, lng: position.coords.longitude },
            showMyLoc: true,
          });
        },
        function(error) {
          //use error.code to determine what went wrong
        }
      );
    }
  };

  setPickedLocation = (lati, long, index) => {
    if (isUndefined(index)) index = 0;
    console.log(lati, long, index);

    this.convertToAddress(lati, long);
  };

  convertToAddress = (lati, long) => {
    this.props.handleFieldChange(this.state.formKey, "latitude", lati.toFixed(6));
    this.props.handleFieldChange(this.state.formKey, "longitude", long.toFixed(6));
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: lati, lng: long } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          this.props.handleFieldChange(this.state.formKey, "address", results[0].formatted_address);
        }
      }
    });
  };

  onClickPick = () => {
    const { setRoute, previousRoute } = this.props;
    setRoute(previousRoute);
  };

  onCLickMapBackBtn = () => {
    const { setRoute, previousRoute } = this.props;
    setRoute(previousRoute);
  };

  render() {
    var _currloc = { lat: parseFloat(this.state.currLoc.lat), lng: parseFloat(this.state.currLoc.lng) };
    return (
      <div>
        <div className="back-btn">
          <Icon
            id="map-back-btn"
            style={{
              height: 24,
              width: 24,
              color: "#484848",
            }}
            action="navigation"
            name={"arrow-back"}
            onClick={this.onCLickMapBackBtn}
          />
        </div>
        <MapLocation
          currLoc={_currloc}
          setLocation={this.setPickedLocation}
          getMyLoc={this.getMyLocation}
          icon={pinIcon}
          hideTerrainBtn={true}
          dragInfoBox={false}
          showMyLoc={this.state.showMyLoc}
        />
        <div className="pickBtn">
          <Button
            id="map-pick-button"
            className="pick"
            label={"Pick"}
            style={pickBtn}
            primary={true}
            labelColor="#ffffff"
            onClick={this.onClickPick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { previousRoute } = state.app;
  return { previousRoute };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackLocation);
