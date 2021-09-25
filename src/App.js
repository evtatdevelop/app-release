import React, { Component } from 'react';
import './App.css';
import NameSearch from './components/nameSearch';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './services';
import Button from './components/button';
import Message from './components/message/message';
import InputDataUser from './components/InputDataUser';
import userDataInputs from './components/InputDataUser/inputsUserDataList';
import Spinner from './components/spinner';
import Window from './components/window';
import Error from './components/Error';
import WindowData from './components/windowData';

export default class App extends Component {

  nameUser = React.createRef();
  service = new Service();
  postDataInit = {   
    email: '', ad_user: '', company_name: '', branch_name: '', div_name: '',
    position_name: '', location: '', phone: '', sap_branch_name: '',
  }
  stateInit = {
    userData: {},
    postData: this.postDataInit,
    windowData: [], setWindow: '', setValueWindow: '',
    hrs01_id: '', 
    hrs05_id: '',
    loading: false,
    error: false,
    showWindow: false,
  }

  state = {
    systemData: {},
    msgTime: 0, msgData: {},
    ...this.stateInit,
  }

  componentDidCatch() {
    this.setState({error: true})
  }
  
  componentDidMount() {
    this.getSystemData(
      `${window.location.protocol}//${window.location.hostname}/`,
      `${window.location.pathname}`
    );
    // this.getCompanies();
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

  getUserData = (id) => {
    this.loading();
    this.service.getDataUser(id)
      .then(userData => {
        const {email, ad_user, company: {name: company_name},
                branch: {name: branch_name}, div_name, position_name,
                location, phone1: phone, sap_branch: {name: sap_branch_name},
              } = userData;

        this.setState({
          userData,
          postData: { email, ad_user, company_name, branch_name, div_name,
                      position_name, location, phone, sap_branch_name,
                    }
        });

        this.noLoading();
      })
      .catch(this.onError);
  }

  getWindowData = (handler, data, set, option) => {
    this.loading();
    this.service[handler](this.state[data])
    .then(windowData => {
      this.setState({
        windowData,
        setWindow: set,
        setValueWindow: option,
      })
      this.showWindow();
      this.noLoading();    
    })
    .catch(this.onError)
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.loading();
    this.service.postForm(this.state.postData)
      .then(submitRequest => {
        this.showMessage(5000, submitRequest);
        this.clear();
        this.nameUser.current.clearSarch(); 
        this.noLoading();
      })
      .catch(this.onError)
  } 

  handlerInput = (e, prop) => {
    const postData = this.state.postData;
    postData[prop] = e.target.value;
    this.setState({postData})
  };

  handlerClr = prop => {
    const postData = this.state.postData;
    postData[prop] = '';
    this.setState({postData})
  };

  clear = () => this.setState(
    {...this.state, ...this.stateInit}
  );
  showMessage = (msgTime, msgData) => this.setState({msgTime, msgData});
  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})
  showWindow = () => this.setState({showWindow: true});
  hideWindow = () => this.setState({showWindow: false});
  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  handlerWindowClick = (set, data) => {
    this.setState({[set]: data});
    this.hideWindow();

    // TODO
    let id = 'id';
    let name = 'name';
    if (set === 'idpath') {
      id = 'idpath';
      name = 'division_path'
    }

    const value = this.state.windowData.filter(item => item[id] === data);
    const postData = this.state.postData;
    postData[this.state.setValueWindow] = value[0][name];
    this.setState({
      [set]: data,
      postData,
    });
    // console.log(value);
  }

  handlerWidowKeyUp = (e, id) => console.log(e, id);

  render() {
    const {systemData:{asz22_full_name}, msgTime, msgData, loading, showWindow, error} = this.state;
    
    if (error) return <Error/>;

    return (
      <div className="App">
        <h1>{asz22_full_name}</h1>
        <form className="mainForm" onSubmit={this.onSubmit}>

          <FormSet label="Employee info">            
            <RowBox>
              <label className="rowLabel" htmlFor='userName'>Employee name</label>
              <NameSearch
                ref = {this.nameUser}
                id = "userName"
                getUserData = {this.getUserData}
                clear = {this.clear}
                placeholder="Search for employee name"
                arialabel="Employee name"
              />
            </RowBox>
           
            {userDataInputs.map((input, index) => 
              <InputDataUser
                key = {index}
                value = {this.state.postData[input.option]}
                option = {input.option}
                label = {input.label}
                readonly = {input.readonly}
                placeholder = {input.placeholder}
                handlerInput = {this.handlerInput}
                handlerClr = {this.handlerClr}
                handlerClick = {input.handlerClick 
                  ? () => this.getWindowData(input.handlerClick, input.prop, input.set, input.option)
                  : ()=>{return}
                }
              />
            )}

          </FormSet>

          <Button label = "Apply" type = "submit"/>
          <Message data = {msgData} time = {msgTime}/>
          {loading ? <Spinner className="spinner"/> : null}
          {showWindow 
            ? <Window handlerCloseWin={this.hideWindow}>
                <WindowData
                  data = {this.state.windowData}
                  set = {this.state.setWindow}
                  handlerClick = {this.handlerWindowClick}
                  handlerKeyUp = {this.handlerWidowKeyUp}
                />
              </Window>
            : null
          }
        
        </form>
      </div>
    );
  }




}
