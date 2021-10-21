import React, { Component } from 'react';
import classes from './corpsystems.module.scss';
import FormSet from '../../components/formSet';
import Service from '../../services';
import Button from '../../components/button';
import Message from '../../components/message';
import Spinner from '../../components/spinner';
import Error from '../../components/Error';
import UserData from '../../components/userData';
import NameSearch from '../../components/nameSearch';
import RowBox from '../../components/rowBox';
import AdditionalUsers from '../../components/additionalUsers';

export default class Corpsystems extends Component {

  userData = React.createRef();
  supervisorData = React.createRef();
  addUsersData = React.createRef();
  service = new Service();

  initialState = {
    remoteUser: {},
    systemData: {},
    postUserData: {},
    loading: false,
    msgTime: 0, msgData: {},
    error: false,
    asz01_id: null,
  }

  state = {...this.initialState}

  componentDidCatch() {
    this.setState({error: true})
  }
  
  componentDidMount() {
    this.getSystemData('', this.props.system, this.props.lang);
    this.getRemoteUser();
  }

  componentWillUnmount() {
    this.setState(this.initialState) 
    this.props.getSystemName('');
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.getSystemData('', this.props.system, this.props.lang);
    }
  }

  getAsz01Id = asz01_id => {
    this.setState({asz01_id})
  }

  getSystemData = (url, path, lang) => {
    this.loading();
    this.service.getDataSystem(url, path, lang)
      .then(systemData => {
        this.setState({systemData});
        this.props.getSystemName(systemData.system_name);
        this.noLoading();
      })
      .catch(this.onError)
  }

  getRemoteUser = () => {
    this.service.getRemoteUser()
      .then(remoteUser => {
        // console.log(remoteUser);
        this.setState({remoteUser})
      })
      .catch(this.onError)
  }

  handlerUserData = (postUserData) => this.setState({postUserData});
  handlerClrUserData = () => {
    this.setState({postUserData: {}});
    this.supervisorData.current.clearSarch();
    this.addUsersData.current.clearUserList();
  }

  addSupervisor = (id) => {
    console.log(id);
    const postUserData = {
      ...this.state.postUserData,
      bossId: id,
    }
    this.setState({postUserData})
  }

  addUsers = (ids) => {
    console.log(ids);
    const postUserData = {
      ...this.state.postUserData,
      additionalUsers: ids,
    }
    this.setState({postUserData})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.loading();
    this.service.postForm(this.state.postUserData)
      .then(submitRequest => {
        this.showMessage(15000, submitRequest);
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
    this.supervisorData.current.clearSarch();
    this.addUsersData.current.clearUserList();
  };

  showMessage = (msgTime, msgData) => this.setState({msgTime, msgData});

  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})

  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {msgTime, msgData, loading, error} = this.state;
    
    if (error) return <Error/>;

    return (
      <main className={classes.main}>
        <form className={classes.mainForm} onSubmit={this.onSubmit}>
          
          <FormSet label="Employee info">            
            <UserData 
              ref = {this.userData}
              handlerUserData = {this.handlerUserData}
              handlerClrUserData = {this.handlerClrUserData}
              handelergetAsz01Id = {this.getAsz01Id}
            />  
          </FormSet>

          <FormSet label="Supervisor info">            
            <RowBox id = 'bossName' name = 'Supervisor' label = {true}>
              <NameSearch
                id = "bossName"
                ref = {this.supervisorData}
                getUserData = {this.addSupervisor}
                // clear = {() => {return}}
                // outClear = {() => {return}}
                placeholder = "Search for supervisor"
                arialabel = "Supervisor name"
                mode = 'supavisor'
              />
            </RowBox>
          </FormSet>
          
          <FormSet label="Additional users (optionally)">
             <AdditionalUsers
              ref = {this.addUsersData}
              system = {this.state.systemData.asz22_system_prefix}
              asz01_id = {this.state.asz01_id}
              handlerAddUsers = {this.addUsers}
            />
          </FormSet>

          <Button label = "Apply" type = "submit"/>
          <Message data = {msgData} time = {msgTime}/>
          {loading ? <Spinner className="spinner"/> : null}
        
        </form>
      </main>
    );
  }

}
