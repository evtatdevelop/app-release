import { Component } from 'react';
import classes from './roles.module.scss';
import RoleItem from './roleItem';
import RowBox from '../rowBox';

export default class Roles extends Component {
  state = {
    roleNumber: 1,
    roles: [
      {id: 1, group: {}, role: {}},
    ]
  }

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

  render() {
    const {roles} = this.state;

    return (
      <div className={classes.roles}>

        {roles.map(role => <RoleItem
          key = {role.id}
          id = {role.id}
          handlerCloseRole = {() => this.handlerCloseRole(role.id)}
        />)}
        <RowBox 
          label = {true}
          name = ''
        >
          <button 
            type='button'
            className={classes.addRole}
            onClick={this.addRole}
          >Add role</button>
        </RowBox>
      </div>
    )
  }
} 