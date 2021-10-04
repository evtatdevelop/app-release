import React, { Component } from 'react';
import './App.css';
import FormSet from './components/formSet';
import Service from './services';
import Button from './components/button';
import Message from './components/message/message';
import Spinner from './components/spinner';
import Error from './components/Error';
import UserData from './components/userData';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import Header from './components/header';

export default class App extends Component {

  userData = React.createRef();
  service = new Service();

  state = {
    remoteUser: {},
    systemData: {},
    postUserData: {},
    loading: false,
    msgTime: 0, msgData: {},
    error: false,
  }

  componentDidCatch() {
    this.setState({error: true})
  }
  
  componentDidMount() {
    this.getSystemData(
      `${window.location.protocol}//${window.location.hostname}/`,
      `${window.location.pathname}`
    );
    this.getRemoteUser();
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

  getRemoteUser = () => {
    this.service.getRemoteUser()
      .then(remoteUser => {
        console.log(remoteUser);
        this.setState({remoteUser})
      })
      .catch(this.onError)
  }

  handlerUserData = (postUserData) => this.setState({postUserData});
  handlerClrUserData = () => this.setState({postUserData: {}});

  onSubmit = (e) => {
    e.preventDefault();
    this.loading();
    this.service.postForm(this.state.postUserData)
      .then(submitRequest => {
        this.showMessage(5000, submitRequest);
        this.clearForm();
      })
      .catch(this.onError)
  } 

  clearForm = () => {
    this.setState({
      loading: false,
      postUserData: {},
    });
    this.userData.current.clearUserData();
  };

  showMessage = (msgTime, msgData) => this.setState({msgTime, msgData});

  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})

  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {systemData:{asz22_full_name}, msgTime, msgData, loading, error, remoteUser} = this.state;
    
    if (error) return <Error/>;

    return (
      <div className="App"> 
        <Header
          name = {asz22_full_name}
          remoteUser = {remoteUser}
        />
        <main className='main'>
          <form className="mainForm" onSubmit={this.onSubmit}>
            <FormSet label="Employee info">            
              <UserData 
                ref = {this.userData}
                handlerUserData = {this.handlerUserData}
                handlerClrUserData = {this.handlerClrUserData}
              />  
            </FormSet>
            <FormSet label="Supervisor info">            
              <RowBox
                id = 'bossName'
                name = 'Supervisor'
                label = {true}
              >
                <NameSearch
                  id = "bossName"
                  // ref = {this.nameBosshRef}
                  getUserData = {() => {return}}
                  clear = {() => {return}}
                  outClear = {() => {return}}
                  placeholder="Search for employee supervisor"
                  arialabel="Supervisor name"
                />
              </RowBox>
            </FormSet>

            <Button label = "Apply" type = "submit"/>
            <Message data = {msgData} time = {msgTime}/>
            {loading ? <Spinner className="spinner"/> : null}
          
          </form>
        </main>
      </div>
    );
  }

}
