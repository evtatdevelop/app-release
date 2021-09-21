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
    company: '',
    branch: '',
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
        company: userData.company.name,
        branch: userData.branch.name,
      })
    });
  }

  getSystemData = (url, path) => {
    new Service().getDataSystem(url, path)
    .then(systemData => this.setState({systemData}));
  }

  // clearUserData  = () => this.setState({userData: {}});

  onSubmit = (e) => {
    e.preventDefault();
    const postData = {...this.state.systemData, ...this.state.userData};
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

  clear() {
    this.setState({
      userData: {},
      email: '',
      company: '',
      branch: '',
    });
  }

  handlerEmail = e => {
    const {value} = e.target;
    this.setState({
        email: value,
    })
  }

  handlerCompany = e => {
    const {value} = e.target;
    this.setState({
        company: value,
    })
  }

  handlerBranch = e => {
    const {value} = e.target;
    this.setState({
        branch: value,
    })
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
                placeholder=""
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
                placeholder=""
              />
            </RowBox>

            <RowBox>
              <label className="rowLabel" htmlFor='branch'>Branch</label>
              <Input
                id = "branch"
                value = {this.state.branch}
                handlerInput = {this.handlerBranch}
                onKeyUp = {this.onKeyUp}
                readonly
                placeholder=""
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
