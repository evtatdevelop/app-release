import React, { Component } from 'react';
import classes from './agreements.module.scss';

export default class Agreements extends Component {

  state = {
    roles: this.props.roles
  }

  componentDidUpdate(prevProps) {
    if (this.props.roles !== prevProps.roles) {
      this.setState({roles: this.props.roles})
    }
  }



  renderRoleAgree = (roleAgreements, roleId) => {
    console.log(roleAgreements);
    return(
      <div className={classes.oneRoleAgree}>
        {roleAgreements.map((agree, index) => {
          return(
            <div key={index} className={classes.rowTable}>
              <div>{agree.asz10_order_seq}</div>
              <div>{agree.asz10_name}</div>
              <div>{agree.asz06_code_value}</div>
              <div>{this.renderPersonList(agree.person, agree.asz10_order_seq)}</div>
            </div>
          )
        })}
      </div>
    )
  }

  renderPersonList = (personList, rowName) => {
    return ( 
      <ul>
        {personList.map( item => {
          return (
          <li key = {item.id}>
            {/* {item.name} */}
            <input 
              type='radio' 
              id={item.id} 
              name={rowName}
              // onClick={() => this.handlerWindowClickLevel(row)}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {system} = this.props;
    return(    
      <div className={classes.agreements}>
        <h2 className={classes.systemFullName}>{system.full_name}</h2>
        <ul>
          {
            this.state.roles.map(role => {
              if (!role.role.id) return null;
              return(
                <li key={role.id}>
                  <h3 className={classes.roleFullName}>{`${role.group.name} / ${role.role.name}`}</h3>
                  {console.log(role.agreements.length)}
                  {this.renderRoleAgree(role.agreements, role.id)}
                </li>
              )
            })
          }       
        </ul>

      </div> 
    )    
  }

}


