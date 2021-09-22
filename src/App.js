import React, { Component } from 'react';
import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './services';
import Button from './components/button';
import Message from './components/message/message';
import Input from './components/input';

export default class App extends Component {

  nameUser = React.createRef();

  state = {
    systemData: {},
    userData: {},
    showMessage: false,
    submitRequest: {},
    email: '',
    ad_user: '',
    company: '',
    branch: '',
    div_name: '',
    position_name: '',
    location: '',
    phone: '',
    sap_branch: '',
  }

  componentDidMount() {
    this.getSystemData(
      `${window.location.protocol}//${window.location.hostname}/`,
      `${window.location.pathname}`
    );
  }

  getUserData = (id) => {
    new Service().getDataUser(id)
    .then(userData => {
      this.setState({
        userData,
        email: userData.email,
        ad_user: userData.ad_user,
        company: userData.company.name,
        branch: userData.branch.name,
        div_name: userData.div_name,
        position_name: userData.position_name,
        location: userData.location,
        phone: userData.phone1,
        sap_branch: userData.sap_branch.name,
      })
    });
  }

  getSystemData = (url, path) => {
    new Service().getDataSystem(url, path)
    .then(systemData => this.setState({systemData}));
  }

  onSubmit = (e) => {
    const{systemData, userData, email, ad_user, company, branch, div_name, position_name, location, phone, sap_branch} = this.state;
    e.preventDefault();
    const postData = {
      ...systemData,
      ...userData,
      email,
      ad_user,
      company,
      branch,
      div_name,
      position_name,
      location,
      phone,
      sap_branch,
    };
    new Service().postForm(postData)
      .then(submitRequest => {
        this.setState({submitRequest})
        this.showMessage(5000);
      })  
    // this.clearUserData();
    this.clear();
    this.nameUser.current.clearSarch(); 
  } 

  showMessage(time) {
    this.setState({showMessage: true});
    setTimeout(() => this.setState({
      showMessage: false,
      submitRequest: {},
    }), time);
  }

  clear = () => {
    this.setState({
      userData: {},
      email: '',
      ad_user: '',
      company: '',
      branch: '',
      div_name: '',
      position_name: '',
      location: '',
      phone: '',
      sap_branch: '',
    });
  }

  handlerEmail = e => {
    const {value} = e.target;
    this.setState({email: value})
  }
  handlerAd = e => {
    const {value} = e.target;
    this.setState({ad_user: value})
  }
  handlerCompany = e => {
    const {value} = e.target;
    this.setState({company: value})
  }
  handlerBranch = e => {
    const {value} = e.target;
    this.setState({branch: value})
  }
  handlerDivision = e => {
    const {value} = e.target;
    this.setState({div_name: value})
  }
  handlerPosition = e => {
    const {value} = e.target;
    this.setState({position_name: value})
  }
  handlerLocation = e => {
    const {value} = e.target;
    this.setState({location: value})
  }
  handlerPhone = e => {
    const {value} = e.target;
    this.setState({phone: value})
  }
  handlerClr = () => {
    this.setState({phone: ''})
  }
  handlerSapBranch = e => {
    const {value} = e.target;
    this.setState({sap_branch: value})
  }

  onKeyUp = e => {
    // console.log(e.code);
    return
  }

  render() {
    const {showMessage, submitRequest} = this.state;
    return (
      <div className="App">
        <h1>Test page</h1>
        <form 
          className="mainForm"
          onSubmit={this.onSubmit}
        >
          <FormSet label="Employee info">         
            <RowBox>
              <label className="rowLabel" htmlFor='userName'>Employee name</label>
              <NameSearch
                ref = {this.nameUser}
                id = "userName"
                getUserData = {this.getUserData}
                clear = {this.clear}
                placeholder="Search for employee name"
                arialabel="Employee name"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='userEmail'>Employee email</label>
              <Input
                id = "userEmail"
                value = {this.state.email}
                handlerInput = {this.handlerEmail}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="E-mail of the employee"
                arialabel="Employee email"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='adAccount'>AD account</label>
              <Input
                id = "adAccount"
                value = {this.state.ad_user}
                handlerInput = {this.handlerAd}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Active Directory account"
                arialabel="AD account"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='company'>Company</label>
              <Input
                id = "company"
                value = {this.state.company}
                handlerInput = {this.handlerCompany}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Сompany the employee works"
                arialabel="Company"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='branch'>Division</label>
              <Input
                id = "branch"
                value = {this.state.branch}
                handlerInput = {this.handlerBranch}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Division of the company"
                arialabel="Division"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='division'>Department</label>
              <Input
                id = "division"
                value = {this.state.div_name}
                handlerInput = {this.handlerDivision}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Department the employee works"
                arialabel="Department"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='position'>Position</label>
              <Input
                id = "position"
                value = {this.state.position_name}
                handlerInput = {this.handlerPosition}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Employee's position"
                arialabel="Position"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='location'>Location</label>
              <Input
                id = "location"
                value = {this.state.location}
                handlerInput = {this.handlerLocation}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Office adress"
                arialabel="Location"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='phone'>Phone</label>
              <Input
                id = "phone"
                value = {this.state.phone}
                handlerInput = {this.handlerPhone}
                onKeyUp = {this.onKeyUp}
                handlerClr ={this.handlerClr}
                placeholder="Сontact number"
                arialabel="Phone"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='sapBranch'>SAP branch</label>
              <Input
                id = "sapBranch"
                value = {this.state.sap_branch}
                handlerInput = {this.handlerSapBranch}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder="Account in SAP system"
                arialabel="SAP branch"
              />
            </RowBox>

          </FormSet>

          <Button label = "Apply" type = "submit"/>

          { showMessage ? <Message data = {submitRequest}/> : null }

        </form>
      </div>
    );
  }

}
