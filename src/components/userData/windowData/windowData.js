import { Component } from 'react';
import classes from './windowData.module.scss';

class WindowData extends Component {

  componentDidMount(){
    this.nameFocus.focus(); 
  }

 

  renderDivisionsList = (pathArray, depth, handlerClick, handlerKeyUp, set) => {
    return pathArray.map(row => {
      return (
      <li 
        key={row.id}
        tabIndex="0"
        className={classes.option}
        onClick={() => handlerClick(set, row.id)}
        onKeyUp={(e) => handlerKeyUp(e, set, row.id)}
        aria-label={row.name}
      >
        {row.name}
      </li>)
    })
  }


  render() {
    const {set, data, handlerClick, handlerKeyUp} = this.props;
    let lis = null;
    
    if (set === 'idpath') {
      // const pathArray = data.map(row => {return {
      //   name: row.name.split('/').map(item => item.trim()),
      //   id: row.id,
      // }})

      lis = this.renderDivisionsList(data, 1, handlerClick, handlerKeyUp, set);
      
    } else {
      lis = data.map(row => {
        return (
        <li 
          key={row.id}
          tabIndex="0"
          className={classes.option}
          onClick={() => handlerClick(set, row.id)}
          onKeyUp={(e) => handlerKeyUp(e, set, row.id)}
          aria-label={row.name}
        >
          {row.name}
        </li>)
      });      
    }
   
    return (
      <ul
        tabIndex="0"
        ref={(focus) => { this.nameFocus = focus; }}  
        className={classes.widowData}
      >{lis}</ul>
    )
  }
}

export default WindowData;