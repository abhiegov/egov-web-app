import React, { Component } from "react";
import { Dialog } from "egov-common-components/UI";
import SingleButton from "./components/SingleButton/index";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const styles = {
  logoutContentStyle: { textAlign: "center", padding: "24px 20px" },
};

class YearDialog extends Component {
  render() {
    let { open, yearList, closeDialogue } = this.props;
    return (
      <Dialog
        open={open}
        children={[
          <div key={1}>
            <div className="dialogue-question">Which year’s taxes would you like to pay? </div>
            <div className="year-range-botton-cont">
              {yearList.map((item, index) => <SingleButton key={index} label={item} handleClose={closeDialogue} />)}
            </div>
          </div>,
        ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={false}
        onRequestClose={closeDialogue}
        contentStyle={{ width: "20%" }}
      />
    );
  }
}

export default YearDialog;
