import React, { Component } from 'react';
import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './services';
import Button from './components/button';
import Message from './components/message/message';

export default class App extends Component {

  nameUser = React.createRef();

  state = {
    systemData: {},
    userData: {},
    showMessage: false,
    submitRequest: {},
  }

  componentDidMount() {
    this.getSystemData(
      `${window.location.protocol}//${window.location.hostname}/`,
      `${window.location.pathname}`
    );
  }

  getUserData = (id) => {
    new Service().getDataUser(id)
    .then(userData => this.setState({userData}));
  }

  getSystemData = (url, path) => {
    new Service().getDataSystem(url, path)
    .then(systemData => this.setState({systemData}));
  }

  clearUserData  = () => this.setState({userData: {}})

  onSubmit = (e) => {
    e.preventDefault();
    const postData = {...this.state.systemData, ...this.state.userData};
    new Service().postForm(postData)
      .then(submitRequest => {
        this.setState({submitRequest})
        this.showMessage(5000);
      })  
    this.clearUserData();
    this.nameUser.current.clearSarch(); 
  } 

  showMessage(time) {
    this.setState({showMessage: true});
    setTimeout(() => this.setState({
        showMessage: false,
        dataSubmit: {}
    }), time);
  }



  showTestData = data => {
    const component = Object.entries(data).map((row, index) => {
      if (typeof row[1] !== 'object') return (
          <div key={index} className="testData">
            <label className="rowLabel">{row[0]}: </label><p>{row[1]}</p>
          </div>
      ); else return null;   
    })
    return (Object.keys(data).length !== 0 ? <RowBox><div>{component}</div></RowBox> : null)
  }

  render() {
    const {userData, showMessage, submitRequest} = this.state;
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
            {this.showTestData(userData)}
          </FormSet>

          <Button label = "Apply" type = "submit"/>

          { showMessage ? <Message data = {submitRequest}/> : null }

        </form>
      </div>
    );
  }

}
