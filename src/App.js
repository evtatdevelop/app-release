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
import Window from './components/window';
import Error from './components/Error';
export default class App extends Component {

  nameUser = React.createRef();

  service = new Service();

  state = {
    systemData: {},
    userData: {},

    loading: false,
    error: false,
    msgTime: 0,
    msgData: {},
    showWindow: false,
   
    email: '',
    ad_user: '',
    company_name: '',
    branch_name: '',
    div_name: '',
    position_name: '',
    location: '',
    phone: '',
    sap_branch_name: '',

    companyList: {},
  }

  clear = () => {
    this.setState({
      userData: {},
      loading: false,

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

  componentDidCatch() {
    console.log('Samething goes wrong!');
    this.setState({error: true})
  }
  

  componentDidMount() {
    this.getSystemData(
      `${window.location.protocol}//${window.location.hostname}/`,
      `${window.location.pathname}`
    );
    this.getCompanies();
  }

  getUserData = (id) => {
    this.loading();
    this.service.getDataUser(id)
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
        this.noLoading();
      })
      .catch(this.onError);
  }

  getSystemData = (url, path) => {
    this.loading();
    this.service.getDataSystem(url, path)
      .then(systemData => {
        this.setState({systemData});
        this.noLoading();
      })
      .catch(this.onError)
  }

  getCompanies = () => {
    this.service.getCompanies()
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

    this.loading();
    this.service.postForm(postData)
      .then(submitRequest => {
        this.showMessage(5000, submitRequest);
        this.clear();
        this.nameUser.current.clearSarch(); 
        this.noLoading();
      })
      .catch(this.onError)
  } 

  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  showMessage = (msgTime, msgData) => this.setState({msgTime, msgData});

  loading = () => {this.setState({loading: true})}
  noLoading = () => {this.setState({loading: false})}

  handlerInput = (e, prop) => this.setState({[prop]: e.target.value});
  handlerClr = prop => this.setState({[prop]: ''});
  handlerClick = (prop) => this.setState({showWindow: true});
  
  handlerCloseWin = () => this.setState({showWindow: false});
 
  render() {
    const {msgTime, msgData, loading, showWindow, error} = this.state;
    
    if (error) return <Error/>;

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

          <Message data = {msgData} time = {msgTime}/>

          {showWindow ? <Window handlerCloseWin={this.handlerCloseWin}/> : null}

          {loading ? <Spinner className="spinner"/> : null}

        </form>
      </div>
    );
  }

}
