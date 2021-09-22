import React, { Component } from 'react';
import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './services';
import Button from './components/button';
import Message from './components/message/message';
import InputDataUser from './components/InputDataUser';
import userDataInputs from './components/InputDataUser/inputsUserDataList';
export default class App extends Component {

  nameUser = React.createRef();

  state = {
    systemData: {},
    userData: {},
    showMessage: false,
    submitRequest: {},
    email: '',
    ad_user: '',
    company_name: '',
    branch_name: '',
    div_name: '',
    position_name: '',
    location: '',
    phone: '',
    sap_branch_name: '',
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
        company_name: userData.company.name,
        branch_name: userData.branch.name,
        div_name: userData.div_name,
        position_name: userData.position_name,
        location: userData.location,
        phone: userData.phone1,
        sap_branch_name: userData.sap_branch.name,
      })
    });
  }

  getSystemData = (url, path) => {
    new Service().getDataSystem(url, path)
    .then(systemData => this.setState({systemData}));
  }

  onSubmit = (e) => {
    const{systemData, userData, email, ad_user, company_name, branch_name,
       div_name, position_name, location, phone, sap_branch_name} = this.state;
    e.preventDefault();
    const postData = {
      ...systemData,
      ...userData,
      email, ad_user, company_name, branch_name, div_name, position_name, location, phone, sap_branch_name
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
      company_name: '',
      branch_name: '',
      div_name: '',
      position_name: '',
      location: '',
      phone: '',
      sap_branch_name: '',
    });
  }

  handlerInput = (e, prop) => this.setState({[prop]: e.target.value});
  handlerClr = prop => this.setState({[prop]: ''});
 
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
           
            {userDataInputs.map((input, index) => 
              <InputDataUser
                key = {index}
                value = {this.state[input.option]}
                option = {input.option}
                label = {input.label}
                readonly = {input.readonly}
                placeholder = {input.placeholder}
                arialabel = {input.arialabel}
                handlerInput = {this.handlerInput}
                handlerClr = {this.handlerClr}
              />
            )}

          </FormSet>

          <Button label = "Apply" type = "submit"/>

          { showMessage ? <Message data = {submitRequest}/> : null }

        </form>
      </div>
    );
  }

}
