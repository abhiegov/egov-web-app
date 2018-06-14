import React from "react";

//property tax

//import PropertyTaxAssessmentFormWizard from "egov-property-tax-views/build/views/Citizen/AssessmentFormWizard";
import PropertyTaxPaymentStepOne from "egov-property-tax-views/build/commonViews/PaymentStepOne";
// import ReviewForm from "egov-property-tax-views/build/views/Citizen/ReviewForm";
// import PropertyAddress from "egov-property-tax-views/build/views/Citizen/AssessmentFormWizard/components/PropertyAddress";
// import FormWizard from "egov-property-tax-views/build/views/Citizen/FormWizard";

const routes = [
  //property tax routes
  {
    path: "pt-payment",
    component: PropertyTaxPaymentStepOne,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  // {
  //   path: "pt-payment/property-address",
  //   component: PropertyAddress,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //   },
  // },
  // {
  //   path: "pt-payment-assessment-form-wizard",
  //   component: PropertyTaxAssessmentFormWizard,
  //   needsAuthentication: true,
  //   options: {
  //     title: "PT_PAYMENT_ASSESSMENT_FORM_WIZARD",
  //     hideFooter: true,
  //   },
  // },
  // {
  //   path: "pt-payment/assessment-form",
  //   component: FormWizard,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     title: "PUNJAB MUNICIPAL CORPORATION",
  //     hideBackButton: true,
  //   },
  // },
  // {
  //   path: "pt-payment/review-property",
  //   component: ReviewForm,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     title: "PUNJAB MUNICIPAL CORPORATION",
  //     hideBackButton: true,
  //   },
  // },
];

export default routes;
