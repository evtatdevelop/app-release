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

export default class Corpsystems extends Component {

  userData = React.createRef();
  service = new Service();
  initialState = {
    remoteUser: {},
    systemData: {},
    postUserData: {},
    loading: false,
    msgTime: 0, msgData: {},
    error: false,
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
            />  
          </FormSet>

          <FormSet label="Supervisor info">            
            <RowBox id = 'bossName' name = 'Supervisor' label = {true}>
              <NameSearch
                id = "bossName"
                getUserData = {() => {return}}
                clear = {() => {return}}
                outClear = {() => {return}}
                placeholder = "Search for supervisor"
                arialabel = "Supervisor name"
              />
            </RowBox>
          </FormSet>
          
          <FormSet label="Additional users">            
            <RowBox id = 'addUsers' name = 'Search user' label = {true}>
              <NameSearch
                id = "addUsers"
                getUserData = {() => {return}}
                clear = {() => {return}}
                outClear = {() => {return}}
                placeholder = "Search for user"
                arialabel = "Search for additional user"
              />
            </RowBox>
          </FormSet>



          <Button label = "Apply" type = "submit"/>
          <Message data = {msgData} time = {msgTime}/>
          {loading ? <Spinner className="spinner"/> : null}
        
        </form>
      </main>
    );
  }

}
