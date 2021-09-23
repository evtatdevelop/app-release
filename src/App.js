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
import Spinner from './components/spinner';
export default class App extends Component {

  nameUser = React.createRef();

  state = {
    systemData: {},
    userData: {},

    showSpiner: false,
    error: false,
    msgShow: false,
    msgData: {},
    
    companyList: {},
    
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

  clear = () => {
    this.setState({
      userData: {},
      showSpiner: false,

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

  componentDidMount() {
    this.getSystemData(
      `${window.location.protocol}//${window.location.hostname}/`,
      `${window.location.pathname}`
    );
    this.getCompanies();
  }

  getUserData = (id) => {
    this.showSpiner();
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
        });
        this.hideSpiner();
      })
      .catch(this.onError);
  }

  getSystemData = (url, path) => {
    this.showSpiner();
    new Service().getDataSystem(url, path)
      .then(systemData => {
        this.setState({systemData});
        this.hideSpiner();
      })
      .catch(this.onError)
  }

  getCompanies = () => {
    new Service().getCompanies()
    .then(companyList => this.setState({companyList}))
    .catch(this.onError)
  }

  onSubmit = (e) => {
    e.preventDefault();
    const{systemData, userData, email, ad_user, company_name, branch_name,
       div_name, position_name, location, phone, sap_branch_name} = this.state;
    const postData = {
      ...systemData, ...userData, email, ad_user, company_name, branch_name, div_name, 
      position_name, location, phone, sap_branch_name
    };

    this.showSpiner();
    new Service().postForm(postData)
      .then(submitRequest => {
        this.showMessage(5000, submitRequest);
        this.clear();
        this.nameUser.current.clearSarch(); 
        this.hideSpiner();
      })
      .catch(this.onError)
  } 

  onError = (error) => {
    this.setState({error: true});
    this.hideSpiner();
    this.showMessage(5000, {Error: 'Something goes wrong!'})
  }

  showMessage(time, msgData) {
    this.setState({
      msgData,
      msgShow: true,
    });
    setTimeout(() => this.setState({
      msgShow: false,
      msgData: {},
    }), time);
  }

  showSpiner = () => {this.setState({showSpiner: true})}
  hideSpiner = () => {this.setState({showSpiner: false})}

  handlerInput = (e, prop) => this.setState({[prop]: e.target.value});
  handlerClr = prop => this.setState({[prop]: ''});
  handlerClick = (prop) => this.showMessage(5000, {select: prop});
 
  render() {
    const {msgShow, msgData, showSpiner} = this.state;
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
                handlerClick = {input.handlerClick ? this.handlerClick : ()=>{return}}
              />
            )}

          </FormSet>

          <Button label = "Apply" type = "submit"/>

          { msgShow ? <Message data = {msgData}/> : null }
          {showSpiner ? <Spinner className="spinner"/> : null}

        </form>
      </div>
    );
  }

}
