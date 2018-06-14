import React from "react";

// pgr specific screens
import MyComplaints from "modules/citizen/pgr/MyComplaints";
import ComplaintDetails from "modules/citizen/pgr/ComplaintDetails";
import ComplaintSubmited from "modules/citizen/pgr/ComplaintSubmited";
import { TrackLocation } from "egov-common-components/custom";
import Feedback from "modules/citizen/pgr/Feedback";
import ReOpenComplaint from "modules/citizen/pgr/ReOpenComplaint";
import ComplaintType from "modules/citizen/pgr/ComplaintType";
import AddComplaint from "modules/citizen/pgr/AddComplaint";
import FeedbackAcknowledge from "modules/citizen/pgr/FeedbackAcknowledgement";
import ReopenAcknowledgement from "modules/citizen/pgr/ReopenAcknowledgement";

const routes = [
  {
    path: "my-complaints",
    component: MyComplaints,
    needsAuthentication: true,
    options: { title: "CS_HOME_MY_COMPLAINTS" },
  },
  {
    path: "complaint-details/:serviceRequestId?",
    component: ComplaintDetails,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY" },
  },
  {
    path: "map",
    component: TrackLocation,
    needsAuthentication: true,
    options: {
      hideHeader: true,
      hideFooter: true,
      title: "CS_HEADER_TRACK_LOCATION",
    },
  },
  {
    path: "complaint-submitted",
    component: ComplaintSubmited,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HEADER_COMPLAINT_SUBMITTED",
      hideBackButton: true,
    },
  },
  {
    path: "reopen-complaint/:serviceRequestId?",
    component: ReOpenComplaint,
    needsAuthentication: true,
    options: { title: "CS_HEADER_REOPEN_COMPLAINT" },
  },
  {
    path: "feedback/:serviceRequestId?",
    component: Feedback,
    needsAuthentication: true,
    options: { title: "CS_HEADER_FEEDBACK" },
  },
  {
    path: "feedback-acknowledgement",
    component: FeedbackAcknowledge,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT",
    },
  },
  {
    path: "complaint-type",
    component: ComplaintType,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE" },
  },

  {
    path: "add-complaint",
    component: AddComplaint,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION",
    },
  },
  {
    path: "reopen-acknowledgement",
    component: ReopenAcknowledgement,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_COMMON_COMPLAINT_REOPENED",
    },
  },
];

export default routes;
