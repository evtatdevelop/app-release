import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './Service';
import { Component } from 'react';

export default class App extends Component {

  state = {
    systemData: {},
    userData: {},
  }

  componentDidMount() {
    this.getSystemData(21);
  }

  getUsersName = (search) => {
    return new Service().getAxiosResource(search);
  }

  getUserData = (id) => {
    new Service().getDataUser(id)
    .then(userData => this.setState({userData}));
  }

  getSystemData = (id) => {
    new Service().getDataSystem(id)
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
          <div style={{display: "flex"}}>
            <label className="rowLabel">Email</label>
            <p>: {data.email}</p>
          </div>  
          <div style={{display: "flex"}}>
            <label className="rowLabel">AD account</label>
            <p>: {data.ad_user}</p>
          </div>  
          <div style={{display: "flex"}}>
            <label className="rowLabel">Company</label>
            <p>: {data.company ? data.company.name: null}</p>
          </div>  
          <div style={{display: "flex"}}>
            <label className="rowLabel">Subdivision</label>
            <p>: {data.branch ? data.branch.name: null}</p>
          </div>  
          <div style={{display: "flex"}}>
            <label className="rowLabel">Department</label>
            <p>: {data.div_name}</p>
          </div>  
          <div style={{display: "flex"}}>
            <label className="rowLabel">Position</label>
            <p>: {data.position_name}</p>
          </div>  
        </div>
      </RowBox>
       : null
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Test page</h1>
        <form className="mainForm">
          <FormSet label="Employee info">         
            <RowBox>
              <label className="rowLabel">Employee name</label>
              <NameSearch 
                handlerNames = {this.getUsersName}
                getUserData = {this.getUserData}
                clearUserData = {this.clearUserData}
              />
            </RowBox>
            {this.showTestData(this.state.userData)}
          </FormSet>

          <FormSet label="System info">
            <RowBox><div>
              {Object.entries(this.state.systemData).map(option => {
                return (
                  <div style={{display: "flex"}}>
                    <label className="rowLabel">{option[0]}</label>
                    <p>: {option[1]}</p>
                  </div>
                )
              })}
            </div></RowBox>
          </FormSet>

        </form>
      </div>
    );
  }
}
