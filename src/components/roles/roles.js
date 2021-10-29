import { Component } from 'react';
import classes from './roles.module.scss';
import RoleItem from './roleItem';
import RowBox from '../rowBox';
import Service from '../../services';
import Spinner from '../spinner';
import Window from '../window';
import Error from '../Error';

export default class Roles extends Component {

  state = {
    roleNumber: 1,
    roles: [{id: 1, group: {}, role: {}},],
    loading: false,
    error: false,
    showWindow: false,
    windowData: [],
  }

  service = new Service();

  addRole = () => {
    const roleNumber = this.state.roleNumber + 1;
    const newRole = {id: roleNumber, group: {}, role: {}};
    const roles = [...this.state.roles, newRole];
    this.setState({roleNumber, roles});
  }
  
  handlerCloseRole = id => {
    const currentRoles = [...this.state.roles];
    const roles = currentRoles.filter(role => role.id !== id);
    this.setState({roles});
  }


  getGroupList = (id) => {
    const {sessionKey, orderType, instanceType, asz00_id, asz01_id, app12_id, app12_id_author} = this.props;
    console.log(id, sessionKey, orderType, instanceType, asz00_id, asz01_id, app12_id, app12_id_author);    
    this.loading();
    this.service.getGroups(asz00_id, asz01_id, app12_id, app12_id_author, orderType, instanceType)
    .then(windowData => {
      console.log(windowData);
      this.setState({
        windowData,
      })
      this.showWindow();
      this.noLoading();    
    })
    .catch(this.onError)
  }

  getRoleList = (id) => {
    const {sessionKey, orderType, instanceType, asz00_id, asz01_id, app12_id, app12_id_author} = this.props;
    console.log(id, sessionKey, orderType, instanceType, asz00_id, asz01_id, app12_id, app12_id_author); 
    const asz02_id = null;   
    this.loading();
    this.service.getRoles(asz00_id, asz01_id, app12_id, app12_id_author, orderType, instanceType, asz02_id)
    .then(windowData => {
      console.log(windowData);
      this.setState({
        windowData,
      })
      this.showWindow();
      this.noLoading();    
    })
    .catch(this.onError)
  }

  handlerWindowClick = (data) => {
    this.hideWindow();
    console.log(data);
    // const system = this.getSystemById(data);
    // const {full_name, asz00_id} = system;
    // this.setState({
    //   system,
    //   value: full_name,
    // })
    // this.props.getSapSystem(asz00_id)
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

  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})
  showWindow = () => this.setState({showWindow: true});
  hideWindow = () => this.setState({showWindow: false});
  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {loading, showWindow, error, roles, windowData} = this.state;

    if (error) return <Error/>;

    return (
      <div className={classes.roles}>

        {roles.map(role => <RoleItem
          key = {role.id}
          id = {role.id}
          handlerCloseRole = {() => this.handlerCloseRole(role.id)}
          getGroupList = {() => this.getGroupList(role.id)}
          getRoleList = {() => this.getRoleList(role.id)}
        />)}
        
        <RowBox label = {true} name = ''>
          <button type='button'
            className={classes.addRole}
            onClick={this.addRole}
          >Add role</button>
        </RowBox>

        
        {loading ? <Spinner className="spinner"/> : null}
        
        {showWindow 
          ? <Window handlerCloseWin={this.hideWindow}>
              {<ul className={classes.systemSelection}>
                {windowData.map(row => {
                  return (
                    <li
                      key={row.id}
                      tabIndex="0"
                      className={classes.option}
                      onClick={() => this.handlerWindowClick(row.id)}
                      onKeyUp={(e) => this.handlerWidowKeyUp(e, row.id)}
                      aria-label={row.name}
                    >{row.name}</li>
                  )
                })}
              </ul>}
            </Window>
          : null
        } 

      </div>
    )
  }
} 