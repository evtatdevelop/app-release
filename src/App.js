import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import { MainPage, Corpsystems, Workplace, Resource } from './pages';
import Service from './services';
import Spinner from './components/spinner';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

  service = new Service();
  state = {
    pageName: 'Automated request management system',
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
      <Router>
        <div className="App"> 
          <Header
            pageName = {pageName}
            systemName = {systemName}
            remoteUser = {remoteUser}
          />

          <Route path='/' exact component={MainPage}/>
          <Route path='/workplace' component={Workplace} />
          <Route path='/resource' component={Resource} />
          <Route path='/corpsystems/:system' render = {
            ({match}) => {
              const {system} = match.params;
              return <Corpsystems 
                system={system}
                getSystemName = {this.getSystemName}
              />
            }
          } />
          
          {loading ? <Spinner className="spinner"/> : null}

        </div>        
      </Router>

    );
  }

}
