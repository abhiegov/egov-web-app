import React from "react";
import { UploadDrawer } from "egov-common-components/UI";

const UploadDrawerLabelStyle = {
  fontFamily: "Roboto",
  fontSize: "14px",
  letterSpacing: "0.3px",
};

const UploadDrawerView = ({ setProfilePic, onClickAddPic, openUploadSlide }) => {
  return (
    <UploadDrawer
      openUploadSlide={openUploadSlide}
      galleryIcon={true}
      removeIcon={true}
      labelStyle={UploadDrawerLabelStyle}
      uploadfile={setProfilePic}
      closeDrawer={onClickAddPic}
    />
  );
};

export default UploadDrawerView;
