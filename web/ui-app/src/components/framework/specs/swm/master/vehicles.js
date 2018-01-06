import Api from '../../../../../api/api';
import $ from 'jquery';

var curDate = new Date();
var formattedDate = curDate.getDate() + "/" + (curDate.getMonth() + 1) + "/" + curDate.getFullYear();
let driverDesignaionId = "";
let body = {
  "RequestInfo": {
    apiId: 'org.egov.pt',
    ver: '1.0',
    ts: '27-06-2017 10:30:12',
    action: 'asd',
    did: '4354648646',
    key: 'xyz',
    msgId: '654654',
    requesterId: '61',
    authToken: localStorage.getItem('token'),
  }
};

$.ajax({
  url: window.location.origin + '/hr-masters/designations/_search?tenantId=' + localStorage.getItem("tenantId") + '&name=Driver',
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify(body),
  success: function (result) {
    driverDesignaionId = result.Designation[0].id;
  },
  async: false
});

var dat = {
  'swm.search': {
    numCols: 4,
    useTimestamp: true,
    objectName: 'vehicles',
    url: '/swm-services/vehicles/_search',
    groups: [
      {
        name: 'VehicleDetails1',
        label: 'swm.vehicles.search.title',
        fields: [
          
          {
            name: 'vehicleTypeCode',
            jsonPath: 'vehicleTypeCode',
            label: 'swm.vehicles.create.vehicleType',
            type: 'singleValueList',
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=VehicleType|$..code|$..name',
          },
          {
            name: 'regNumber',
            jsonPath: 'regNumber',
            label: 'swm.vehicles.create.regNumber',
            type: 'text',
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          },
          {
            name: 'vendorName',
            jsonPath: 'vendorname',
            label: 'swm.vehicles.create.vendorName',
            type: 'text',
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          },
          {
            name: 'ulbowned',
            jsonPath: 'ulbowned',
            label: 'swm.vehicles.create.ulbowned',
            type: 'checkbox',
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          }
          // {
          //   name: 'vehicleTypeCode',
          //   jsonPath: 'vehicleTypeCode',
          //   label: 'swm.vehicles.create.vehicleType',
          //   type: 'singleValueList',
          //   isDisabled: false,
          //   maxLength: 128,
          //   minLength: 1,
          //   patternErrorMsg: '',
          //   url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=VehicleType|$..code|$..name',
          // },
          // {
          //   name: 'regNumber',
          //   jsonPath: 'regNumber',
          //   label: 'swm.vehicles.create.regNumber',
          //   type: 'text',
          //   isDisabled: false,
          //   maxLength: 12,
          //   minLength: 6,
          //   patternErrorMsg: '',
          // },
          // {
          //   name: 'driverCode',
          //   jsonPath: 'driverCode',
          //   label: 'swm.vehicles.create.driver',
          //   type: 'singleValueList',
          //   isDisabled: false,
          //   maxLength: 128,
          //   minLength: 1,
          //   patternErrorMsg: '',
          //   url: "hr-employee/employees/_search?&designationId=" + driverDesignaionId + "&asOnDate=" + formattedDate + "|$.Employee[*].code|$.Employee[*].name",
          // },
          // {
          //   name: 'engineSrNumber',
          //   jsonPath: 'engineSrNumber',
          //   label: 'swm.vehicles.create.engineSrNumber',
          //   type: 'text',
          //   isDisabled: false,
          //   maxLength: 256,
          //   minLength: 1,
          //   patternErrorMsg: '',
          // },
          // {
          //   name: 'chassisSrNumber',
          //   jsonPath: 'chassisSrNumber',
          //   label: 'swm.vehicles.create.chassisSrNumber',
          //   type: 'text',
          //   isDisabled: false,
          //   maxLength: 256,
          //   minLength: 1,
          //   patternErrorMsg: '',
          // },
          // {
          //   name: 'model',
          //   jsonPath: 'model',
          //   label: 'swm.vehicles.create.model',
          //   type: 'text',
          //   isDisabled: false,
          //   maxLength: 256,
          //   minLength: 1,
          //   patternErrorMsg: '',
          // },
        ],
      },
      {
        name: 'VehicleDetails2',
        label: 'swm.vehicles.create.group.title.VehicleDetails2',
        fields: [
          {
            name: 'vendor_name',
            jsonPath: 'vendorName',
            label: 'swm.vehicles.search.result.vendor',
            type: 'singleValueList',
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: 'swm-services/vendors/_search?|$.vendors.*.vendorNo|$.vendors.*.name',
          },
        ],
      },
      {
        name: 'insuranceDetails',
        label: 'swm.vehicles.create.group.title.InsuranceDetails',
        fields: [
          {
            name: 'insuranceNumber',
            jsonPath: 'insuranceNumber',
            label: 'swm.vehicles.create.insuranceNumber',
            type: 'text',
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'PurchaseDetails',
        label: 'swm.vehicles.create.group.title.PurchaseDetails',
        fields: [
          {
            name: 'purchaseDate',
            jsonPath: 'purchaseDate',
            label: 'swm.vehicles.create.purchaseDate',
            type: 'datePicker',
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    result: {
      header: [
        {
          label: 'swm.vehicles.search.result.vehicleType',
        },
        {
          label: 'swm.vehicles.search.result.regNumber',
        },
        {
          label: 'swm.vehicles.search.result.driver',
        },
        {
          label: 'swm.vehicles.search.result.vehicleCapacity',
        },
        {
          label: 'swm.vehicles.search.result.engineSrNumber',
        },
        {
          label: 'swm.vehicles.search.result.chassisSrNumber',
        },
        {
          label: 'swm.vehicles.search.result.model',
        },
        {
          label: 'swm.vehicles.search.result.vendor',
        },
      ],
      values: [
        'vehicleType.name',
        'regNumber',
        'driver.name',
        'manufacturingDetails.vehicleCapacity',
        'manufacturingDetails.engineSrNumber',
        'manufacturingDetails.chassisSrNumber',
        'manufacturingDetails.model',
        'vendor.name',
      ],
      resultPath: 'vehicles',
      rowClickUrlUpdate: '/update/swm/vehicles/{regNumber}',
      rowClickUrlView: '/view/swm/vehicles/{regNumber}',
    },
  },
  'swm.create': {
    numCols: 3,
    useTimestamp: true,
    objectName: 'vehicles',
    idJsonPath: 'vehicles[0].regNumber',
    title: 'swm.vehicles.create.title',
    groups: [
      {
        name: 'VehicleDetails1',
        label: 'swm.vehicles.create.group.title.VehicleDetails1',
        fields: [
          {
            name: 'code',
            jsonPath: 'vehicles[0].vehicleType.code',
            label: 'swm.vehicles.create.vehicleType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=VehicleType|$..code|$..name',
          },
          {
            name: 'regNumber',
            jsonPath: 'vehicles[0].regNumber',
            label: 'swm.vehicles.create.regNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          },
          {
            name: 'driver',
            jsonPath: 'vehicles[0].driver.code',
            label: 'swm.vehicles.create.driver',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: "hr-employee/employees/_search?&designationId=" + driverDesignaionId + "&asOnDate=" + formattedDate + "|$.Employee[*].code|$.Employee[*].name",
          },
          {
            name: 'vehicleCapacity',
            jsonPath: 'vehicles[0].manufacturingDetails.vehicleCapacity',
            label: 'swm.vehicles.search.result.vehicleCapacity',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'engineSrNumber',
            jsonPath: 'vehicles[0].manufacturingDetails.engineSrNumber',
            label: 'swm.vehicles.create.engineSrNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'numberOfPersonsReq',
            jsonPath: 'vehicles[0].operatorsReq',
            label: 'swm.vehicles.create.numberOfPersonsReq',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'chassisSrNumber',
            jsonPath: 'vehicles[0].manufacturingDetails.chassisSrNumber',
            label: 'swm.vehicles.create.chassisSrNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'model',
            jsonPath: 'vehicles[0].manufacturingDetails.model',
            label: 'swm.vehicles.create.model',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'fueltype',
            jsonPath: 'vehicles[0].fuelType.code',
            label: 'swm.vehicles.create.fuelType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=FuelType|$..code|$..name',
          },
        ],
      },
      {
        name: 'WarrantyDetails',
        label: 'swm.vehicles.create.group.title.WarrantyDetails',
        fields: [
          {
            name: 'isUnderWarranty',
            jsonPath: 'vehicles[0].isUnderWarranty',
            label: 'swm.vehicles.create.isUnderWarranty',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            defaultValue: false,
            showHideFields: [
              {
                ifValue: true,
                hide: [],
                show: [
                  {
                    name: 'kilometers',
                    isGroup: false,
                    isField: true,
                  },
                  {
                    name: 'endOfWarranty',
                    isGroup: false,
                    isField: true,
                  },
                ],
              }, {
                ifValue: false,
                show: [],
                hide: [
                  {
                    name: 'kilometers',
                    isGroup: false,
                    isField: true,
                  },
                  {
                    name: 'endOfWarranty',
                    isGroup: false,
                    isField: true,
                  },
                ],
              },
            ],
          },
          {
            name: 'kilometers',
            jsonPath: 'vehicles[0].kilometers',
            label: 'swm.vehicles.create.kilometers',
            type: 'number',
            hide: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'endOfWarranty',
            jsonPath: 'vehicles[0].endOfWarranty',
            label: 'swm.vehicles.create.endOfWarranty',
            type: 'datePicker',
            hide: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'VehicleDetails2',
        label: 'swm.vehicles.create.group.title.VehicleDetails2',
        fields: [
          {
            name: 'ulbOwnedVehicle',
            jsonPath: 'vehicles[0].isulbownedvehicle',
            label: 'swm.vehicles.create.ulbOwnedVehicle',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            defaultValue: false,
            showHideFields: [
              {
                ifValue: true,
                show: [],
                hide: [
                  {
                    name: 'vendorname',
                    isGroup: false,
                    isField: true,
                  },
                ],
              },  {
                ifValue: false,
                hide: [],
                show: [
                  {
                    name: 'vendorname',
                    isGroup: false,
                    isField: true,
                  },
                ],
              },
            ],
          },
          {
            name: 'vendorname',
            jsonPath: 'vehicles[0].vendor.vendorNo',
            label: 'swm.vehicles.create.vendor',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            isHidden: false,
            defaultValue: '',
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: 'swm-services/vendors/_search?|$.vendors.*.vendorNo|$.vendors.*.name',
          },
        ],
      },
      {
        name: 'insuranceDetails',
        label: 'swm.vehicles.create.group.title.InsuranceDetails',
        fields: [
          {
            name: 'insuranceNumber',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceNumber',
            label: 'swm.vehicles.create.insuranceNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'insuranceValidityDate',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceValidityDate',
            label: 'swm.vehicles.create.insuranceValidityDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'uploadInsuranceDetails',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceDocument.fileStoreId',
            label: 'swm.vehicles.create.insurance.details',
            type: 'singleFileUpload',
            pathToArray: 'documentTypes',
            displayNameJsonPath: 'name',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'PurchaseDetails',
        label: 'swm.vehicles.create.group.title.PurchaseDetails',
        fields: [
          {
            name: 'purchaseDate',
            jsonPath: 'vehicles[0].purchaseInfo.purchaseDate',
            label: 'swm.vehicles.create.purchaseDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'price',
            jsonPath: 'vehicles[0].purchaseInfo.price',
            label: 'swm.vehicles.create.price',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'sourceOfPurchase',
            jsonPath: 'vehicles[0].purchaseInfo.sourceOfPurchase',
            label: 'swm.vehicles.create.sourceOfPurchase',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 0,
            patternErrorMsg: '',
          },
          {
            name: 'remarks',
            jsonPath: 'vehicles[0].remarks',
            label: 'swm.vehicles.create.remarks',
            type: 'textarea',
            isRequired: false,
            isDisabled: false,
            maxLength: 300,
            minLength: 15,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    url: '/swm-services/vehicles/_create',
    tenantIdRequired: true,
  },
  'swm.view': {
    numCols: 4,
    useTimestamp: true,
    objectName: 'vehicles',
    groups: [
      {
        name: 'VehicleDetails1',
        label: 'swm.vehicles.create.group.title.VehicleDetails1',
        fields: [
          {
            name: 'code',
            jsonPath: 'vehicles[0].vehicleType.name',
            label: 'swm.vehicles.create.vehicleType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'regNumber',
            jsonPath: 'vehicles[0].regNumber',
            label: 'swm.vehicles.create.regNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          },
          {
            name: 'driver',
            jsonPath: 'vehicles[0].driver.name',
            label: 'swm.vehicles.create.driver',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          },
          {
            name: 'vehicleCapacity',
            jsonPath: 'vehicles[0].manufacturingDetails.vehicleCapacity',
            label: 'swm.vehicles.search.result.vehicleCapacity',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'engineSrNumber',
            jsonPath: 'vehicles[0].manufacturingDetails.engineSrNumber',
            label: 'swm.vehicles.create.engineSrNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'numberOfPersonsReq',
            jsonPath: 'vehicles[0].operatorsReq',
            label: 'swm.vehicles.create.numberOfPersonsReq',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'chassisSrNumber',
            jsonPath: 'vehicles[0].manufacturingDetails.chassisSrNumber',
            label: 'swm.vehicles.create.chassisSrNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'model',
            jsonPath: 'vehicles[0].manufacturingDetails.model',
            label: 'swm.vehicles.create.model',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'vehicles[0].fuelType.name',
            label: 'swm.vehicles.create.fuelType',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'WarrantyDetails',
        label: 'swm.vehicles.create.group.title.WarrantyDetails',
        fields: [
          {
            name: 'isUnderWarranty',
            jsonPath: 'vehicles[0].isUnderWarranty',
            label: 'swm.vehicles.create.isUnderWarranty',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            //defaultValue: false,
            showHideFields: [
              {
                ifValue: true,
                hide: [],
                show: [
                  {
                    name: 'kilometers',
                    isGroup: false,
                    isField: true,
                  },
                  {
                    name: 'endOfWarranty',
                    isGroup: false,
                    isField: true,
                  },
                ],
              },
            ],
            valueBasedOn: [
              {
                jsonPath: 'vehicles[0].kilometers',
                valueIfDataFound: true,
              },
            ],
          },
          {
            name: 'kilometers',
            jsonPath: 'vehicles[0].kilometers',
            label: 'swm.vehicles.create.kilometers',
            type: 'number',
            hide: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'endOfWarranty',
            jsonPath: 'vehicles[0].endOfWarranty',
            label: 'swm.vehicles.create.endOfWarranty',
            type: 'datePicker',
            hide: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'VehicleDetails2',
        label: 'swm.vehicles.create.group.title.VehicleDetails2',
        fields: [
          {
            name: 'ulbOwnedVehicle',
            //jsonPath: 'vehicles[0].isulbownedvehicle',
            dependentJsonPath:'vehicles[0].vendor.name',
            label: 'swm.vehicles.create.ulbOwnedVehicle',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
           // defaultValue: true,
            // valueBasedOn: [
            //   {
            //     jsonPath: 'vehicles[0].vendor.name',
            //     valueIfDataFound: false,
            //   },
            // ],
          },
          {
            name: 'vendor_name',
            jsonPath: 'vehicles[0].vendor.name',
            label: 'swm.vehicles.create.vendor',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            hide: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'insuranceDetails',
        label: 'swm.vehicles.create.group.title.InsuranceDetails',
        fields: [
          {
            name: 'insuranceNumber',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceNumber',
            label: 'swm.vehicles.create.insuranceNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'insuranceValidityDate',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceValidityDate',
            label: 'swm.vehicles.create.insuranceValidityDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'uploadInsuranceDetails',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceDocument.fileStoreId',
            label: 'swm.vehicles.create.insurance.download.details',
            type: 'singleFileUpload',
            readonly:true,
            pathToArray: 'documentTypes',
            displayNameJsonPath: 'name',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'PurchaseDetails',
        label: 'swm.vehicles.create.group.title.PurchaseDetails',
        fields: [
          {
            name: 'purchaseDate',
            jsonPath: 'vehicles[0].purchaseInfo.purchaseDate',
            label: 'swm.vehicles.create.purchaseDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'price',
            jsonPath: 'vehicles[0].purchaseInfo.price',
            label: 'swm.vehicles.create.price',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'sourceOfPurchase',
            jsonPath: 'vehicles[0].purchaseInfo.sourceOfPurchase',
            label: 'swm.vehicles.create.sourceOfPurchase',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            maxLength: 256,
            minLength: 0,
            patternErrorMsg: '',
          },
          {
            name: 'remarks',
            jsonPath: 'vehicles[0].remarks',
            label: 'swm.vehicles.create.remarks',
            type: 'textarea',
            isRequired: false,
            isDisabled: false,
            maxLength: 300,
            minLength: 15,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    tenantIdRequired: true,
    url: '/swm-services/vehicles/_search?regNumber={regNumber}',
  },
  'swm.update': {
    numCols: 3,
    useTimestamp: true,
    idJsonPath: 'vehicles[0].regNumber',
    objectName: 'vehicles',
    groups: [
      {
        name: 'VehicleDetails1',
        label: 'swm.vehicles.create.group.title.VehicleDetails1',
        fields: [
          {
            name: 'code',
            jsonPath: 'vehicles[0].vehicleType.code',
            label: 'swm.vehicles.create.vehicleType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=VehicleType|$..code|$..code',
          },
          {
            name: 'regNumber',
            jsonPath: 'vehicles[0].regNumber',
            label: 'swm.vehicles.create.regNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 12,
            minLength: 6,
            patternErrorMsg: '',
          },
          {
            name: 'driverCode',
            jsonPath: 'vehicles[0].driver.code',
            label: 'swm.vehicles.create.driver',
            type: 'singleValueList',
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: "hr-employee/employees/_search?&designationId=" + driverDesignaionId + "&asOnDate=" + formattedDate + "|$.Employee[*].code|$.Employee[*].name",
          },
          {
            name: 'vehicleCapacity',
            jsonPath: 'vehicles[0].manufacturingDetails.vehicleCapacity',
            label: 'swm.vehicles.search.result.vehicleCapacity',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'engineSrNumber',
            jsonPath: 'vehicles[0].manufacturingDetails.engineSrNumber',
            label: 'swm.vehicles.create.engineSrNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'numberOfPersonsReq',
            jsonPath: 'vehicles[0].operatorsReq',
            label: 'swm.vehicles.create.numberOfPersonsReq',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'chassisSrNumber',
            jsonPath: 'vehicles[0].manufacturingDetails.chassisSrNumber',
            label: 'swm.vehicles.create.chassisSrNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'model',
            jsonPath: 'vehicles[0].manufacturingDetails.model',
            label: 'swm.vehicles.create.model',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'vehicles[0].fuelType.code',
            label: 'swm.vehicles.create.fuelType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 128,
            minLength: 1,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=FuelType|$..code|$..code',
          },
        ],
      },
      {
        name: 'WarrantyDetails',
        label: 'swm.vehicles.create.group.title.WarrantyDetails',
        fields: [
          {
            name: 'isUnderWarranty',
            jsonPath: 'vehicles[0].isUnderWarranty',
            label: 'swm.vehicles.create.isUnderWarranty',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            defaultValue: '',
            showHideFields: [
              {
                ifValue: true,
                hide: [],
                show: [
                  {
                    name: 'kilometers',
                    isGroup: false,
                    isField: true,
                  },
                  {
                    name: 'endOfWarranty',
                    isGroup: false,
                    isField: true,
                  },
                ],
              }, {
                ifValue: false,
                show: [],
                hide: [
                  {
                    name: 'kilometers',
                    isGroup: false,
                    isField: true,
                  },
                  {
                    name: 'endOfWarranty',
                    isGroup: false,
                    isField: true,
                  },
                ],
              },
            ],
          },
          {
            name: 'kilometers',
            jsonPath: 'vehicles[0].kilometers',
            label: 'swm.vehicles.create.kilometers',
            type: 'number',
            hide: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'endOfWarranty',
            jsonPath: 'vehicles[0].endOfWarranty',
            label: 'swm.vehicles.create.endOfWarranty',
            type: 'datePicker',
            hide: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'VehicleDetails2',
        label: 'swm.vehicles.create.group.title.VehicleDetails2',
        fields: [
          {
            name: 'ulbOwnedVehicle',
           jsonPath: 'vehicles[0].isulbownedvehicle',
            //dependentJsonPath: 'vehicles[0].vendor.vendorNo',
            label: 'swm.vehicles.create.ulbOwnedVehicle',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
           defaultValue: false,
            valueBasedOn: [
              {
                jsonPath: 'vehicles[0].vendor.vendorNo',
                valueIfDataFound: false,
              },
            ],
            showHideFields: [
              {
                ifValue: true,
                hide: [
                  {
                    name: 'vendorname',
                    isGroup: false,
                    isField: true,
                  },
                ],
                show: [
                  
                ],
              },{
                ifValue: false,
                show: [
                  {
                    name: 'vendorname',
                    isGroup: false,
                    isField: true,
                  },
                ],
                hide: [
                  
                ],
              }
            ],
          },
          {
            name: 'vendorname',
            jsonPath: 'vehicles[0].vendor.vendorNo',
            label: 'swm.vehicles.create.vendor',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
            url: 'swm-services/vendors/_search?|$.vendors.*.vendorNo|$.vendors.*.name',
          },
        ],
      },
      {
        name: 'insuranceDetails',
        label: 'swm.vehicles.create.group.title.InsuranceDetails',
        fields: [
          {
            name: 'insuranceNumber',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceNumber',
            label: 'swm.vehicles.create.insuranceNumber',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
          {
            name: 'insuranceValidityDate',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceValidityDate',
            label: 'swm.vehicles.create.insuranceValidityDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'uploadInsuranceDetails',
            jsonPath: 'vehicles[0].insuranceDetails.insuranceDocument.fileStoreId',
            label: 'swm.vehicles.create.insurance.details',
            type: 'singleFileUpload',
            pathToArray: 'documentTypes',
            displayNameJsonPath: 'name',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 1,
            patternErrorMsg: '',
          },
        ], 
      },
      {
        name: 'PurchaseDetails',
        label: 'swm.vehicles.create.group.title.PurchaseDetails',
        fields: [
          {
            name: 'purchaseDate',
            jsonPath: 'vehicles[0].purchaseInfo.purchaseDate',
            label: 'swm.vehicles.create.purchaseDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'price',
            jsonPath: 'vehicles[0].purchaseInfo.price',
            label: 'swm.vehicles.create.price',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'sourceOfPurchase',
            jsonPath: 'vehicles[0].purchaseInfo.sourceOfPurchase',
            label: 'swm.vehicles.create.sourceOfPurchase',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            maxLength: 256,
            minLength: 0,
            patternErrorMsg: '',
          },
          {
            name: 'remarks',
            jsonPath: 'vehicles[0].remarks',
            label: 'swm.vehicles.create.remarks',
            type: 'textarea',
            isRequired: false,
            isDisabled: false,
            maxLength: 300,
            minLength: 15,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    url: '/swm-services/vehicles/_update',
    tenantIdRequired: true,
    searchUrl: '/swm-services/vehicles/_search?regNumber={regNumber}',
  },
};
export default dat;