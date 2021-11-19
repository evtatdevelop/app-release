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
    currentLevel: null,
    levelValue: [],
    asz06idList: [],
    asz06idPreviousList: [],
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
    showWindowLevel: false,
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
      levels.map(level => {level.value = []; level.asz06idList = []; return true;});
      this.state.roles.map(item => {
        if ( item.id === itemId ) item['levels'] = [...levels]
        return true
      })
      this.noLoading();
    })
    .catch(this.onError)
  }

  getLevelValuesList = (role, level) => {
    const {sessionKey, asz00_id, app12_id, orderType, asz22_id} = this.props;
    this.loading();
    this.service.getLevelValues(level.id, sessionKey, role.id, asz00_id, role.role.id, app12_id, orderType, asz22_id, role.group.name)
    .then(windowData => {
      this.setState({
        windowData,
        currentItem: role.id,
        currentLevel: level.id,
        levelValue: level.value,
        asz06idList: level.asz06idList,
        asz06idPreviousList: level.asz06idList,
      })
      this.showWindowLevel();
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

  handlerWindowClickLevel = (data) => {
    let levelValue = [];
    let asz06idList = [];
    if (data.multiple_select === "MULTIPLE_VALUES") {
      levelValue = [...this.state.levelValue];
      const itemKey = levelValue.indexOf(data.code);
      if ( itemKey === - 1 ) levelValue.push(data.code);
      else levelValue.splice(itemKey, 1);

      asz06idList = [...this.state.asz06idList];
      const itemKeyId = asz06idList.indexOf(data.id);
      if ( itemKeyId === - 1 ) asz06idList.push(data.id);
      else asz06idList.splice(itemKeyId, 1);

    } else {
      levelValue = [data.code];
      asz06idList = [data.id];
    }
    this.setState({levelValue, asz06idList});
    return true;
  }

  handlerWidowKeyUpLevel = (e, set, id) => {
    switch (e.code) {
      case 'Escape': 
       this.hideWindow();
       break;
    //  case 'Enter':
    //    if (e.target.nodeName ==='LI') {
    //      this.handlerWindowClickLevel(set, id);
    //    }
    //    break;  
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

  windowAcceptClick = () => {
    this.hideWindow();
    const {currentItem, currentLevel, levelValue, asz06idList, asz06idPreviousList} = this.state;
    const roles = [...this.state.roles];
    let asz03_id = null;
    roles.map(role => {
      if ( role.id === currentItem ) {
        role.levels.map(level => {
          if ( level.id === currentLevel ) {
            level.value = [...levelValue];
            level.asz06idList = [...asz06idList];
          };
          return true;
        });

        asz03_id = role.role.id;

        let clean = false;
        role.levels.forEach(level => {
          if (clean) {
            level.value = [];
            level.asz06idList = [];
          }
          if ( level.id === currentLevel ) clean = true;
        })
      }
      return true;
    });

    if ( asz06idList.length > 0 ) this.runLevelValues('add', 
      asz06idPreviousList.join(','), 
      asz06idList.join(','), 
      asz03_id
    );
    else this.runLevelValues('del', 
      asz06idPreviousList.join(',')
    );

    this.setState({levelValue: [], asz06idList: []})
  }

  runLevelValues = (mode_asz06_id_list, asz06_id_previous_list, asz06_id_list='', asz03_id='') => {
    this.loading();
    this.service.runLevelValues(
      this.props.sessionKey, 
      this.state.currentItem,
      mode_asz06_id_list,
      asz06_id_previous_list,
      asz06_id_list, 
      asz03_id
    )
    .then(result => {
      console.log(result);
      this.noLoading();
    })
    .catch(this.onError)
  }

  // clearCildLevels() {
  //   const {currentItem, currentLevel} = this.state;
  //   const roles = [...this.state.roles];
  //   roles.map(role => {
  //     if ( role.id === currentItem ) {
  //       let clean = false;
  //       role.levels.forEach(level => {
  //         if (clean) {
  //           level.value = [];
  //           level.asz06idList = [];
  //         }
  //         if ( level.id === currentLevel ) clean = true;
  //       })
  //     }
  //     return true;
  //   });
  // }

  // clearLevelValues(asz06idList) {
  //   const {currentItem, currentLevel} = this.state;
  //   const roles = [...this.state.roles];
  //   roles.map(role => {
  //     if (role.id === currentItem) {
  //       role.levels.map(level => {
  //         if (level.id === currentLevel) {
  //           level.value = [];
  //           level.asz06idList = [];
  //         };
  //         return true;
  //       })
  //     }
  //     return true;
  //   });
  //   this.runLevelValues('del', asz06idList.join(', ')); 
  // }





  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})
  showWindow = () => this.setState({showWindow: true});
  showWindowLevel = () => this.setState({showWindowLevel: true});
  hideWindow = () => this.setState({showWindow: false, showWindowLevel: false});
  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {loading, showWindow, error, roles, windowData, showWindowLevel, currentLevel, asz06idList} = this.state;

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
          getLevelValuesList = {(level) => this.getLevelValuesList(role, level)}
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
              {<ul className={classes.roleSelection}>
                {windowData.map(row => {
                  return (
                    <li
                      key={row.id}
                      tabIndex="0"
                      className={classes.option}
                      onClick={() => this.handlerWindowClick(row)}
                      onKeyUp={(e) => this.handlerWidowKeyUp(e, row)}
                      aria-label={row.name}
                    >                    
                      {row.name}
                    </li>
                  )
                })}
              </ul>}
            </Window>
          : null
        }
        
        {showWindowLevel 
          ? <Window handlerCloseWin={this.hideWindow}>
              {
                <div className={classes.windowWrapper}>
                  <ul className={classes.levelValueSelection}>
                    {windowData.map(row => {
                      const checked = asz06idList.includes(row.id);
                      return (
                        <li
                          key={row.id}
                          // tabIndex="0"
                          className={classes.option}
                          // onClick={() => this.handlerWindowClickLevel(row)}
                          // onKeyUp={(e) => this.handlerWidowKeyUpLevel(e, row)}
                          aria-label={row.value}
                        >
                          {row.multiple_select === "MULTIPLE_VALUES"
                          ? <input 
                            type='checkbox' 
                            id={row.id} 
                            name={currentLevel}
                            onClick={() => this.handlerWindowClickLevel(row)}
                            
                            defaultChecked = {checked}
                          />
                          : <input 
                            type='radio' 
                            id={row.id} 
                            name={currentLevel}
                            onClick={() => this.handlerWindowClickLevel(row)}
                          />}
                          
                          <label htmlFor={row.id} className={classes.tick}></label>
                          <label htmlFor={row.id} className={classes.levelValueCode}>( {row.code} )</label>
                          <label htmlFor={row.id} className={classes.levelValueName}>{row.value}</label>
                        </li>
                      )
                    })}
                  </ul>
              
                  <button 
                    type='button' 
                    className={classes.windowAccept}
                    onClick={this.windowAcceptClick}
                  >Accept</button>
                </div>
              }
            </Window>
          : null
        }

      </div>
    )
  }
} 