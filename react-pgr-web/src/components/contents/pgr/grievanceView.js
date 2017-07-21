import React, {Component} from 'react';
import {connect} from 'react-redux';
import FileDownload from 'material-ui/svg-icons/action/get-app';
import {Table,TableBody,TableRow,TableRowColumn} from 'material-ui/Table';
import {Grid, Row, Col, DropdownButton} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Api from '../../../api/api';
import {translate, validate_fileupload} from '../../common/common';
import Fields from '../../common/Fields';
import ViewSRN from '../../common/viewSRN';
import EmployeeDocs from '../../common/employeeDocs';
import WorkFlow from '../../common/workflow';
import  '../../../styles/custom.css';
var Rating = require('react-rating');

const styles = {
  headerStyle : {
    fontSize : 19
  },
  addBorderBottom:{
    borderBottom: '1px solid #eee',
    padding: '10px'
  },
  marginStyle:{
    margin: '15px'
  }
};

var currentThis;

class grievanceView extends Component{
  constructor(props){
    super(props);
    this.state={
      open: false,
      isUpdateAllowed : true
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.props.setLoadingStatus('loading');
    this.setState({
      open: false
    });
    //this.loadSRN();
    window.location.reload();
  };

  componentDidMount(){
    currentThis = this;
    this.loadSRN();
  }

  loadSRN = () =>{

    let {initForm, handleChange} = this.props;
    initForm();

    this.props.setLoadingStatus('loading');

    Api.commonApiPost("/pgr/seva/v1/_search",{serviceRequestId:currentThis.props.match.params.srn},{}).then(function(response)
    {

      if(response.serviceRequests.length === 0){
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError('Not a valid SRN.');
        return false;
      }

      currentThis.setState({srn : response.serviceRequests});

      currentThis.state.srn.map((item, index) => {
        for(var k in item){
           if(item[k] instanceof Array){
             item[k].map((attribValues, index) => {
               currentThis.setState({[Object.values(attribValues)[0]] : Object.values(attribValues)[1]});
             })
           }else{
             currentThis.setState({[k] : item[k]});
           }
        }
        if(localStorage.getItem('type') === 'CITIZEN' && (currentThis.state.status === 'COMPLETED' || currentThis.state.status === 'REJECTED')){
          currentThis.props.ADD_MANDATORY('rating');
          if(currentThis.state.rating)
            handleChange(currentThis.state.rating, "rating", true, "");
        }
        // if(currentThis.state.PRIORITY && localStorage.getItem('type') === 'EMPLOYEE'){
        //   handleChange(currentThis.state.PRIORITY, "PRIORITY", true, "");
        // }
        if(currentThis.state.status === 'FORWARDED' && localStorage.getItem('type') === 'EMPLOYEE'){
          currentThis.props.ADD_MANDATORY('designationId');
          currentThis.props.ADD_MANDATORY('positionId');
          handleChange('', "designationId", true, "");
          handleChange('', "positionId", true, "");
        }
        handleChange(currentThis.state.status, "status", false, "");

      });

      Api.commonApiPost('/workflow/history/v1/_search',{workflowId : currentThis.state.stateId}).then(function(response)
      {
        //console.log(JSON.stringify(response));
        currentThis.setState({workflow : response});

        Api.commonApiGet('/filestore/v1/files/tag',{tag : currentThis.state.serviceRequestId}).then(function(response)
        {
          //console.log(JSON.stringify(response));
          currentThis.setState({files : response.files});
          currentThis.SDAPI();
        },function(err) {
          currentThis.props.setLoadingStatus('hide');
          currentThis.handleError(err.message);
        });
      },function(err) {
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError(err.message);
      });

    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  SDAPI = () => {
    Api.commonApiPost("/pgr/servicedefinition/v1/_search",{serviceCode : 'COMPLAINT' }).then(function(response)
    {
      currentThis.setState({SD : response.attributes});
      //ADD MANDATORY & DISPATCH based on SD
      //Required for SD
      if(response.attributes.length > 0 && localStorage.getItem('type') === 'EMPLOYEE'){
        let FormFields = response.attributes.filter(function (el) {
          return (el.code !== 'CHECKLIST' && el.code !== 'DOCUMENTS') ;
        });
        if(FormFields.length > 0){
          //check condition
            FormFields.map((item,index) =>
            {
              if(item.roles.indexOf(localStorage.getItem('type')) > -1 && item.actions.indexOf('UPDATE') > -1){
                if(currentThis.state[item.code])
                  currentThis.props.handleChange(currentThis.state[item.code], item.code, item.required, "");
                if(item.required)
                  currentThis.props.ADD_MANDATORY(item.code);
              }
            });
        }
      }
      currentThis.getDepartmentById();
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  getDepartmentById = () => {
    Api.commonApiPost("/egov-common-masters/departments/_search", {id:this.state.departmentId}).then(function(response)
    {
      currentThis.setState({departmentName : response.Department[0].name});
      currentThis.getReceivingCenter();
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  getReceivingCenter(){
    if(this.state.receivingCenter){
      Api.commonApiPost("/pgr-master/receivingcenter/v1/_search", {id:this.state.receivingCenter}).then(function(response)
      {
        currentThis.setState({receivingCenterName : response.ReceivingCenterType[0].name});
        currentThis.getWardbyId();
      },function(err) {
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError(err.message);
      });
    }else {
      currentThis.getWardbyId();
    }
  }
  getWardbyId(){
    if(this.state.locationId)
      Api.commonApiGet("/egov-location/boundarys", {boundary:this.state.locationId}).then(function(response)
      {
        currentThis.setState({locationName : response.Boundary[0].name});
        currentThis.getLocation();
      },function(err) {
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError(err.message);
      });
    else {
      currentThis.setState({locationName : ""});
      currentThis.getLocation();
    }
  }
  getLocation(){
    if(this.state.childLocationId)
      Api.commonApiGet("/egov-location/boundarys", {boundary:this.state.childLocationId}).then(function(response)
      {
        currentThis.setState({childLocationName : response.Boundary[0].name});
        currentThis.nextStatus();
      },function(err) {
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError(err.message);
      });
    else {
      currentThis.setState({childLocationName : ""});
      currentThis.nextStatus();
    }
  }
  nextStatus = () => {
    if(localStorage.getItem('type')){
      Api.commonApiPost("/workflow/v1/nextstatuses/_search", {currentStatusCode:this.state.status}).then(function(response)
      {
        currentThis.setState({nextStatus : response.statuses});
        currentThis.allServices();
      },function(err) {
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError(err.message);
      });
    }else {
      currentThis.props.setLoadingStatus('hide');
    }
  }
  allServices = () => {
    if(localStorage.getItem('type') === 'EMPLOYEE'){
      Api.commonApiPost("/pgr/services/v1/_search", {type:'ALL'}).then(function(response)
      {
        currentThis.setState({complaintTypes : response.complaintTypes});
        //check update is enabled?
        currentThis.checkUpdateEnabled();
      },function(err) {
        currentThis.props.setLoadingStatus('hide');
        currentThis.handleError(err.message);
      });
    }else{
      currentThis.props.setLoadingStatus('hide');
    }
  }
  checkUpdateEnabled = () => {
    Api.commonApiPost("/pgr/seva/v1/_get",{crn : currentThis.props.match.params.srn}).then(function(response)
    {
      currentThis.setState({isUpdateAllowed : response.isUpdateAllowed});
      currentThis.getWard();
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  getWard = () => {
    Api.commonApiPost("/egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName", {boundaryTypeName:'Ward',hierarchyTypeName:'Administration'}).then(function(response)
    {
      currentThis.setState({ward : response.Boundary});
      currentThis.getLocality();
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  getLocality = () => {
    Api.commonApiPost("/egov-location/boundarys/childLocationsByBoundaryId", {boundaryId:this.state.locationId}).then(function(response)
    {
      currentThis.setState({locality : response.Boundary});
      currentThis.getDepartment();
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  getDepartment = () => {
    Api.commonApiPost("/egov-common-masters/departments/_search").then(function(response)
    {
      currentThis.setState({department : response.Department});
      currentThis.props.setLoadingStatus('hide');
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  search = (e) => {
    e.preventDefault();
    this.props.setLoadingStatus('loading');
    let update = [...currentThis.state.srn];
    let req_obj = {};
    req_obj['serviceRequest'] = update[0];
    //console.log(JSON.stringify(req_obj));

    var dat = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    var date = dat.split("/").join("-");
    req_obj.serviceRequest['updatedDatetime'] = date+' '+time;

    //change status, position, ward, location in attribValues
    for (var i = 0, len = req_obj.serviceRequest.attribValues.length; i < len; i++) {
      if(req_obj.serviceRequest.attribValues[i]['key'] === 'status'){
        req_obj.serviceRequest.attribValues[i]['name'] = currentThis.props.grievanceView.status ? currentThis.props.grievanceView.status : currentThis.state.status;
      }else if(req_obj.serviceRequest.attribValues[i]['key'] === 'positionId'){
          req_obj.serviceRequest.attribValues[i]['name'] = (currentThis.props.grievanceView.positionId) ? currentThis.props.grievanceView.positionId : currentThis.state.positionId ;
      }else if(req_obj.serviceRequest.attribValues[i]['key'] === 'locationId'){
          req_obj.serviceRequest.attribValues[i]['name'] = currentThis.props.grievanceView.locationId ? currentThis.props.grievanceView.locationId : currentThis.state.locationId;
      }
    }

    //change serviceCode in serviceRequests
    req_obj.serviceRequest.serviceCode = currentThis.props.grievanceView.serviceCode ? currentThis.props.grievanceView.serviceCode :  currentThis.state.serviceCode;

    if(currentThis.props.grievanceView['childLocationId'])
      currentThis.chckkey('childLocationId', req_obj);

    if(currentThis.props.grievanceView['approvalComments'])
      currentThis.chckkey('approvalComments', req_obj);

    if(localStorage.getItem('type') === 'EMPLOYEE'){
      if(currentThis.props.grievanceView['PRIORITY'])
        currentThis.chckkey('PRIORITY', req_obj);
      //currentThis.chckkey('priorityColor', req_obj);
    }else if(localStorage.getItem('type') === 'CITIZEN'){
        if(currentThis.props.grievanceView['rating'])
          currentThis.chckkey('rating', req_obj);
    }

    if(currentThis.props.files.length > 0){
      for(let i=0; i<currentThis.props.files.length; i++){
        let formData = new FormData();
        formData.append("tenantId", localStorage.getItem('tenantId'));
        formData.append("module", "PGR");
        formData.append("file", currentThis.props.files[i]);
        Api.commonApiPost("/filestore/v1/files",{},formData).then(function(response)
        {
          var obj = {
            key: 'employeeDocs_'+currentThis.props.files[i]['name'],
            name: response.files[0].fileStoreId
          }
          req_obj.serviceRequest.attribValues.push(obj);
          currentThis.updateSeva(req_obj);
        },function(err) {
          currentThis.props.setLoadingStatus('hide');
          currentThis.handleError(err.message);
        });
      }
    }else{
      currentThis.updateSeva(req_obj);
    }

  }
  chckkey = (key, req_obj) =>{
    //chck approval comments exists in attribvalues
    var result = req_obj.serviceRequest.attribValues.filter(function( obj ) {
      return obj.key === key;
    });

    if(result.length > 0){
      for (var i = 0, len = req_obj.serviceRequest.attribValues.length; i < len; i++) {
        if(req_obj.serviceRequest.attribValues[i]['key'] === key){
            req_obj.serviceRequest.attribValues[i]['name'] = currentThis.props.grievanceView[key];
        }
      }
    }else{
      if(currentThis.props.grievanceView[key]){
        var finobj;
          finobj = {
              key: key,
              name: currentThis.props.grievanceView[key]
          };
        req_obj.serviceRequest.attribValues.push(finobj);
      }
    }
  }
  updateSeva = (req_obj) =>{
    //console.log('Before Submit',JSON.stringify(req_obj));
    Api.commonApiPost("/pgr/seva/v1/_update",{},req_obj).then(function(updateResponse)
    {
      // console.log('After submit',JSON.stringify(updateResponse));
      currentThis.props.setLoadingStatus('hide');
      {currentThis.handleOpen()}
    },function(err) {
      currentThis.props.setLoadingStatus('hide');
      currentThis.handleError(err.message);
    });
  }
  handleUploadValidation = (e, formats) => {
    let validFile = validate_fileupload(e.target.files, formats);
    //console.log('is valid:', validFile);
    if(validFile === true){
      this.props.handleFileEmpty();
      this.props.handleUpload(e);
    }else{
      this.refs.file.value = '';
      this.handleError(validFile);
    }
  }
  handleError = (msg) => {
    let {toggleDailogAndSetText, toggleSnackbarAndSetText}=this.props;
    toggleDailogAndSetText(true, msg);
    //toggleSnackbarAndSetText(true, "Could not able to create complaint. Try again")
  }
  loadServiceDefinition = () => {
    if(this.state.SD !== undefined && localStorage.getItem('type') === 'EMPLOYEE'){
      let FormFields = this.state.SD.filter(function (el) {
        return (el.code !== 'CHECKLIST' && el.code !== 'DOCUMENTS') ;
      });
      if(FormFields.length > 0){
        //check condition
          return FormFields.map((item,index) =>
          {
            if(item.roles.indexOf(localStorage.getItem('type')) > -1 && item.actions.indexOf('UPDATE') > -1){
              return (
                <Fields key={index} obj={item} value={currentThis.props.grievanceView[item.code] ? currentThis.props.grievanceView[item.code] : currentThis.state[item.code]} handler={currentThis.props.handleChange}/>
              );
            }
          });
      }
    }
  }
  render(){
    let
    {
      search,
      getReceivingCenter,
      getLocation,
      loadServiceDefinition,
      handleUploadValidation
       } = this;
    let{
      handleChange,
      handleWard,
      handleLocality,
      handleDesignation,
      handleStatusChange,
      handlePosition,
      grievanceView,
      files,
      fieldErrors,
      isFormValid,
      handleUpload
    } = this.props;
    currentThis = this;
    const actions = [
      <FlatButton
        label={translate('core.lbl.ok')}
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return(
      <div>
      <form autoComplete="off">
        <ViewSRN srn={this.state} />
        <EmployeeDocs srn={this.state.srn}/>
        <WorkFlow workflowdetails={this.state.workflow} />
        { (this.state.isUpdateAllowed && localStorage.getItem('type') === 'EMPLOYEE' && this.state.status !== 'REJECTED' && this.state.status !== 'COMPLETED') ||  (localStorage.getItem('type') === 'CITIZEN' && this.state.status !== 'WITHDRAWN') ?
        <Grid style={{width:'100%'}}>
          <Card style={{margin:'15px 0'}}>
            <CardHeader style={{paddingBottom:0}} title={< div style = {styles.headerStyle} >
             {translate('pgr.lbl.actions')}
            < /div>}/>
            <CardText style={{padding:'8px 16px 0'}}>
              <Row>
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText={translate('pgr.lbl.change.status')+' *'} maxHeight={200} value={grievanceView.status ? grievanceView.status : this.state.status} onChange={(event, key, value) => {
                    handleStatusChange(value, "status", false, "")
                  }}>
                    {this.state.nextStatus !== undefined ?
                    this.state.nextStatus.map((status, index) => (
                        <MenuItem value={status.code} key={index} primaryText={status.name} />
                    )) : ''}
                  </SelectField>
                </Col>
                { localStorage.getItem('type') === 'EMPLOYEE' ?
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText={translate('pgr.lbl.change.grievancetype')+' *'} maxHeight={200} value={grievanceView.serviceCode ? grievanceView.serviceCode : this.state.serviceCode} onChange={(event, key, value) => {
                    handleChange(value, "serviceCode", false, "")}}>
                    {this.state.complaintTypes !== undefined ?
                    this.state.complaintTypes.map((ctype, index) => (
                        <MenuItem value={ctype.serviceCode} key={index} primaryText={ctype.serviceName} />
                    )) : ''}
                  </SelectField>
                </Col> : "" }
                { localStorage.getItem('type') === 'EMPLOYEE' ?
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText="Ward *" maxHeight={200} value={grievanceView.locationId ? grievanceView.locationId : this.state.locationId}  onChange={(event, key, value) => {
                    handleWard(value, "locationId", false, "")}}>
                    {this.state.ward !== undefined ?
                    this.state.ward.map((ward, index) => (
                        <MenuItem value={ward.id} key={index} primaryText={ward.name} />
                    )) : ''}
                  </SelectField>
                </Col>: ""}
                { localStorage.getItem('type') === 'EMPLOYEE' ?
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText={translate('core.lbl.location')+' *'} maxHeight={200} value={grievanceView.childLocationId ? grievanceView.childLocationId : this.state.childLocationId}  onChange={(event, key, value) => {
                    handleLocality(value, "childLocationId", true, "")}}>
                    {this.state.locality !== undefined ?
                    this.state.locality.map((locality, index) => (
                        <MenuItem value={locality.id} key={index} primaryText={locality.name} />
                    )) : ''}
                  </SelectField>
                </Col> : "" }
              </Row>
              { localStorage.getItem('type') === 'EMPLOYEE' && grievanceView.status === 'FORWARDED' ?
              <Row>
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText={translate('pgr.lbl.frwddept')} maxHeight={200} value={grievanceView.departmentId} onChange={(event, key, value) => {
                    handleDesignation(value, "departmentId", false, ""); }
                  }>
                    <MenuItem value={0} primaryText="Select Department" />
                    {this.state.department !== undefined ?
                    this.state.department.map((department, index) => (
                        <MenuItem value={department.id} key={index} primaryText={department.name} />
                    )) : ''}
                  </SelectField>
                </Col>
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText={translate('pgr.lbl.frwddesgn')} maxHeight={200} value={grievanceView.designationId} onChange={(event, key, value) => {
                    handlePosition(grievanceView.departmentId, value, "designationId", true, "") }}>
                    <MenuItem value={0} primaryText="Select Designation" />
                    {this.state.designation !== undefined ?
                    this.state.designation.map((designation, index) => (
                        <MenuItem value={designation.id} key={index} primaryText={designation.name} />
                    )) : ''}
                  </SelectField>
                </Col>
                <Col xs={12} md={3}>
                  <SelectField fullWidth={true} floatingLabelText={translate('pgr.lbl.frwdpos')} maxHeight={200} value={grievanceView.positionId} onChange={(event, key, value) => {
                    handleChange(value, "positionId", true, ""); }}>
                    <MenuItem value={0} primaryText="Select Position" />
                    {this.state.position !== undefined ?
                    this.state.position.map((position, index) => (
                        <MenuItem value={position.assignments[0].position} key={index} primaryText={position.userName} />
                    )) : ''}
                  </SelectField>
                </Col>
              </Row>

              : "" }
              { localStorage.getItem('type') === 'EMPLOYEE' ?
              <Row>
                {loadServiceDefinition()}
              </Row> : ''}
              { localStorage.getItem('type') === 'CITIZEN' && (this.state.status === 'COMPLETED' || currentThis.state.status === 'REJECTED') ?
              <Row>
                <Col xs={12} md={3}>
                  <h4>Feedback</h4>
                  <Rating initialRate={grievanceView.rating} onClick={(rate, event) => { handleChange(rate,"rating", true,"")}}/>
                </Col>
              </Row> : ''}
              <Row>
                <Col xs={12} md={12}>
                  <TextField floatingLabelText={translate('core.lbl.comments')+' *'} fullWidth={true} multiLine={true} rows={2} rowsMax={4} value={grievanceView.approvalComments ? grievanceView.approvalComments : ''} onChange={(event, newValue) => {
                    handleChange(newValue, "approvalComments", true, "") }} errorText={fieldErrors.approvalComments ? fieldErrors.approvalComments : ""}/>
                </Col>
              </Row>
              { localStorage.getItem('type') === 'EMPLOYEE' ?
              <Row>
                <Col xs={12} md={3}>
                  <h4>{translate('core.documents')}</h4>
                </Col>
                <Col xs={12} md={3}>
                  <div className="input-group">
                      <input type="file" className="form-control" ref="file" onChange={(e)=>handleUploadValidation(e, ['doc','docx','xls','xlsx','rtf','pdf','jpeg','jpg','png','txt','zip','dxf'])}/>
                      <span className="input-group-addon" onClick={() => this.refs.file.value = ''}><i className="glyphicon glyphicon-trash specific"></i></span>
                  </div>
                </Col>
              </Row> : ""}
                <Row>
                  <div style={{textAlign: 'center'}}>
                    <RaisedButton style={{margin:'15px 5px'}} onTouchTap={(e) => search(e)} disabled={!isFormValid} label="Submit" backgroundColor={"#5a3e1b"} labelColor={white}/>
                  </div>
                </Row>
            </CardText>
          </Card>
        </Grid>
        : ''
        }
      </form>
      <Dialog
        actions={actions}
        modal={true}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {translate('pgr.msg.success.grievanceupdated')}
      </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //console.log(state.form.form);
  return ({grievanceView: state.form.form, files: state.form.files, fieldErrors: state.form.fieldErrors, isFormValid: state.form.isFormValid});
}

const mapDispatchToProps = dispatch => ({
  initForm: () => {
    dispatch({
      type: "RESET_STATE",
      validationData: {
        required: {
          current: [],
          required: ['approvalComments']
        },
        pattern: {
          current: [],
          required: []
        }
      }
    });
  },
  ADD_MANDATORY : (property) => {
     dispatch({type: "ADD_MANDATORY", property, value: '', isRequired : true, pattern: ''});
  },
  handleChange: (value, property, isRequired, pattern) => {
    dispatch({type: "HANDLE_CHANGE", property, value, isRequired, pattern});
  },
  handleStatusChange: (value, property, isRequired, pattern) => {
    if(value === 'FORWARDED'){
      dispatch({type: "ADD_MANDATORY", property: "designationId", value: '', isRequired : true, pattern: ''});
      dispatch({type: "ADD_MANDATORY", property: "positionId", value: '', isRequired : true, pattern: ''});
      dispatch({type: "HANDLE_CHANGE", property:'departmentId', value:0, isRequired:false, pattern:''});
      dispatch({type: "HANDLE_CHANGE", property:'designationId', value:0, isRequired:true, pattern:''});
      dispatch({type: "HANDLE_CHANGE", property:'positionId', value:0, isRequired:true, pattern:''});
    }else{
      dispatch({type: "REMOVE_MANDATORY", property: "designationId", value: '', isRequired : false, pattern: ''});
      dispatch({type: "REMOVE_MANDATORY", property: "positionId", value: '', isRequired : false, pattern: ''});
      dispatch({type: "HANDLE_CHANGE", property:'departmentId', value:0, isRequired:false, pattern:''});
      dispatch({type: "HANDLE_CHANGE", property:'designationId', value:0, isRequired:false, pattern:''});
      dispatch({type: "HANDLE_CHANGE", property:'positionId', value:0, isRequired:false, pattern:''});
    }
    dispatch({type: "HANDLE_CHANGE", property, value, isRequired, pattern});
  },
  handleWard : (value, property, isRequired, pattern) => {
    Api.commonApiPost("/egov-location/boundarys/childLocationsByBoundaryId",{boundaryId : value}).then(function(response)
    {
      currentThis.setState({locality : response.Boundary});
      currentThis.setState({childLocationId : ''});
      dispatch({type: "ADD_MANDATORY", property: "childLocationId", value: '', isRequired : true, pattern: ''});
      dispatch({type: "HANDLE_CHANGE", property: "childLocationId", value:'', isRequired:true, pattern:''});
      dispatch({type: "HANDLE_CHANGE", property, value, isRequired, pattern});
    },function(err) {
      currentThis.handleError(err.message);
    });
  },
  handleLocality : (value, property, isRequired, pattern) => {
    dispatch({type: "ADD_MANDATORY", property: "childLocationId", value: '', isRequired : true, pattern: ''});
    dispatch({type: "HANDLE_CHANGE", property, value, isRequired, pattern});
  },
  handleDesignation: (value, property, isRequired, pattern) => {
    if(value === 0){
        currentThis.setState({designation : []});
        currentThis.setState({position : []});
        dispatch({type: "REMOVE_MANDATORY", property: "designationId", value: '', isRequired : false, pattern: ''});
        dispatch({type: "REMOVE_MANDATORY", property: "positionId", value: '', isRequired : false, pattern: ''});
        dispatch({type: "HANDLE_CHANGE", property:'departmentId', value: 0, isRequired:false, pattern:''});
        dispatch({type: "HANDLE_CHANGE", property:'designationId', value:'', isRequired:false, pattern:''});
        dispatch({type: "HANDLE_CHANGE", property:'positionId', value: '', isRequired:false, pattern:''});
    }else{
        Api.commonApiPost("/hr-masters/designations/_search").then(function(response)
        {
          currentThis.setState({designation : response.Designation});
          dispatch({type: "ADD_MANDATORY", property: "designationId", value: '', isRequired : true, pattern: ''});
          dispatch({type: "ADD_MANDATORY", property: "positionId", value: '', isRequired : true, pattern: ''});
          dispatch({type: "HANDLE_CHANGE", property:'designationId', value: '', isRequired:true, pattern:''});
          dispatch({type: "HANDLE_CHANGE", property:'positionId', value: '', isRequired:true, pattern:''});
          dispatch({type: "HANDLE_CHANGE", property, value, isRequired, pattern});
        },function(err) {
          currentThis.handleError(err.message);
        });
    }
  },
  handlePosition: (dep, value, property, isRequired, pattern) => {
    if(property === 'designationId' && value === 0)
    {
      dispatch({type: "HANDLE_CHANGE", property:'positionId', value: 0, isRequired, pattern});
    }else{
      let des = value;
      if(dep && des){
        Api.commonApiPost("/hr-employee/employees/_search",{departmentId:dep, designationId: des}).then(function(response)
        {
          currentThis.setState({position : response.Employee});
          dispatch({type: "HANDLE_CHANGE", property, value, isRequired, pattern});
        },function(err) {
          currentThis.handleError(err.message);
        });
      }else {
        currentThis.setState({position : []});
      }
    }
  },
  handleUpload: (e) => {
    dispatch({type: 'FILE_UPLOAD', files: e.target.files[0]})
  },
  handleFileEmpty : () => {
    dispatch({type: 'FILE_EMPTY'});
  },
  toggleDailogAndSetText: (dailogState,msg) => {
    dispatch({type: "TOGGLE_DAILOG_AND_SET_TEXT", dailogState,msg});
  },
  toggleSnackbarAndSetText: (snackbarState, toastMsg) => {
    dispatch({type: "TOGGLE_SNACKBAR_AND_SET_TEXT", snackbarState,toastMsg});
  },
  setLoadingStatus: (loadingStatus) => {
    dispatch({type: "SET_LOADING_STATUS", loadingStatus});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(grievanceView);
