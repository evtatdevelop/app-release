import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import { MainPage, Corpsystems, Workplace, Resource, PersonalArea } from './pages';
import Service from './services';
import Spinner from './components/spinner';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from './components/sideBar/sideBar';
export default class App extends Component {

  service = new Service();
  state = {
    pageName: '',
    systemName: "",
    remoteUser: {},
    lang: '',
    loading: false,
    error: false,
    instanceType: 'PROD',
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
    const {pageName, remoteUser, loading} = this.state;

    return (
      <Router>
        <div className="App"> 
          
          <SideBar             
            remoteUser = {remoteUser}              
            lang = {this.state.lang}
            changeLang = {this.changeLang}
          />

          <div className='main'>
            <Header
              pageName = {pageName}
              // systemName = {systemName}
              remoteUser = {remoteUser}
              changeLang = {this.changeLang}
              lang = {this.state.lang}
            />


            {/* <Route path={`/app-release`} exact render = { () => <MainPage lang={this.state.lang}/>} /> */}
            <Route path={`/`} exact render = {() => <MainPage lang={this.state.lang}/>} />
            <Route path={`/workplace`} component={Workplace} />
            <Route path={`/resource`} component={Resource} />
            <Route path={`/corpsystems/:system`} render = {
              ({match}) => {
                return <Corpsystems 
                  system={match.params.system}
                  // getSystemName = {this.getSystemName}
                  lang = {this.state.lang}
                  instanceType = {this.state.instanceType}
                />
              }
            } />
            <Route path={`/lk/myorders`} component={PersonalArea} />
            <Route path={`/lk/myagree`} component={PersonalArea} />
            <Route path={`/lk/myagree_settings`} component={PersonalArea} />
            <Route path={`/lk/myagree_arch`} component={PersonalArea} />

            {loading ? <Spinner className="spinner"/> : null}
            
          </div>

        </div>        
      </Router>

    );
  }

}
