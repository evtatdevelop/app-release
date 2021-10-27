import { Component } from 'react';
import classes from './roleItem.module.scss';
import Input from '../../input';
import RowBox from '../../rowBox';

export default class RoleItem extends Component {
  

  render() {
    const {id} = this.props;

    return (
      <div className={classes.roleItem}>
        <header className={classes.header}>
        <button 
            type="button"
            className={classes.closer}
            onClick={this.props.handlerCloseRole}
          >&times;</button>
          <div className={classes.cover}></div>
        </header>
        <RowBox
          id = {`processGroup${id}`}
          name = 'Process group'
          label = {true}
        >
          <Input
            id = {`processGroup${id}`}
            value = ''
            // onKeyUp = {this.onKeyUp}
            placeholder = 'Process group'
            arialabel = 'Process group'
            // handlerClick = {() => this.getWindowData(asz22_id)}
            readonly
          />          
        </RowBox>

        <RowBox
          id = {`role${id}`}
          name = 'Role'
          label = {true}
        >
          <Input
            id = {`role${id}`}
            value = ''
            // onKeyUp = {this.onKeyUp}
            placeholder = 'Role'
            arialabel = 'Role'
            // handlerClick = {() => this.getWindowData(asz22_id)}
            readonly
          />          
        </RowBox>

        <RowBox
          id = {`roleId${id}`}
          name = 'Role ID'
          label = {true}
        >
          <Input
            id = {`roleId${id}`}
            value = ''
            // onKeyUp = {this.onKeyUp}
            placeholder = 'Role ID'
            arialabel = 'Role ID'
            // handlerClick = {() => this.getWindowData(asz22_id)}
            readonly
          />          
        </RowBox>
      </div>
    )
  }
}