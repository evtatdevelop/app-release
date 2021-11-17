import { Component } from 'react';
import classes from './roleItem.module.scss';
import Input from '../../input';
import RowBox from '../../rowBox';
import Calendar from '../../calendar/calendar';
import Comments from '../../comments/comments';

export default class RoleItem extends Component {
  
  handlerKeyUp = () => {return}

  render() {
    const {data:{id, group, role, levels }, getGroupList, getRoleList, getLevelValuesList} = this.props;

    return (
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
            value = {group.name}
            onKeyUp = {this.handlerKeyUp}
            placeholder = 'Process group'
            arialabel = 'Process group'
            handlerClick = {() => getGroupList()}
            readonly
          />          
        </RowBox>

        <RowBox name = 'Role' id = {`role${id}`} label = {true} >
          <Input
            id = {`role${id}`}
            value = {role.name}
            onKeyUp = {this.handlerKeyUp}
            placeholder = 'Role'
            arialabel = 'Role'
            handlerClick = {() => getRoleList()}
            readonly
          /> 
        </RowBox>

        <RowBox name = 'Role ID' id = {`roleId${id}`} label = {true} >
          <Input
            id = {`roleId${id}`}
            value = {role.code}
            placeholder = 'Role ID'
            arialabel = 'Role ID'
            readonly
          />          
        </RowBox>

        { renderLevel(levels, id, getLevelValuesList) }

        <RowBox name = 'Validity' id = {`${id}datefrom`} label = {true}>
          <Calendar roleNumber={id} />
        </RowBox>

        <RowBox name = 'Comment' id = {`${id}comment`} label = {true} >
          <Comments roleNumber={id} />
        </RowBox>
      </div>
    )
  }
}

const renderLevel = (levels, roleNumber, getLevelValuesList) => {
  return levels.map(level => {
    // console.log(level.value.join(', '));
    return (
      <RowBox key = {`${roleNumber}${level.id}`} name = {level.name} id = {`${roleNumber}${level.id}`} label = {true} >
        <Input
          id = {`${roleNumber}${level.id}`}
          value = {level.value}
          onKeyUp = {() => {return}}          
          handlerClick = {() => getLevelValuesList(level)}
          placeholder = {level.name}
          arialabel = {level.name}
          readonly
        />          
      </RowBox>
    )
  })  
}