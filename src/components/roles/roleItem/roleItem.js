import { Component } from 'react';
import classes from './roleItem.module.scss';
import Input from '../../input';
import RowBox from '../../rowBox';

export default class RoleItem extends Component {
  
  onKeyUp = e => {return}

  render() {
    const {data, getGroupList, getRoleList, roleNumber} = this.props;

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

          <RowBox name = 'Process group' id = {`processGroup${data.id}`} label = {true}>
            <Input
              id = {`processGroup${data.id}`}
              value = {data.group.name}
              onKeyUp = {this.onKeyUp}
              placeholder = 'Process group'
              arialabel = 'Process group'
              handlerClick = {() => getGroupList()}
              readonly
            />          
          </RowBox>

          <RowBox name = 'Role' id = {`role${data.id}`} label = {true} >
            <Input
              id = {`role${data.id}`}
              value = {data.role.name}
              onKeyUp = {this.onKeyUp}
              placeholder = 'Role'
              arialabel = 'Role'
              handlerClick = {() => getRoleList()}
              readonly
            /> 
          </RowBox>

          <RowBox name = 'Role ID' id = {`roleId${data.id}`} label = {true} >
            <Input
              id = {`roleId${data.id}`}
              value = {data.role.code}
              placeholder = 'Role ID'
              arialabel = 'Role ID'
              readonly
            />          
          </RowBox>

          { renderLevel(data.levels, roleNumber) }

        </div>     
      </>
    )
  }
}

const renderLevel = (levels, roleNumber) => {
  return levels.map(level => {
    return (
      <RowBox key = {`${roleNumber}${level.id}`} name = {level.name} id = {`${roleNumber}${level.id}`} label = {true} >
        <Input
          id = {`${roleNumber}${level.id}`}
          value = ''
          placeholder = {level.name}
          arialabel = {level.name}
          readonly
        />          
      </RowBox>
    )
  })  
}