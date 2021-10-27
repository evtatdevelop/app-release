import React, { Component } from 'react';
import RowBox from '../rowBox';
import NameSearch from '../nameSearch';
import classes from './aditionalUser.module.scss';
import Spinner from '../spinner';
import Error from '../Error';
import Service from '../../services';

export default class AdditionalUsers extends Component {
  state = {
    ids: [],
    users: [],
    loading: false,
    error: false,
  }

  nameSearchRef = React.createRef();
  service = new Service();

  addUser = (userData) => {
    const {id, given_name, email} = userData;
    const newUser = {id, given_name, email}
    const users = [...this.state.users, newUser];
    const ids = [...this.state.ids, id]
    this.setState({users, ids});
    this.props.handlerAddUsers(ids.join(','));
  }

  handlersUserChoice = (id) => {
    this.loading();
    this.service.getDataUser(id)
      .then(userData => {        
        this.addUser(userData);       
        this.nameSearchRef.current.clearSarch();
        this.noLoading();
      })
      .catch(this.onError);
  }

  excludeUser = (id) => {
    const users = this.state.users.filter(user => user.id !== id)
    const ids = this.state.ids.filter(currId => currId !== id)
    this.setState({users, ids})
    this.props.handlerAddUsers(ids.join(','));
  }

  clearUserList = () => this.setState({
    ids: [],
    users: [],
    loading: false,
    error: false,
  });

  loading = () => this.setState({loading: true});
  noLoading = () => this.setState({loading: false});
  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {loading, error, ids, users} = this.state;
    
    if (error) return <Error/>;

    const {system, asz01_id} = this.props;
    return (
      <>
        <RowBox id = 'addUsers' name = 'Search user' label = {true}>
          <NameSearch
            id = "addUsers"
            ref = {this.nameSearchRef}
            getUserData = {this.handlersUserChoice}
            clear = {() => {return}}
            outClear = {() => {return}}
            placeholder = "Search for user"
            arialabel = "Search for additional user"
            mode = 'additional'
            system = {system}
            ids = {ids.join(',')}
            asz01_id = {asz01_id}
          />
        </RowBox>

        { users.length > 0 
          ?  <RowBox name = '' label = {true}>
              <ul className={classes.aditionalUser}>
                { users.map(user => {
                  return (
                    <li key = {user.id}>
                      <p>{`${user.given_name} ( ${user.email} )`}</p>
                      <button type = 'button'
                        onClick = {() => this.excludeUser(user.id)}
                        arialabel = {`Exclude ${user.given_name}`}
                      >&times;</button>
                    </li>
                  )
                })}
              </ul>
            </RowBox>
          : null  
        }
        
        


        {loading ? <Spinner className="spinner"/> : null}

      </>  
    )
  }
}