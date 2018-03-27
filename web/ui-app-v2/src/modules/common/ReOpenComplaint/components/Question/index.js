import React, { Component } from "react";
import { RadioButton } from "../../../../../components";
import Label from "../../../../../utils/translationNode";

const styles = {
  labelStyle: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#767676",
    letterSpacing: "0.3px",
    marginBottom: "26px",
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
  },
  selectedLabelStyle: {
    color: "#00bbd3",
  },
  radioButtonLabelStyle: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#767676",
    letterSpacing: "0.3px",
  },
};
class Question extends Component {
  state = {
    valueSelected: "",
  };
  handleChange = (event, value) => {
    this.setState({ valueSelected: value });
  };
  render() {
    let { options, label } = this.props;
    let { valueSelected } = this.state;
    return (
      <div>
        <Label label={label} labelStyle={styles.labelStyle} />
        <RadioButton
          id="reopencomplaint-radio-button"
          name="reopencomplaint-radio-button"
          valueSelected={valueSelected}
          options={options}
          handleChange={this.handleChange}
          radioButtonItemStyle={styles.radioButtonItemStyle}
          labelStyle={styles.radioButtonLabelStyle}
          selectedLabelStyle={styles.selectedLabelStyle}
        />
      </div>
    );
  }
}

export default Question;
