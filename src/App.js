import { Component } from 'react';
import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './Service';
import Button from './components/button';

export default class App extends Component {

  state = {
    systemData: {},
    userData: {},
  }

  componentDidMount() {
    this.getSystemData(`${window.location.protocol}//${window.location.hostname}/`, `${window.location.pathname}`);
  }

  // getUsersName = (search) => {
  //   return new Service().getAxiosResource(search);
  // }

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

  render() {
    const {systemData, userData} = this.state;

    return (
      <div className="App">
        <h1>Test page</h1>
        <form className="mainForm">
          <FormSet label="Employee info">         
            <RowBox>
              <label className="rowLabel" htmlFor='userName'>Employee name</label>
              <NameSearch
                id = "userName"
                // handlerNames = {this.getUsersName}
                getUserData = {this.getUserData}
                clearUserData = {this.clearUserData}
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
            label = "Applay"
            type = "submit"
          />

        </form>
      </div>
    );
  }
}
