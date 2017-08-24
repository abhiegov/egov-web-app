import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import _ from "lodash";
import ShowFields from "../../framework/showFields";
import {Grid, Row, Col, Table, DropdownButton} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {translate} from '../../common/common';
import Api from '../../../api/api';
import UiButton from '../../framework/components/UiButton';
import UiDynamicTable from '../../framework/components/UiDynamicTable';
import UiTable from '../../framework/components/UiTable';
import {fileUpload} from '../../framework/utility/utility';
import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import WaterReceipt from './receipts/WaterReceipt';
import WaterCertificate from './receipts/WaterCertificate';
import PropertyTaxExtract from './receipts/PropertyTaxExtract';
import PropertyTaxCertificate from './receipts/PropertyTaxCertificate';

import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.html5.js';// HTML 5 file export
import 'datatables.net-buttons/js/buttons.flash.js';// Flash file export
import jszip from 'jszip/dist/jszip';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons-bs';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import PDFObject from "pdfobject";
import html2canvas from "html2canvas";
import axios from "axios";





pdfMake.vfs = pdfFonts.pdfMake.vfs;

var specifications={};

let reqRequired = [];
class NoDues extends Component {



  constructor(props) {
    super(props);
    this.state = {
      showResult: true,
      resultList : {
        resultHeader: [],
        resultValues: []
      },
      values: [],
      pathname:"",
      finished: false,
      stepIndex: 0,
      open: false,
      demands:[],
      serviceRequest:{}
    }
  }


    handleOpen = () => {
      let {demands}=this.state;
      let self=this;
      let {formData}=this.props;
      //api call
      let request=
      {
           "tenantId": "default",
           "serviceRequestId": null,
           "serviceCode": "PT_NODUES",
           "lat": 12,
           "lang": 23,
           "address": "address",
           "addressId": "addressId",
           "email": "email",
           "deviceId": "deviceId",
           "accountId": "accountId",
           "firstName": "",
           "lastName": "firstName",
           "phone": "phone",
           "description": "",
           "consumerCode" :"AP-PT-2017/08/18-004950-13",
           "attributeValues": [
             {
               "key": "tenantId",
               "value": "default"
             }
           ],
           "status": "",
           "assignedTo": "assignedTo",
           "comments": [
             "",
             ""
           ],
           "backendServiceDetails": {}
         }
	      self.props.setLoadingStatus('show');


      Api.commonApiPost("/citizen-services/v1/requests/_create", {}, {"serviceReq":request}, null, self.props.metaData["noDues.search"].useTimestamp,false).then(function(res){
        self.props.setLoadingStatus('hide');


        self.setState({
          serviceRequest:res.serviceReq
        });
        console.log(res);
        self.setState({open: true});

      }, function(err) {
        self.props.toggleSnackbarAndSetText(true, err.message, false, true);
        self.props.setLoadingStatus('hide');
      })

      Api.commonApiPost("/billing-service/bill/_generate", {businessService:"PT",consumerCode:formData.consumerCode}, {}, null, self.props.metaData["noDues.search"].useTimestamp,false,localStorage.getItem("auth-token-temp")).then(function(res){
        self.props.setLoadingStatus('hide');
        let Receipt=[];
        Receipt[0]={"Bill":[]};
        Receipt[0]["Bill"]=res.Bill;
        Receipt[0]["Bill"][0]["paidBy"]=Receipt[0]["Bill"][0].payeeName;
        Receipt[0]["tenantId"]=window.localStorage.getItem("tenantId")
        Receipt[0]["instrument"]={"tenantId":window.localStorage.getItem("tenantId"),"amount":self.getTotal(demands),"instrumentType":{"name":"Cash"}}

        Receipt[0]["Bill"][0]["billDetails"][0]["amountPaid"]=self.getTotal(demands);

        console.log(Receipt);
        // Receipt.push(res.Bill);
        self.setState({
          Receipt
        });
        console.log(Receipt);
        self.setState({open: true});

      }, function(err) {
        self.props.toggleSnackbarAndSetText(true, err.message, false, true);
        self.props.setLoadingStatus('hide');
      })




    };

    handleClose = () => {
      this.setState({open: false});
    };



  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };



  setLabelAndReturnRequired(configObject) {
    if(configObject && configObject.groups) {
      for(var i=0; i<configObject.groups.length; i++) {
        configObject.groups[i].label = translate(configObject.groups[i].label);
        for (var j = 0; j < configObject.groups[i].fields.length; j++) {
              configObject.groups[i].fields[j].label = translate(configObject.groups[i].fields[j].label);
              if (configObject.groups[i].fields[j].isRequired)
                  reqRequired.push(configObject.groups[i].fields[j].jsonPath);
        }

        if(configObject.groups[i].children && configObject.groups[i].children.length) {
          for(var k=0; k<configObject.groups[i].children.length; k++) {
            this.setLabelAndReturnRequired(configObject.groups[i].children[k]);
          }
        }
      }
    }
  }

  setDefaultValues (groups, dat) {
    for(var i=0; i<groups.length; i++) {
      for(var j=0; j<groups[i].fields.length; j++) {
        if(typeof groups[i].fields[j].defaultValue == 'string' || typeof groups[i].fields[j].defaultValue == 'number' || typeof groups[i].fields[j].defaultValue == 'boolean') {
          //console.log(groups[i].fields[j].name + "--" + groups[i].fields[j].defaultValue);
          _.set(dat, groups[i].fields[j].jsonPath, groups[i].fields[j].defaultValue);
        }

        if(groups[i].fields[j].children && groups[i].fields[j].children.length) {
          for(var k=0; k<groups[i].fields[j].children.length; k++) {
            this.setDefaultValues(groups[i].fields[j].children[k].groups);
          }
        }
      }
    }
  }

  getVal = (path) => {
    return typeof _.get(this.props.formData, path) != "undefined" ? _.get(this.props.formData, path) : "";
  }

  initData() {
    if (this.props.match.params.status=="receipt") {
      this.setState({stepIndex:2})
    }
    if (this.props.match.params.status=="pay") {
      this.setState({stepIndex:1})
    }
    //
    // var doc = new jsPDF()
    // doc.text(20, 20, 'Hello world!')
    // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
    // doc.addPage()
    // doc.text(20, 20, 'Do you like that?')
    //
    // // doc.save('Receipt-'+ '.pdf');
    // var options = {
    // height: "400px",
    // page: '2',
    // pdfOpenParams: {
    //     view: 'FitV',
    //     pagemode: 'thumbs',
    //     search: 'lorem ipsum'
    //   }
    // };

    // console.log($("#ReceiptDemo").length);
    // console.log(doc.output('datauri'));
    // PDFObject.embed(doc.output('datauri'), "#ReceiptDemo", options);

    let hashLocation = window.location.hash;
    specifications = require(`../../framework/specs/citizenService/noDues`).default;
    let { setMetaData, setModuleName, setActionName, initForm, setMockData, setFormData } = this.props;
    let obj = specifications["noDues.search"];
    reqRequired = [];
    this.setLabelAndReturnRequired(obj);
    initForm(reqRequired);
    setMetaData(specifications);
    setMockData(JSON.parse(JSON.stringify(specifications)));
    setModuleName("citizenService");
    setActionName("noDues");
    var formData = {};
    if(obj && obj.groups && obj.groups.length) this.setDefaultValues(obj.groups, formData);
    setFormData(formData);
    this.setState({
      pathname:this.props.history.location.pathname
    })
  }

  componentDidMount() {
      this.initData();
  }

  componentWillReceiveProps(nextProps){
    if (this.state.pathname!=nextProps.history.location.pathname) {
      this.initData();
    }
  }

  search = (e) => {
    e.preventDefault();
    let self = this;
    // self.props.setLoadingStatus('loading');
    var formData = {...this.props.formData};
    delete formData['mobileNumber'];
    // console.log(formData);
    // for(var key in formData) {
    //   if(formData[key] !== "" && typeof formData[key] == "undefined")
    //     delete formData[key];
    // }
    // this.handleNext();
    //   var resultList = {
    //     resultHeader: [{label: "#"}, ...self.props.metaData["noDues.search"].result.header],
    //     resultValues: []
    //   };
    //   resultList.resultValues.push(["1","murali","2016-17","100"]);
    //   resultList.resultValues.push(["2","abhishek","2016-17","200"]);
    //
    //   self.setState({
    //     resultList,
    //     showResult: true
    //   });
    var instance = axios.create({
      baseURL: window.location.origin,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0',
      }
    });

    var params = new URLSearchParams();
    params.append('username', "murali");
    params.append('password', "12345678");
    params.append('grant_type', 'password');
    params.append('scope', 'read');
    params.append('tenantId', window.localStorage.getItem("tenantId"));

    instance.post('/user/oauth/token', params).then(function(response) {
      localStorage.setItem("auth-token-temp", response.data.access_token);
      Api.commonApiPost(self.props.metaData["noDues.search"].url, formData, {}, null, self.props.metaData["noDues.search"].useTimestamp,false,response.data.access_token).then(function(res){
        self.props.setLoadingStatus('hide');

        self.setState({
          demands:res.Demands
        });
        self.handleNext();
      }, function(err) {
        self.props.toggleSnackbarAndSetText(true, err.message, false, true);
        self.props.setLoadingStatus('hide');
      })


    }).catch(function(response) {
      self.props.setLoadingStatus('hide');
      // self.setState({
      //   errorMsg: "Please check your username and password"
      // });
    });



  }

  getVal = (path) => {
    return _.get(this.props.formData, path) || "";
  }

  handleChange=(e, property, isRequired, pattern, requiredErrMsg="Required",patternErrMsg="Pattern Missmatch") => {
      let {handleChange}=this.props;
      handleChange(e,property, isRequired, pattern, requiredErrMsg, patternErrMsg);
  }

  rowClickHandler = (index) => {
    var value = this.state.values[index];
    var _url = window.location.hash.split("/").indexOf("update") > -1 ? this.props.metaData["noDues.search"].result.rowClickUrlUpdate : this.props.metaData["noDues.search"].result.rowClickUrlView;
    var key = _url.split("{")[1].split("}")[0];
    _url = _url.replace("{" + key + "}", _.get(value, key));
    this.props.setRoute(_url);
  }

  cancel=()=>{
    this.handleClose();
  }

  pay=()=>{
    let {serviceRequest,Receipt}=this.state;
    let self=this;
    this.handleClose();
    self.props.setLoadingStatus('show');
    // Api.commonApiPost("/citizen-services/v1/requests/_update", {}, {"serviceReq":serviceRequest}, null, self.props.metaData["noDues.search"].useTimestamp,false).then(function(res){
    //   self.props.setLoadingStatus('hide');
    //
    //
    //   // self.setState({
    //   //   receipt:res.serviceReq
    //   // });
    //   console.log(res);
    //   self.handleNext();
    //
    // }, function(err) {
    //   self.props.toggleSnackbarAndSetText(true, err.message, false, true);
    //   self.props.setLoadingStatus('hide');
    // })

    Api.commonApiPost("/collection-services/receipts/_create", {}, {"Receipt":Receipt}, null, self.props.metaData["noDues.search"].useTimestamp,false,localStorage.getItem("auth-token-temp")).then(function(res){
      self.props.setLoadingStatus('hide');


      self.setState({
        Receipt:res.Receipt
      });
      console.log(res);
      self.handleNext();

    }, function(err) {
      self.props.toggleSnackbarAndSetText(true, err.message, false, true);
      self.props.setLoadingStatus('hide');
    })

  }

  generatePdf=(id)=>{

    /*const input = document.getElementById('CertificateForWc');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210,130);
        pdf.save("receipt.pdf");
      });

    let {tenantInfo,formData}=this.props;
    let {getVal,getGrandTotal,getTotal,getPurposeTotal}=this;*/
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    var cdn = `
      <!-- Latest compiled and minified CSS -->
      <link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <!-- Optional theme -->
      <link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">  `;
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write(cdn);
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById('CertificateForWc').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(function(){
      mywindow.print();
      mywindow.close();
    }, 1000);

    return true;
    return;


    // let x=5,y=5,w=200,h=90,rectGap=10,originalX=5,originalY=10,dublicateX=5,dublicateY=5,triplicateX=5,triplicateY=5;
    //
    // const input = document.getElementById('DownloadReceipt');
    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/jpeg');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'JPEG', 0, 0, 210,130);
    //     pdf.save("receipt.pdf");
    //   });


      // var doc = new jsPDF();
      // doc.rect(x, y, w, h)
      // doc.rect(x, (h*1)+rectGap, w, h)
      // doc.rect(x, (h*2)+rectGap+5, w, h)
      // doc.setFontSize(14);
      // doc.setFontType("bold");
      // doc.text(originalX+100, originalY+5,translate(tenantInfo[0].city.name), 'center');
      // doc.text(originalX+170, originalY+5,"Original");
      // doc.setFontType("normal");
      // doc.setFontSize(10);
      // doc.text(originalX+100, originalY+10, "Receipt", 'center');

      // var elem = document.getElementById("ReceiptForWcAPartOne");
      // var res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {startY: originalY+12});
      //
      // elem = document.getElementById("ReceiptForWcAPartTwo");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {startY: doc.autoTable.previous.finalY});
      //
      // elem = document.getElementById("basic-table3");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY: doc.autoTable.previous.finalY});
      //
      // doc.setLineWidth(0.5)
      // doc.line(doc.autoTable.previous.finalX+12.5, 25, 210, 25)
      //
      // doc.setFontSize(14);
      // doc.setFontType("bold");
      // doc.text(originalX+100, doc.autoTable.previous.finalY+25,translate(tenantInfo[0].city.name), 'center');
      // doc.text(originalX+170, doc.autoTable.previous.finalY+25,"Duplicate");
      // doc.setFontType("normal");
      // doc.setFontSize(10);
      // doc.text(originalX+100, doc.autoTable.previous.finalY+30, "Receipt", 'center');
      //
      // var elem = document.getElementById("basic-table1");
      // var res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY: doc.autoTable.previous.finalY+32});
      //
      // elem = document.getElementById("basic-table2");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {startY: doc.autoTable.previous.finalY,theme: "striped"});
      //
      // elem = document.getElementById("basic-table3");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY: doc.autoTable.previous.finalY});
      //
      // doc.setLineWidth(0.5)
      // doc.line(doc.autoTable.previous.finalX+12.5, 25, 210, 25)
      //
      // doc.setFontSize(14);
      // doc.setFontType("bold");
      // doc.text(originalX+100, doc.autoTable.previous.finalY+25,translate(tenantInfo[0].city.name), 'center');
      // doc.text(originalX+170, doc.autoTable.previous.finalY+25,"Triplicate");
      // doc.setFontType("normal");
      // doc.setFontSize(10);
      // doc.text(originalX+100, doc.autoTable.previous.finalY+30, "Receipt", 'center');
      //
      // var elem = document.getElementById("basic-table1");
      // var res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY: doc.autoTable.previous.finalY+32});
      //
      // elem = document.getElementById("basic-table2");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {startY: doc.autoTable.previous.finalY,theme: "striped"});
      //
      // elem = document.getElementById("basic-table3");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY: doc.autoTable.previous.finalY});

      // doc.setFontSize(14);
      // doc.setFontType("bold");
      // doc.text(originalX+100, doc.autoTable.previous.finalY+25, "Receipt"+" Duplicate" , 'center');
      // doc.setFontType("normal");
      // doc.text(originalX+100, doc.autoTable.previous.finalY+30,translate(tenantInfo[0].city.name), 'center');
      // doc.setFontSize(10);
      //
      // var elem = document.getElementById("basic-table1");
      // var res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY: doc.autoTable.previous.finalY+37,columnStyles: {
      //       "Payee Name": {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
      //   }});
      //
      // elem = document.getElementById("basic-table2");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {startY: doc.autoTable.previous.finalY,theme: "striped"});
      //
      //
      // //duplicate
      // doc.setFontSize(14);
      // doc.setFontType("bold");
      // doc.text(originalX+100, doc.autoTable.previous.finalY+25, "Receipt"+" Triplicate" , 'center');
      // doc.setFontType("normal");
      // doc.text(originalX+100, doc.autoTable.previous.finalY+30,translate(tenantInfo[0].city.name), 'center');
      // doc.setFontSize(10);
      //
      // var elem = document.getElementById("basic-table1");
      // var res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {showHeader:"never",startY:doc.autoTable.previous.finalY+ 37,columnStyles: {
      //       "Payee Name": {fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold'}
      //   }});
      //
      // elem = document.getElementById("basic-table2");
      // res = doc.autoTableHtmlToJson(elem);
      // doc.autoTable(res.columns, res.data, {startY:doc.autoTable.previous.finalY,theme: "striped"});

      //
      //
      //  doc.save("Receipt"+'-' + getVal("Receipt[0].transactionId") + '.pdf');
      //
      //  doc=new jsPDF();
      //  //
      // //  var elem = document.getElementById("CertificateForWc");
      // //  var res = doc.autoTableHtmlToJson(elem);
      // //  doc.autoTable(res.columns, res.data, {startY: originalY+12});
      //  //
      //  doc.save("Receipt"+'-' + getVal("Receipt[0].transactionId") + '.pdf');


       //doc.save(id+'-' + getVal("Receipt[0].transactionId") + '.pdf');

  }

  getTotal=(demands)=>{
    let sum=0;
    for (var i = 0; i < demands[0].demandDetails.length; i++) {
      sum+=(demands[0].demandDetails[i].taxAmount-demands[0].demandDetails[i].collectionAmount);
    }
    return sum;
  }

  int_to_words=(int)=> {
      if (int === 0) return 'zero';

      var ONES  = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      var TENS  = ['','','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety'];
      var SCALE = ['','thousand','million','billion','trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion'];

      // Return string of first three digits, padded with zeros if needed
      function get_first(str) {
        return ('000' + str).substr(-3);
      }

      // Return string of digits with first three digits chopped off
      function get_rest(str) {
        return str.substr(0, str.length - 3);
      }

      // Return string of triplet convereted to words
      function triplet_to_words(_3rd, _2nd, _1st) {
        return (_3rd == '0' ? '' : ONES[_3rd] + ' hundred ') + (_1st == '0' ? TENS[_2nd] : TENS[_2nd] && TENS[_2nd] + '-' || '') + (ONES[_2nd + _1st] || ONES[_1st]);
      }

      // Add to words, triplet words with scale word
      function add_to_words(words, triplet_words, scale_word) {
        return triplet_words ? triplet_words + (scale_word && ' ' + scale_word || '') + ' ' + words : words;
      }

      function iter(words, i, first, rest) {
        if (first == '000' && rest.length === 0) return words;
        return iter(add_to_words(words, triplet_to_words(first[0], first[1], first[2]), SCALE[i]), ++i, get_first(rest), get_rest(rest));
      }

      return iter('', 0, get_first(String(int)), get_rest(String(int)));
  }

  render() {
    let {mockData, moduleName, actionName, formData, fieldErrors, isFormValid,match} = this.props;
    let {search,cancel,pay, handleChange, getVal, addNewCard, removeCard, rowClickHandler,handleClose,handleOpen,generatePdf,getTotal,int_to_words} = this;
    let {showResult, resultList,open,demands,Receipt} = this.state;
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    console.log(formData);
    console.log(demands);
    const getStepContent=(stepIndex)=> {
      switch (stepIndex) {
        case 0:
          return (<div>
            <ShowFields groups={mockData["noDues.search"].groups} noCols={mockData["noDues.search"].numCols} ui="google" handler={handleChange} getVal={getVal} fieldErrors={fieldErrors} useTimestamp={mockData["noDues.search"].useTimestamp || false} addNewCard={""} removeCard={""}/>

              <div style={{"textAlign": "center"}}>
                <UiButton handler={search} item={{"label": "Search", "uiType":"button", "isDisabled": isFormValid ? false : true}} ui="google"/>
              </div>
            </div>);
        case 1:
          return (<div>{showResult &&
            <Card>
              <CardHeader title={"Payment Details"}/>
              <CardText>
                {demands.length>0 && <Table responsive>
                     <thead>
                       <tr>

                         <th>Tax Period From</th>
                         <th>Tax Period To</th>
                         <th>Tax Head</th>
                         <th style={{textAlign:"right"}}>Outstanding Amount (Rs) </th>

                       </tr>
                      </thead>
                      <tbody>
                          {demands[0].demandDetails.map((item,key)=>{
                            return (<tr key={key}>
                                <td>{new Date(demands[0].taxPeriodFrom).getDate()+"-"+new Date(demands[0].taxPeriodFrom).getMonth()+"-"+new Date(demands[0].taxPeriodFrom).getFullYear()}</td>
                                <td>{new Date(demands[0].taxPeriodTo).getDate()+"-"+new Date(demands[0].taxPeriodTo).getMonth()+"-"+new Date(demands[0].taxPeriodTo).getFullYear()}</td>

                               <td>{item.taxHeadMasterCode}</td>
                               <td style={{textAlign:"right"}}>{item.taxAmount-item.collectionAmount}</td>
                            </tr>)
                          })}


                       </tbody>
                 </Table>}


                  <Table responsive>

                      <thead>

                          <tr>
                             <th colSpan={3} style={{textAlign:"left"}}><strong>Application Fees (Rs)</strong></th>
                             <th style={{textAlign:"right"}}><strong> 100</strong></th>
                          </tr>
                          <tr>
                             <th colSpan={3} style={{textAlign:"left"}}><strong>Total (Rs) </strong></th>
                             <th style={{textAlign:"right"}}><strong>{getTotal(demands)+100}</strong></th>
                          </tr>
                      </thead>
                  </Table>
              </CardText>
            </Card>

          }
                  <div style={{"textAlign": "center"}}>
                    <br/>

                    <UiButton handler={cancel} item={{"label": "Cancel", "uiType":"button", "isDisabled": isFormValid ? false : true}} ui="google"/>{"  "}
                    <UiButton handler={handleOpen} item={{"label": "Pay", "uiType":"button", "isDisabled": isFormValid ? false : true}} ui="google"/>

                      <Dialog
                          title="Payment Gateway - Mock"

                          modal={false}
                          open={open}
                          onRequestClose={handleClose}
                          autoScrollBodyContent={true}
                        >
                        <div style={{textAlign:"center"}}>

                            <h4>Amount to be paid: Rs {getTotal(demands)+100}</h4>
                            <br/>

                        </div>

                        <UiButton handler={cancel} item={{"label": "Cancel", "uiType":"button", "isDisabled": isFormValid ? false : true}} ui="google"/>{"  "}
                        <UiButton handler={pay} item={{"label": "Pay", "uiType":"button", "isDisabled": isFormValid ? false : true}} ui="google"/>

                   </Dialog>
                  </div>
            </div>);
        case 2:
          return (<div>

            {showResult &&
              <Grid >
                {Receipt.length>0 &&  <Row >
                      <Col md={6} >
                      <Card>
                        <CardHeader title="Receipt"/>
                        <CardText>
                              <Table responsive style={{fontSize:"bold"}} id="ReceiptForWcAPartOne" striped bordered condensed>
                                  <tbody>
                                      <tr>
                                          <td style={{textAlign:"left"}}>
                                            ULB Logo
                                          </td>
                                          <td style={{textAlign:"center"}}>
                                            ULB Name
                                            Department
                                          </td>
                                          <td style={{textAlign:"right"}}>
                                            MAH
                                            LOGO
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style={{textAlign:"left"}}>
                                            {Receipt[0].Bill[0].billDetails[0].receiptNumber}
                                          </td>
                                          <td style={{textAlign:"center"}}>
                                              {Receipt[0].Bill[0].payeeName}
                                          </td>
                                          <td style={{textAlign:"right"}}>
                                            {new Date(Receipt[0].Bill[0].billDetails[0].receiptDate).getDate()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].receiptDate).getMonth()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].receiptDate).getFullYear()}
                                          </td>
                                      </tr>
                                      <tr>
                                          <td colSpan={3} style={{textAlign:"left"}}>
                                            {match.params.id=="watercharge"?"Water Connection":"Property"} No : {Receipt[0].transactionId}<br/>
                                            Consumer Owner Name : {Receipt[0].Bill[0].payeeName}<br/>
                                            Amount :{Receipt[0].Bill[0].billDetails[0].amountPaid}<br/>
                                            Consumer Address :{Receipt[0].Bill[0].payeeAddress?Receipt[0].Bill[0].payeeAddress:"Bangalore"}<br/>
                                            Received From : {Receipt[0].Bill[0].billDetails[0].billDescription}<br/>
                                          </td>
                                      </tr>

                                  </tbody>
                              </Table>

                              <Table id="ReceiptForWcAPartTwo" responsive striped bordered condensed>
                                  <tbody>
                                      <tr>
                                          <td rowSpan={2}>
                                            Bill Reference No.& Date
                                          </td>
                                          <td rowSpan={2}>
                                            Details
                                          </td>
                                          <td colSpan={2}>
                                            Demand
                                          </td>
                                          <td colSpan={2}>
                                            Payment Received
                                          </td>
                                          <td colSpan={2}>
                                            Balance
                                          </td>
                                      </tr>
                                      <tr>
                                          <td >
                                            Arrears
                                          </td>
                                          <td >
                                            Current
                                          </td>
                                          <td >
                                            Arrears
                                          </td>
                                          <td >
                                            Current
                                          </td>
                                          <td >
                                            Arrears
                                          </td>
                                          <td >
                                            Current
                                          </td>
                                      </tr>
                                      <tr>
                                          <td >
                                            {Receipt[0].Bill[0].billDetails[0].billNumber +" "+new Date(Receipt[0].Bill[0].billDetails[0].receiptDate).getDate()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].receiptDate).getMonth()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].receiptDate).getFullYear()}

                                          </td>
                                          <td >
                                            {match.params.id=="watercharge"?"Water":"Property"} No dues
                                          </td>
                                          <td >

                                          </td>
                                          <td >

                                          </td>
                                          <td >

                                          </td>
                                          <td >

                                          </td>
                                          <td>

                                          </td>
                                          <td>

                                          </td>
                                      </tr>

                                      <tr>
                                          <td colSpan={4}>Amount in words :{int_to_words(getTotal(demands)+100)}</td>
                                          <td colSpan={4}>Total Outstanding after collection</td>
                                      </tr>
                                      <tr>
                                        <td colSpan={8}>
                                          Payment Mode
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Mode
                                        </td>
                                        <td>
                                          Amount
                                        </td>
                                        <td colSpan={2}>
                                          Cheque / DD No.
                                        </td>
                                        <td colSpan={2}>
                                          Cheque / DD Date.
                                        </td>
                                        <td colSpan={4}>
                                          Bank Name
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {Receipt[0].instrument.instrumentType.name}
                                        </td>
                                        <td>
                                          {getTotal(demands)+100}
                                        </td>
                                        <td colSpan={2}>
                                          {Receipt[0].instrument.instrumentType.name=="Cash"?"":Receipt[0].instrument.transactionNumber}
                                        </td>
                                        <td colSpan={2}>
                                          {Receipt[0].instrument.instrumentType.name=="Cash"?"":(new Date(Receipt[0].instrument.transactionDate).getDate()+"-"+new Date(Receipt[0].instrument.transactionDate).getMonth()+"-"+new Date(Receipt[0].instrument.transactionDate).getFullYear())}
                                        </td>
                                        <td colSpan={2}>
                                          {Receipt[0].instrument.instrumentType.name=="Cash"?"":Receipt[0].instrument.bank.name}
                                        </td>
                                      </tr>
                                  </tbody>
                              </Table>
                        </CardText>
                      </Card>
                      </Col>
                      <Col md={6} id="DownloadReceipt">
                      <Card>
                        <CardHeader title="Certificate"/>
                        <CardText>
                            <Table responsive style={{fontSize:"bold"}} id="CertificateForWc"  striped bordered condensed>
                                  <tbody>
                                      <tr>
                                          <td style={{textAlign:"left"}}>
                                            ULB Logo
                                          </td>
                                          <td style={{textAlign:"center"}}>
                                            ULB Name
                                            Revenue
                                          </td>
                                          <td style={{textAlign:"right"}}>
                                            MAH
                                            LOGO
                                          </td>
                                      </tr>
                                      <tr>
                                          <td colSpan={3}>
                                            <div style={{textAlign:"center"}}>
                                                No Due Certificate / थकबाकी नसल्याचे प्रमाणपत्र<br/>
                                              (मुवंई प्रांतिक महानगरपालिका अधिनियम 1949 चे अनुसूचीतील प्रकरण 8 अधिनियम 44, 45 व 46 अन्वये )
                                            </div>
                                            <br/>
                                            <div style={{textAlign:"right"}}>
                                                  Date / दिनांक :{new Date(Receipt[0].Bill[0].billDetails[0].billDate).getDate()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].billDate).getMonth()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].billDate).getFullYear()} <br/>
                                                  Certificate No. / प्रमाणपत्र क्रं : {Receipt[0].transactionId}

                                            </div>
                                            <br/>
                                            <div style={{textAlign:"left"}}>
                                              प्रती,<br/>
                                              {Receipt[0].Bill[0].payeeName}<br/>
                                              {Receipt[0].Bill[0].payeeAddress?Receipt[0].Bill[0].payeeAddress:""}


                                            </div>
                                            <br/>
                                            <div style={{textAlign:"center"}}>
                                              Subject /विषय :  सन 2017 - 18 थकबाकी नसल्याचे प्रमाणपत्र मिळणेबाबत.<br/>
                                              Reference / संदर्भ : आपला अर्ज क्रमांक Application No दिनांक {new Date(Receipt[0].Bill[0].billDetails[0].billDate).getDate()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].billDate).getMonth()+"-"+new Date(Receipt[0].Bill[0].billDetails[0].billDate).getFullYear()}


                                            </div>
                                            <br/>
                                            <div style={{textAlign:"left"}}>
                                              महोद्य / महोद्या ,


                                            </div>
                                            <br/>
                                            <div style={{textAlign:"center"}}>
                                              संदर्भिय विषयांन्वये प्रमाणित करण्यात येते की, पाणी क्रमांक Consumer No,
                                              {Receipt[0].Bill[0].payeeName} यांच्या नावे नोंद असून, सन financial year  पर्यंतचा संपुर्ण
                                              पाणी रक्कम भरलेली असून, कोणतीही थकबाकी येणे नाही.


                                            </div>
                                            <br/>
                                            <div style={{textAlign:"right"}}>
                                                                      कर अधिक्षक,<br/>
                                                                   ULB Name


                                            </div>

                                          </td>
                                      </tr>


                                  </tbody>
                              </Table>


                        </CardText>
                      </Card>
                      </Col>

                  </Row>}

              </Grid>





            }
                  <div style={{"textAlign": "center"}}>
                    <br/>
                     <UiButton handler={()=>{generatePdf("Receipt")}} item={{"label": "Download", "uiType":"button", "isDisabled": isFormValid ? false : true}} ui="google"/>
                    </div>

                  </div>);
        default:
          return 'You\'re a long way from home sonny jim!';
      }
    }
    return (
      <div  className="SearchResult">
      {/*<div id="ReceiptDemo">

      </div>*/}
        <div style={{textAlign:"center"}}>
            <h3>No Dues Certificate for {match.params.id=="watercharge"?"Water Charge":"Property Tax"}</h3>
        </div>
        <Stepper activeStep={stepIndex}>
           <Step>
             <StepLabel>Search</StepLabel>
           </Step>
           <Step>
             <StepLabel>Pay</StepLabel>
           </Step>
           <Step>
             <StepLabel>Download</StepLabel>
           </Step>
         </Stepper>
         <div style={contentStyle}>
           {finished ? (
             <p>
               <a
                 href="#"
                 onClick={(event) => {
                   event.preventDefault();
                   this.setState({stepIndex: 0, finished: false});
                 }}
               >
                 Click here
               </a> to reset the example.
             </p>
           ) : (<div>


                {!_.isEmpty(mockData) && moduleName && actionName && getStepContent(stepIndex)}

                </div>
           )}
         </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  metaData:state.framework.metaData,
  mockData: state.framework.mockData,
  moduleName:state.framework.moduleName,
  actionName:state.framework.actionName,
  formData:state.frameworkForm.form,
  fieldErrors: state.frameworkForm.fieldErrors,
  flag: state.report.flag,
  isFormValid: state.frameworkForm.isFormValid
});

const mapDispatchToProps = dispatch => ({
  initForm: (requiredFields) => {
    dispatch({
      type: "SET_REQUIRED_FIELDS",
      requiredFields
    });
  },
  setMetaData: (metaData) => {
    dispatch({type:"SET_META_DATA", metaData})
  },
  setMockData: (mockData) => {
    dispatch({type: "SET_MOCK_DATA", mockData});
  },
  setModuleName: (moduleName) => {
    dispatch({type:"SET_MODULE_NAME", moduleName})
  },
  setActionName: (actionName) => {
    dispatch({type:"SET_ACTION_NAME", actionName})
  },
  handleChange: (e, property, isRequired, pattern, requiredErrMsg, patternErrMsg)=>{
    dispatch({type:"HANDLE_CHANGE_FRAMEWORK", property,value: e.target.value, isRequired, pattern, requiredErrMsg, patternErrMsg});
  },
  setLoadingStatus: (loadingStatus) => {
    dispatch({type: "SET_LOADING_STATUS", loadingStatus});
  },
  toggleSnackbarAndSetText: (snackbarState, toastMsg, isSuccess, isError) => {
    dispatch({type: "TOGGLE_SNACKBAR_AND_SET_TEXT", snackbarState, toastMsg, isSuccess, isError});
  },
  setRoute: (route) => dispatch({type: "SET_ROUTE", route}),
  setFlag: (flag) => {
    dispatch({type:"SET_FLAG", flag})
  },
  setFormData: (data) => {
    dispatch({type: "SET_FORM_DATA", data});
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(NoDues);
