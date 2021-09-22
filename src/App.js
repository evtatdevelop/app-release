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

  handlerInput = (e, prop) => this.setState({[prop]: e.target.value});
  handlerClr = prop => this.setState({[prop]: ''});
  onKeyUp = (e, prop) => {
    if (e.code === 'Escape') {
      this.handlerClr(prop)
    }
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
              <label className="rowLabel" htmlFor='email'>Email</label>
              <Input
                id = "email"
                value = {this.state.email}
                handlerInput = {(e) => this.handlerInput(e, 'email')}
                onKeyUp = {(e) => this.onKeyUp(e, 'email')}
                handlerClr ={() => this.handlerClr('email')}
                readonly
                placeholder="E-mail of the employee"
                arialabel="Employee email"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='ad_user'>AD account</label>
              <Input
                id = "ad_user"
                value = {this.state.ad_user}
                handlerInput = {(e) => this.handlerInput(e, 'ad_user')}
                onKeyUp = {(e) => this.onKeyUp(e, 'ad_user')}
                handlerClr ={() => this.handlerClr('ad_user')}
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
                handlerInput = {(e) => this.handlerInput(e, 'company')}
                onKeyUp = {(e) => this.onKeyUp(e, 'company')}
                handlerClr ={() => this.handlerClr('company')}
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
                handlerInput = {(e) => this.handlerInput(e, 'branch')}
                onKeyUp = {(e) => this.onKeyUp(e, 'branch')}
                handlerClr ={() => this.handlerClr('branch')}
                readonly
                placeholder="Division of the company"
                arialabel="Division"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='div_name'>Department</label>
              <Input
                id = "div_name"
                value = {this.state.div_name}
                handlerInput = {(e) => this.handlerInput(e, 'div_name')}
                onKeyUp = {(e) => this.onKeyUp(e, 'div_name')}
                handlerClr ={() => this.handlerClr('div_name')}
                readonly
                placeholder="Department the employee works"
                arialabel="Department"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='position_name'>Position</label>
              <Input
                id = "position_name"
                value = {this.state.position_name}
                handlerInput = {(e) => this.handlerInput(e, 'position_name')}
                onKeyUp = {(e) => this.onKeyUp(e, 'position_name')}
                handlerClr ={() => this.handlerClr('position_name')}
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
                handlerInput = {(e) => this.handlerInput(e, 'location')}
                onKeyUp = {(e) => this.onKeyUp(e, 'location')}
                handlerClr ={() => this.handlerClr('location')}
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
                handlerInput = {(e) => this.handlerInput(e, 'phone')}
                onKeyUp = {(e) => this.onKeyUp(e, 'phone')}
                handlerClr ={() => this.handlerClr('phone')}
                placeholder="Сontact number"
                arialabel="Phone"
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='sap_branch'>SAP branch</label>
              <Input
                id = "sap_branch"
                value = {this.state.sap_branch}
                handlerInput = {(e) => this.handlerInput(e, 'sap_branch')}
                onKeyUp = {(e) => this.onKeyUp(e, 'sap_branch')}
                handlerClr ={() => this.handlerClr('sap_branch')}
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
