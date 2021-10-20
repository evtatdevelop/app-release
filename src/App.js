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
    lang: 'EN',
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
        this.getLanguage(remoteUser.id);
        this.noLoading();
      })
      .catch(this.onError)
  }
 
  getSystemName = (systemName) => {
    this.setState({systemName})
  }

  changeLang = (app12_id, lang) => {
    // console.log(app12_id, lang);
    this.loading();
    this.service.setLanguage(app12_id, lang)
      .then(lang => {
        this.setState({lang});
        this.getPageName(lang);
        this.noLoading();
      })
      .catch(this.onError)
  }

  getLanguage = (app12_id) => {
    this.loading();
    this.service.getLanguage(app12_id)
      .then(lang => {
        this.setState({lang});
        this.getPageName(lang);
        this.noLoading();
      })
      .catch(this.onError)
  }

  getPageName = (lang) => {
    this.loading();
    this.service.getPhrase(lang, 'mainpage', 'head_systemname')
      .then(pageName => {
        this.setState({pageName});
        this.noLoading();
      })
      .catch(this.onError)
  }

  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})

  render() {
    const {pageName, systemName, remoteUser, loading} = this.state;
    
    // const testPath = '/app-release';
    const testPath = '';

    return (
      <Router>
        <div className="App"> 
          <Header
            pageName = {pageName}
            systemName = {systemName}
            remoteUser = {remoteUser}
            changeLang = {this.changeLang}
            lang = {this.state.lang}
          />

          {/* <Route path={`${testPath}/`} exact component={MainPage}/> */}
          {/* <Route path={`${testPath}/app-release`} exact render = {
            () => <MainPage lang={this.state.lang}/>
          } /> */}
          <Route path={`${testPath}/`} exact render = {
            () => <MainPage lang={this.state.lang}/>
          } />
          <Route path={`${testPath}/workplace`} component={Workplace} />
          <Route path={`${testPath}/resource`} component={Resource} />
          <Route path={`${testPath}/corpsystems/:system`} render = {
            ({match}) => {
              const {system} = match.params;
              return <Corpsystems 
                system={system}
                getSystemName = {this.getSystemName}
                lang = {this.state.lang}
              />
            }
          } />
          
          {loading ? <Spinner className="spinner"/> : null}

        </div>        
      </Router>

    );
  }

}
