import { Component } from 'react';
import classes from './roles.module.scss';
import RoleItem from './roleItem';
import RowBox from '../rowBox';
import Service from '../../services';
import Spinner from '../spinner';
import Window from '../window';
import Error from '../Error';

export default class Roles extends Component {

  
  initialState = {
    roleNumber: 1,
    currentItem: null,
    currentField: null,
    roles: [{
      id: 1,
      group: {name: '', id: null},
      role: {name: '', id: null,code: ''},
      levels: [],
    },],
    loading: false, 
    error: false,
    showWindow: false,
    windowData: [],
  }

  state = {...this.initialState}

  service = new Service();

  addRole = () => {
    const roleNumber = this.state.roleNumber + 1;
    const newRole = {id: roleNumber, group: {name: '', id: null}, role: {name: '', id: null, code: ''}, levels: [],};
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
    console.log(sessionKey);    
    this.loading();
    this.service.getGroups(asz00_id, asz01_id, app12_id, app12_id_author, orderType, instanceType)
    .then(windowData => {
      this.setState({
        windowData,
        currentItem: id,
        currentField: 'group'
      })
      this.showWindow();
      this.noLoading();    
    })
    .catch(this.onError)
  }

  getRoleList = (id) => {
    const {sessionKey, orderType, instanceType, asz00_id, asz01_id, app12_id, app12_id_author} = this.props;
    console.log(sessionKey); 
    const asz02_id = this.getAsz02Id(id); 
    this.loading();
    this.service.getRoles(asz00_id, asz01_id, app12_id, app12_id_author, orderType, instanceType, asz02_id)
    .then(windowData => {
      this.setState({
        windowData,
        currentItem: id,
        currentField: 'role'
      })
      this.showWindow();
      this.noLoading();    
    })
    .catch(this.onError)
  }

  getAsz02Id = id => this.state.roles.filter(role => role.id === id )[0]['group']['id'];

  clearItemRole = id => {
    const roles = this.state.roles.map(item => {
      if ( item.id === id ) item['role'] = {name: '', id: null, code: ''}
      return true
    })
    this.setState({roles});
  }

  setRoleGroup = (asz00_id, asz03_id, itemId) => {
    this.loading();
    this.service.getRoleGroup(asz00_id, asz03_id)
    .then(roleGroup => {
      this.state.roles.map(item => {
        if ( item.id === itemId ) item['group'] = {...roleGroup}
        return true
      })
      this.noLoading();
    })
    .catch(this.onError)
  }
 
  getLevels = (asz03_id, itemId) => {
    this.loading();
    this.service.getLevels(asz03_id)
    .then(levels => {
      this.state.roles.map(item => {
        if ( item.id === itemId ) item['levels'] = [...levels]
        return true
      })
      this.noLoading();
    })
    .catch(this.onError)
  }

  handlerWindowClick = (data) => {
    this.hideWindow();
    const {currentItem, currentField} = this.state;
    const roles = [...this.state.roles];
    roles.map(item => {
      if (item.id === currentItem) {
        switch (currentField) {
          case 'group': item.group = {...data}; 
            this.clearItemRole(currentItem);
            break;

          case 'role': item.role = {...data};
            this.setRoleGroup(this.props.asz00_id, data.id, currentItem);
            this.getLevels(data.id, currentItem);
            break;
        
          default: break;
        }
      }
      return true;
    });
    this.setState({roles});
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

  clearRoles = () => {
    this.setState({
      roleNumber: 1,
      currentItem: null,
      currentField: null,
      roles: [{id: 1, group: {name: '', id: null}, role: {name: '', id: null, code: ''}, levels: [],},],
      loading: false,
      error: false,
      showWindow: false,
      windowData: [],
    })
  }

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
          data = {role}
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
                      onClick={() => this.handlerWindowClick(row)}
                      onKeyUp={(e) => this.handlerWidowKeyUp(e, row)}
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