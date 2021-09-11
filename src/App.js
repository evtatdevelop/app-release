import './App.css';
import SelectInput from './components/selectInput';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './Service';
import { Component } from 'react';

class App extends Component {

  state = {
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

  render() {

    return (
      <div className="App">
        <h1>Test page</h1>
        <form className="mainForm">
          <FormSet label="Employee info">
            
            <RowBox>
              <label>Employee name</label>
              <SelectInput 
                handlerNames = {this.getUsersName}
                getUserData = {this.getUserData}
                clearUserData = {this.clearUserData}
              />
            </RowBox>

  
          </FormSet>
        </form>
      </div>
    );
  
  }
}

export default App;
