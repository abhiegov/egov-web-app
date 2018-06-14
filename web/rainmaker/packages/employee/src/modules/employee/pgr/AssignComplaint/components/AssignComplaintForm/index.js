import React from "react";
import { Button } from "egov-common-components/UI";
import HeaderCard from "../HeaderCard";
import ListCard from "../ListCard";

const FeedbackForm = ({ complaint, ...rest }) => {
  return (
    <div>
      <div>
        <HeaderCard complaint={complaint} />
        <ListCard {...rest} />
      </div>
    </div>
  );
};

export default FeedbackForm;
