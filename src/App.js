import React, { Component } from 'react';
import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './Service';
import Button from './components/button';
import Message from './components/message/message';

export default class App extends Component {

  nameUser = React.createRef();

  state = {
    systemData: {},
    userData: {},
    showMessage: false,
    dataMessage: {},
  }

  componentDidMount() {
    this.getSystemData(`${window.location.protocol}//${window.location.hostname}/`, `${window.location.pathname}`);
  }

  getUserData = (id) => {
    new Service().getDataUser(id)
    .then(userData => this.setState({userData}));
  }

  getSystemData = (url, path) => {
    new Service().getDataSystem(url, path)
    .then(systemData => this.setState({systemData}));
  }

  clearUserData  = () => {
    this.setState({userData: {}})
  }

  showTestData = data => {
    return (
      Object.keys(data).length !== 0
      ? <RowBox>
        <div>
          <div className="testData"><label className="rowLabel">Email: </label><p>{data.email}</p></div>  
          <div className="testData"><label className="rowLabel">AD account: </label><p>{data.ad_user}</p></div>  
          <div className="testData"><label className="rowLabel">Company: </label><p>{data.company ? data.company.name: null}</p></div>  
          <div className="testData"><label className="rowLabel">Subdivision: </label><p>{data.branch ? data.branch.name: null}</p></div>  
          <div className="testData"><label className="rowLabel">Department: </label><p>{data.div_name}</p></div>  
          <div className="testData"><label className="rowLabel">Position: </label><p>{data.position_name}</p></div>  
          <div className="testData"><label className="rowLabel">Location: </label><p>{data.location}</p></div>  
          <div className="testData"><label className="rowLabel">Phone number: </label><p>{data.phone1}</p></div>  
        </div>
      </RowBox>
       : null
    )
  }

  onShowMessage() {
    this.setState({
      showMessage: true,
    });
    setTimeout(() => {
      this.setState({showMessage: false});
    }, 5000);
  }

  onSubmit = (e) => {
    e.preventDefault();
    new Service().postForm(this.state.userData)
      .then(dataMessage => {
        this.setState({dataMessage})
        this.onShowMessage();
      })
    
    this.clearUserData();
    this.nameUser.current.clearSarch(); 
  } 

  
  render() {
    const {systemData, userData, showMessage, dataMessage} = this.state;

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

          <FormSet label="System info">
            <RowBox><div>
              {Object.entries(systemData).map((option, index) => {
                return (
                  <div key={index} className="testData">
                    <label className="rowLabel">{`${option[0]}: `}</label>
                    <p>{option[1]}</p>
                  </div>
                )
              })}
            </div></RowBox>
          </FormSet>

          <Button
            label = "Apply"
            type = "submit"
          />

          { showMessage 
            ? <Message>
              {dataMessage
                ? Object.entries(dataMessage).map((row, index) => {
                  return <p key={index} >{row[0]}: {row[1]}</p>
                })
                : null} 
            </Message>
            : null }

        </form>
      </div>
    );
  }
}
