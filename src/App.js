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

  getUsersName = (search) => {
    return new Service().getAxiosResource(search);
  }

  getUserData = (id) => {
    new Service().getDataUser(id)
    .then(userData => this.setState({userData}));
  }

  clearUserData  = () => {
    this.setState({userData: {}})
  }

  showTestData = data => {

    return (
      data
      ? <div>
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

            <RowBox>
              {this.showTestData(this.state.userData)}
            </RowBox>
            
  
          </FormSet>
        </form>
      </div>
    );
  
  }
}
