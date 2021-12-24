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



  renderRoleAgree = roleAgreements => {
    console.log(roleAgreements);
    return(
      <div className={classes.oneRoleAgree}>
        {roleAgreements.map((agree, index) => {
          const agreePersonDefault = agree.person[0]['name'];
          return(
            <div key={index} className={classes.rowTable}>
              {/* {`${agree.asz10_order_seq} | ${agree.asz10_name} | ${agree.asz06_code_value} | ${agree.asz10_name} | `} */}
              <p>{agree.asz10_order_seq}</p>
              <p>{agree.asz10_name}</p>
              <p>{agree.asz06_code_value}</p>
              <p>{agreePersonDefault}</p>
            </div>
          )
        })}
      </div>
    )
  }


  render() {
    const {system} = this.props;
    return(    
      <div className={classes.agreements}>
        <h2>{system.full_name}</h2>
        <ul>
          {
            this.state.roles.map(role => {
              if (!role.role.id) return null;
              return(
                <li key={role.id}>
                  <h3>{`${role.group.name} / ${role.role.name}`}</h3>
                  {console.log(role.agreements.length)}
                  {this.renderRoleAgree(role.agreements)}
                </li>
              )
            })
          }       
        </ul>

      </div> 
    )    
  }

}


