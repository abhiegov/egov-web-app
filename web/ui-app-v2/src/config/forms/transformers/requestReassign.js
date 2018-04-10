import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const tenantId = window.localStorage.getItem("tenant-id");
  const id = decodeURIComponent(window.location.href.split("/").pop());
  const { fields: reassignFields } = form;
  let fields;
  console.log("inside form");
  const complaint = state.complaints.byId[id];

  fields = state.form["requestReassign"].fields;
  fields = {
    ...reassignFields,
    complaintno: {
      jsonPath: "services[0].serviceRequestId",
      value: complaint.serviceRequestId,
    },
    status: {
      jsonPath: "actionInfo[0].action",
      value: "requestforreassign",
    },
    description: {
      jsonPath: "services[0].description",
      value: complaint.description,
    },
    phone: {
      jsonPath: "services[0].phone",
      value: complaint.phone,
    },
    servicecode: {
      jsonPath: "services[0].serviceCode",
      value: complaint.serviceCode,
    },
    serviceTenantId: {
      jsonPath: "services[0].tenantId",
      value: tenantId,
    },
  };

  return prepareFormData({ ...form, fields });
};

export default {
  viewModelToBusinessModelTransformer,
};