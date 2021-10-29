import { Component } from 'react';
import classes from './roleItem.module.scss';
import Input from '../../input';
import RowBox from '../../rowBox';

export default class RoleItem extends Component {

  render() {
    const {id, getGroupList, getRoleList} = this.props;

    return (
      <>
        <div className={classes.roleItem}>
          
          <header className={classes.header}>
            <button type="button"
              className={classes.closer}
              onClick={this.props.handlerCloseRole}
            >&times;</button>
            <div className={classes.cover}></div>
          </header>

          <RowBox name = 'Process group' id = {`processGroup${id}`} label = {true}>
            <Input
              id = {`processGroup${id}`}
              value = ''
              // onKeyUp = {this.onKeyUp}
              placeholder = 'Process group'
              arialabel = 'Process group'
              handlerClick = {() => getGroupList()}
              readonly
            />          
          </RowBox>

          <RowBox name = 'Role' id = {`role${id}`} label = {true} >
            <Input
              id = {`role${id}`}
              value = ''
              // onKeyUp = {this.onKeyUp}
              placeholder = 'Role'
              arialabel = 'Role'
              handlerClick = {() => getRoleList()}
              readonly
            /> 
          </RowBox>

          <RowBox name = 'Role ID' id = {`roleId${id}`} label = {true} >
            <Input
              id = {`roleId${id}`}
              value = ''
              placeholder = 'Role ID'
              arialabel = 'Role ID'
              readonly
            />          
          </RowBox>
        </div>     
      </>
    )
  }
}