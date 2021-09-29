import React, { Component } from 'react';
import NameSearch from '../nameSearch';
import RowBox from '../rowBox';
import Service from '../../services';
import InputDataUser from './InputDataUser';
import userDataInputs from './InputDataUser/inputsUserDataList';
import Spinner from '../spinner';
import Window from '../window';
import Error from '../Error';
import WindowData from './windowData';

export default class UserData extends Component {

  nameSearchRef = React.createRef();
  service = new Service();
 
  stateInit = {
    userData: {},
    postData: {email: '', ad_user: '', company_name: '', branch_name: '', div_name: '',
                position_name: '', location: '', phone: '', sap_branch_name: '',
              },
    windowData: [], setWindow: '', setValueWindow: '',
    hrs01_id: '', 
    hrs05_id: '',
    loading: false,
    error: false,
    showWindow: false,
  }

  state = {...this.stateInit}

  getUserData = (id) => {
    this.loading();
    this.service.getDataUser(id)
      .then(userData => {
        const {email, ad_user, company: {name: company_name},
                branch: {name: branch_name}, div_name, position_name,
                location, phone1: phone, sap_branch: {name: sap_branch_name},
              } = userData;
          
        userData.company_name = userData.company ? userData.company.name : null;
        userData.branch_name = userData.branch ? userData.branch.name : null;

        this.setState({
          userData,
          postData: { email, ad_user, company_name, branch_name, div_name,
                      position_name, location, phone, sap_branch_name,
                    }
        });

        this.upUserData(this.state.postData)
        this.noLoading();
      })
      .catch(this.onError);
  }

  getWindowData = (handler, data, set, option) => {
    if (this.state.userData[option]) return;

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

  handlerInput = (e, prop) => {
    if (this.state.userData[prop]) return;

    console.log(prop);
    const postData = this.state.postData;
    postData[prop] = e.target.value;
    this.setState({postData})
  };

  handlerClr = prop => {
    if (this.state.userData[prop]) return;

    const postData = this.state.postData;
    postData[prop] = '';
    this.setState({postData})
  };


  outClear = () => this.setState({...this.stateInit});;
  clearUserData = () => {
    this.nameSearchRef.current.clearSarch();
    this.outClear();
  };
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
    const value = this.state.windowData.filter(item => item.id === data);
    const postData = this.state.postData;
    postData[this.state.setValueWindow] = value[0].name;
    this.setState({
      [set]: data,
      postData,
    });
  }

  handlerWidowKeyUp = (e, set, id) => {
    switch (e.code) {
      case 'Escape': 
       this.hideWindow();
       break;
     case 'Enter':
       if (e.target.nodeName ==='LI') {
         this.handlerWindowClick(set, id);
       }
       break;  
     default: return;  
   }
  };
  upUserData = (postData) => this.props.handlerUserData(postData);

  render() {
    const {loading, showWindow, error} = this.state;
    
    if (error) return <Error/>;

    return (
      <>     
        <RowBox>
          <label className="rowLabel" htmlFor='userName'>Employee name</label>
          <NameSearch
            id = "userName"
            ref = {this.nameSearchRef}
            getUserData = {this.getUserData}
            clear = {this.clearUserData}
            outClear = {this.outClear}
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
        
      </>
    );
  }




}
