var dat = {
  "inventory.search": {
    "numCols": 4,
    "useTimestamp": true,
    "objectName": "",
    "url": "inventory-services/suppliers/_search",
    "title":"inventory.supplier.title",
    "groups": [
      {
        "name": "search",
        "label": "inventory.common.searchcriteria",
        "fields": [
          {
            "name": "supplierName",
            "jsonPath": "codes",
            "label": "inventory.supplier.name",
            "type": "autoCompelete",
            "url":"inventory-services/suppliers/_search?|$..code|$..name",
            "isKeyValuePair":true,
            "isRequired": false,
            "isDisabled": false,
            "patternErrorMsg": ""
          },
          {
            "name": "supplier.type",
            "jsonPath": "type",
            "label": "inventory.supplier.type",
            "type": "singleValueList",
            "defaultValue":[
              {key: null, value: "-- Please Select --"},
              {
                 "key":"INDIVIDUAL",
                 "value":"Individual"
              },
              {
                 "key":"FIRM",
                 "value":"Firm"
              },
              {
                 "key":"COMPANY",
                 "value":"Company"
              },
              {
                 "key":"REGISTEREDSOCIETY",
                 "value":"Registered society"
              },
              {
                 "key":"GOVERNMENTDEPARTMENT",
                 "value":"Government Department"
              },
              {
                 "key":"OTHERS",
                 "value":"Others"
              }
            ],
            "isRequired": false,
            "isDisabled": false,
            "patternErrorMsg": ""
          },
          {
            "name": "isActive",
            "jsonPath": "active",
            "label": "inventory.common.active",
            "type": "checkbox",
            "defaultValue":true,
            "isRequired": false,
            "isDisabled": false,
            "patternErrorMsg": ""
          }
        ]
      }
    ],
    "result": {
      "header": [
        {
          "label": "inventory.supplier.code"
        },
        {
          "label": "inventory.supplier.name"
        }, {
          "label": "inventory.supplier.type"
        }, {
          "label": "inventory.common.active"
        }
      ],
      "values": [
        "code","name", "type", "active"
      ],
      "resultPath": "suppliers",
      "resultIdKey":"code",
      "rowClickUrlUpdate": "/update/inventory/supplier/{code}",
      "rowClickUrlView": "/view/inventory/supplier/{code}",
      "rowClickUrlAdd" : "/create/inventory/supplier",
      "rowClickUrlDelete" : {
        url:"inventory-services/suppliers/_update",
        body:{ active:false, inActiveDate:function(){ return new Date().getTime() } }
      }
    }
  },
  "inventory.create": {
    "numCols": 4,
    "useTimestamp": true,
    "objectName": "suppliers",
    "title":"inventory.supplier.title",
    "groups": [
      {
        "name": "Add Supplier",
        "label": "inventory.supplier.add.title",
        "fields": [
          {
            "name": "supplierType",
            "jsonPath": "suppliers[0].type",
            "label": "inventory.supplier.type",
            "type": "singleValueList",
            "defaultValue":[
              {key: null, value: "-- Please Select --"},
              {
                 "key":"INDIVIDUAL",
                 "value":"Individual"
              },
              {
                 "key":"FIRM",
                 "value":"Firm"
              },
              {
                 "key":"COMPANY",
                 "value":"Company"
              },
              {
                 "key":"REGISTERED SOCIETY",
                 "value":"Registered society"
              },
              {
                 "key":"GOVERNMENT DEPARTMENT",
                 "value":"Government Department"
              },
              {
                 "key":"OTHERS",
                 "value":"Others"
              }
            ],
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": ""
          }, {
            "name": "code",
            "jsonPath": "suppliers[0].code",
            "label": "inventory.supplier.code",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": ""
          }, {
            "name": "name",
            "jsonPath": "suppliers[0].name",
            "label": "inventory.supplier.name",
            "pattern": "^[a-zA-Z ]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": "inventory.create.field.message.name"
          }, {
            "name": "address",
            "jsonPath": "suppliers[0].address",
            "label": "inventory.supplier.address",
            "pattern": "^[a-zA-Z0-9 ]+$",
            "type": "textarea",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 1000,
            "patternErrorMsg": "inventory.create.field.message.address"
          }, {
            "name": "description",
            "jsonPath": "suppliers[0].description",
            "label": "inventory.supplier.description",
            "type": "textarea",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 1000,
            "patternErrorMsg": ""
          }, {
            "name": "contactNo",
            "jsonPath": "suppliers[0].contactNo",
            "label": "inventory.common.contactno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.supplierContactNo"
          }, {
            "name": "faxNo",
            "jsonPath": "suppliers[0].faxNo",
            "label": "inventory.common.faxno",
            "type": "text",
            "isRequired": false,
            "maxLength": 15,
            "pattern": "^[0-9]+$",
            "isDisabled": false,
            "patternErrorMsg": ""
          }, {
            "name": "website",
            "jsonPath": "suppliers[0].website",
            "label": "inventory.supplier.website",
            "pattern": "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 500,
            "patternErrorMsg": "inventory.create.field.message.website"
          }, {
            "name": "email",
            "jsonPath": "suppliers[0].email",
            "label": "inventory.common.email",
            "pattern": "^$|([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.email"
          }, {
            "name": "panNo",
            "jsonPath": "suppliers[0].panNo",
            "label": "inventory.common.panno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "tinNo",
            "jsonPath": "suppliers[0].tinNo",
            "label": "inventory.common.tinno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "cstNo",
            "jsonPath": "suppliers[0].cstNo",
            "label": "inventory.common.cstno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "vatNo",
            "jsonPath": "suppliers[0].vatNo",
            "label": "inventory.common.vatno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "gstNo",
            "jsonPath": "suppliers[0].gstNo",
            "label": "inventory.common.gstno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "contactPerson",
            "jsonPath": "suppliers[0].contactPerson",
            "label": "inventory.common.contactperson",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": ""
          }, {
            "name": "contactPersonNo",
            "jsonPath": "suppliers[0].contactPersonNo",
            "label": "inventory.common.contactno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.contactPersonNo"
          }, {
            "name": "active",
            "jsonPath": "suppliers[0].active",
            "label": "inventory.common.active",
            "type": "checkbox",
            "defaultValue":true,
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": "",
            "depedants": [
                {
									"jsonPath":"suppliers[0].inActiveDate",
									"type":"textField",
                  "isHidden":true,
									"pattern":"`${!getVal('suppliers[0].active') ? new Date().getTime():undefined}`",
									"rg":"",
									"isRequired": false,
									"requiredErrMsg": "",
									"patternErrMsg": ""
							 }
            ]
          }
        ]
      }, {
        "name": "Bank Information",
        "label": "inventory.common.bankinfo",
        "fields": [
          {
            "name": "name",
            "jsonPath": "suppliers[0].bankCode",
            "label": "inventory.common.bankname",
            "pattern": "^[a-zA-Z ]$",
            "type": "singleValueList",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.name",
            "url": "/egf-master/banks/_search?|$..code|$..name"
          }, {
            "name": "bankBranch",
            "jsonPath": "suppliers[0].bankBranch",
            "label": "inventory.common.bankbranchname",
            "pattern": "",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.bankBranch"
          },{
            "name": "acctNo",
            "jsonPath": "suppliers[0].acctNo",
            "label": "inventory.common.bankacctno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 16,
            "patternErrorMsg": "inventory.create.field.message.acctNo"
          }, {
            "name": "ifsc",
            "jsonPath": "suppliers[0].ifsc",
            "label": "inventory.common.ifsc",
            "pattern": "^[a-zA-Z0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.ifsc"
          }, {
            "name": "micr",
            "jsonPath": "suppliers[0].micr",
            "label": "inventory.common.micr",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }
        ]
      }
    ],
    "url": "/inventory-services/suppliers/_create",
    "tenantIdRequired": true
  },
  "inventory.view": {
    "numCols": 4,
    "useTimestamp": true,
    "objectName": "suppliers",
    "title":"inventory.supplier.title",
    "groups": [
      {
        "name": "View Supplier",
        "label": "inventory.supplier.view.title",
        "fields": [
          {
            "name": "name",
            "jsonPath": "suppliers[0].type",
            "label": "inventory.supplier.type",
            "type": "singleValueList",
            "defaultValue":[
              {key: null, value: "-- Please Select --"},
              {
                 "key":"INDIVIDUAL",
                 "value":"Individual"
              },
              {
                 "key":"FIRM",
                 "value":"Firm"
              },
              {
                 "key":"COMPANY",
                 "value":"Company"
              },
              {
                 "key":"REGISTERED SOCIETY",
                 "value":"Registered society"
              },
              {
                 "key":"GOVERNMENT DEPARTMENT",
                 "value":"Government Department"
              },
              {
                 "key":"OTHERS",
                 "value":"Others"
              }
            ],
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": ""
          }, {
            "name": "code",
            "jsonPath": "suppliers[0].code",
            "label": "inventory.supplier.code",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": ""
          }, {
            "name": "name",
            "jsonPath": "suppliers[0].name",
            "label": "inventory.supplier.name",
            "pattern": "^[a-zA-Z ]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": "inventory.create.field.message.name"
          }, {
            "name": "address",
            "jsonPath": "suppliers[0].address",
            "label": "inventory.supplier.address",
            "pattern": "^[a-zA-Z0-9 ]+$",
            "type": "textarea",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 1000,
            "patternErrorMsg": "inventory.create.field.message.address"
          }, {
            "name": "description",
            "jsonPath": "suppliers[0].description",
            "label": "inventory.supplier.description",
            "type": "textarea",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 1000,
            "patternErrorMsg": ""
          }, {
            "name": "contactNo",
            "jsonPath": "suppliers[0].contactNo",
            "label": "inventory.common.contactno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.supplierContactNo"
          }, {
            "name": "faxNo",
            "jsonPath": "suppliers[0].faxNo",
            "label": "inventory.common.faxno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 15,
            "pattern": "^[0-9]+$",
            "patternErrorMsg": ""
          }, {
            "name": "website",
            "jsonPath": "suppliers[0].website",
            "label": "inventory.supplier.website",
            "pattern": "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 500,
            "patternErrorMsg": "inventory.create.field.message.website"
          }, {
            "name": "email",
            "jsonPath": "suppliers[0].email",
            "label": "inventory.common.email",
            "pattern": "^$|([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.email"
          }, {
            "name": "panNo",
            "jsonPath": "suppliers[0].panNo",
            "label": "inventory.common.panno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "tinNo",
            "jsonPath": "suppliers[0].tinNo",
            "label": "inventory.common.tinno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "cstNo",
            "jsonPath": "suppliers[0].cstNo",
            "label": "inventory.common.cstno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "vatNo",
            "jsonPath": "suppliers[0].vatNo",
            "label": "inventory.common.vatno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "gstNo",
            "jsonPath": "suppliers[0].gstNo",
            "label": "inventory.common.gstno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "contactPerson",
            "jsonPath": "suppliers[0].contactPerson",
            "label": "inventory.common.contactperson",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": ""
          }, {
            "name": "contactPersonNo",
            "jsonPath": "suppliers[0].contactPersonNo",
            "label": "inventory.common.contactno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.contactPersonNo"
          }, {
            "name": "active",
            "jsonPath": "suppliers[0].active",
            "label": "inventory.common.active",
            "type": "checkbox",
            "defaultValue":true,
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": ""
          }
        ]
      }, {
        "name": "Bank Information",
        "label": "inventory.common.bankinfo",
        "fields": [
          {
            "name": "name",
            "jsonPath": "suppliers[0].bankCode",
            "label": "inventory.common.bankname",
            "pattern": "^[a-zA-Z ]$",
            "type": "singleValueList",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.name",
            "url": "/egf-master/banks/_search?|$..code|$..name"
          }, {
            "name": "bankBranch",
            "jsonPath": "suppliers[0].bankBranch",
            "label": "inventory.common.bankbranchname",
            "pattern": "",
            "maxLength": 100,
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": "inventory.create.field.message.bankBranch"
          },{
            "name": "acctNo",
            "jsonPath": "suppliers[0].acctNo",
            "label": "inventory.common.bankacctno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 16,
            "patternErrorMsg": "inventory.create.field.message.acctNo"
          }, {
            "name": "ifsc",
            "jsonPath": "suppliers[0].ifsc",
            "label": "inventory.common.ifsc",
            "pattern": "^[a-zA-Z0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.ifsc"
          }, {
            "name": "micr",
            "jsonPath": "suppliers[0].micr",
            "label": "inventory.common.micr",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }
        ]
      }
    ],
    "tenantIdRequired": true,
    "url": "inventory-services/suppliers/_search?codes={codes}"
  },
  "inventory.update": {
    "numCols": 4,
    "useTimestamp": true,
    "objectName": "suppliers",
    "title":"inventory.supplier.title",
    "groups": [
      {
        "name": "Update Supplier",
        "label": "inventory.supplier.update.title",
        "fields": [
          {
            "name": "supplierType",
            "jsonPath": "suppliers[0].type",
            "label": "inventory.supplier.type",
            "type": "singleValueList",
            "defaultValue":[
              {key: null, value: "-- Please Select --"},
              {
                 "key":"INDIVIDUAL",
                 "value":"Individual"
              },
              {
                 "key":"FIRM",
                 "value":"Firm"
              },
              {
                 "key":"COMPANY",
                 "value":"Company"
              },
              {
                 "key":"REGISTERED SOCIETY",
                 "value":"Registered society"
              },
              {
                 "key":"GOVERNMENT DEPARTMENT",
                 "value":"Government Department"
              },
              {
                 "key":"OTHERS",
                 "value":"Others"
              }
            ],
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": ""
          }, {
            "name": "code",
            "jsonPath": "suppliers[0].code",
            "label": "inventory.supplier.code",
            "type": "text",
            "isRequired": true,
            "isDisabled": true,
            "maxLength": 50,
            "patternErrorMsg": ""
          }, {
            "name": "name",
            "jsonPath": "suppliers[0].name",
            "label": "inventory.supplier.name",
            "pattern": "^[a-zA-Z ]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": "inventory.create.field.message.name"
          }, {
            "name": "address",
            "jsonPath": "suppliers[0].address",
            "label": "inventory.supplier.address",
            "pattern": "^[a-zA-Z0-9 ]+$",
            "type": "textarea",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 1000,
            "patternErrorMsg": "inventory.create.field.message.address"
          }, {
            "name": "description",
            "jsonPath": "suppliers[0].description",
            "label": "inventory.supplier.description",
            "type": "textarea",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 1000,
            "patternErrorMsg": ""
          }, {
            "name": "contactNo",
            "jsonPath": "suppliers[0].contactNo",
            "label": "inventory.common.contactno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.supplierContactNo"
          }, {
            "name": "faxNo",
            "jsonPath": "suppliers[0].faxNo",
            "label": "inventory.common.faxno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 15,
            "pattern": "^[0-9]+$",
            "patternErrorMsg": ""
          }, {
            "name": "website",
            "jsonPath": "suppliers[0].website",
            "label": "inventory.supplier.website",
            "pattern": "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 500,
            "patternErrorMsg": "inventory.create.field.message.website"
          }, {
            "name": "email",
            "jsonPath": "suppliers[0].email",
            "label": "inventory.common.email",
            "pattern": "^$|([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.email"
          }, {
            "name": "panNo",
            "jsonPath": "suppliers[0].panNo",
            "label": "inventory.common.panno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "tinNo",
            "jsonPath": "suppliers[0].tinNo",
            "label": "inventory.common.tinno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "cstNo",
            "jsonPath": "suppliers[0].cstNo",
            "label": "inventory.common.cstno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "vatNo",
            "jsonPath": "suppliers[0].vatNo",
            "label": "inventory.common.vatno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "gstNo",
            "jsonPath": "suppliers[0].gstNo",
            "label": "inventory.common.gstno",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": ""
          }, {
            "name": "contactPerson",
            "jsonPath": "suppliers[0].contactPerson",
            "label": "inventory.common.contactperson",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 50,
            "patternErrorMsg": ""
          }, {
            "name": "contactPersonNo",
            "jsonPath": "suppliers[0].contactPersonNo",
            "label": "inventory.common.contactno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": false,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.contactPersonNo"
          }, {
            "name": "active",
            "jsonPath": "suppliers[0].active",
            "label": "inventory.common.active",
            "type": "checkbox",
            "defaultValue":true,
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": "",
            "depedants": [
                {
									"jsonPath":"suppliers[0].inActiveDate",
									"type":"textField",
                  "isHidden":true,
									"pattern":"`${!getVal('suppliers[0].active') ? new Date().getTime():undefined}`",
									"rg":"",
									"isRequired": false,
									"requiredErrMsg": "",
									"patternErrMsg": ""
							 }
            ]
          }
        ]
      }, {
        "name": "Bank Information",
        "label": "inventory.common.bankinfo",
        "fields": [
          {
            "name": "name",
            "jsonPath": "suppliers[0].bankCode",
            "label": "inventory.common.bankname",
            "pattern": "^[a-zA-Z ]$",
            "type": "singleValueList",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 100,
            "patternErrorMsg": "inventory.create.field.message.name",
            "url": "/egf-master/banks/_search?|$..code|$..name"
          }, {
            "name": "bankBranch",
            "jsonPath": "suppliers[0].bankBranch",
            "label": "inventory.common.bankbranchname",
            "pattern": "",
            "maxLength": 100,
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "patternErrorMsg": "inventory.create.field.message.bankBranch"
          },{
            "name": "acctNo",
            "jsonPath": "suppliers[0].acctNo",
            "label": "inventory.common.bankacctno",
            "pattern": "^[0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 16,
            "patternErrorMsg": "inventory.create.field.message.acctNo"
          }, {
            "name": "ifsc",
            "jsonPath": "suppliers[0].ifsc",
            "label": "inventory.common.ifsc",
            "pattern": "^[a-zA-Z0-9]+$",
            "type": "text",
            "isRequired": true,
            "isDisabled": false,
            "maxLength": 10,
            "patternErrorMsg": "inventory.create.field.message.ifsc"
          }, {
            "name": "micr",
            "jsonPath": "suppliers[0].micr",
            "label": "inventory.common.micr",
            "type": "text",
            "maxLength": 10,
            "isRequired": false,
            "isDisabled": false,
            "patternErrorMsg": ""
          }
        ]
      }
    ],
    "url": "inventory-services/suppliers/_update",
    "tenantIdRequired": true,
    "searchUrl": "inventory-services/suppliers/_search?codes={codes}"
  }
}

export default dat;
