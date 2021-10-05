import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Corpsystems from './components/corpsystems';
import Service from './services';
import Spinner from './components/spinner';

export default class App extends Component {

  service = new Service();
  state = {
    pageName: 'Request for access to the corporate system',
    systemName: "",
    remoteUser: {},
    loading: false,
    error: false,
  }

  componentDidCatch() {
    this.setState({error: true})
  }
  
  componentDidMount() {
    this.getRemoteUser();
  }

  getRemoteUser = () => {
    this.loading();
    this.service.getRemoteUser()
      .then(remoteUser => {
        this.setState({remoteUser});
        this.noLoading();
      })
      .catch(this.onError)
  }
  
  getSystemName = (systemName) => {
    this.setState({systemName})
  }

  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})

  render() {
    const {pageName, systemName, remoteUser, loading} = this.state;

    return (
      <div className="App"> 
        <Header
          pageName = {pageName}
          systemName = {systemName}
          remoteUser = {remoteUser}
        />

        <Corpsystems
          getSystemName = {this.getSystemName}
        />

        {loading ? <Spinner className="spinner"/> : null}

      </div>
    );
  }

}
