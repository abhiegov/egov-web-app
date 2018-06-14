import React from "react";
import { Button } from "egov-common-components/UI";
import { Question } from "egov-common-components/custom";
import { TextArea } from "egov-common-components/custom";
import { ImageUpload } from "egov-common-components/custom";

const ReopenComplaintForm = ({ form, formKey, options, ontextAreaChange, handleOptionChange, optionSelected, commentValue }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <div className="reopencomplaint-question">
        <Question options={options} label="CS_REOPEN_COMPLAINT_WHY" handleChange={handleOptionChange} valueSelected={optionSelected} />
      </div>
      <div className="reopencomplaint-upload-photo">
        <ImageUpload module="rainmaker-pgr" formKey={formKey} fieldKey="media" />
      </div>
      <div className="reopencomplaint-textArea">
        <TextArea onChange={ontextAreaChange} value={commentValue} {...fields.textarea} />
      </div>
      <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 btn-with-bottom-nav">
        <Button {...submit} primary={true} fullWidth={true} />
      </div>
    </div>
  );
};

export default ReopenComplaintForm;
