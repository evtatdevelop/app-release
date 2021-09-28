import { Component } from 'react';
import classes from './windowData.module.scss';

class WindowData extends Component {

  componentDidMount(){
    this.nameFocus.focus(); 
 }

  render() {
    // console.log(this.props);

    const {set, data, handlerClick, handlerKeyUp} = this.props;
    let lis = null;

    if (set === 'idpath') {
      lis = data.map(row => {

        return (<li key={row.id} >{row.name} </li>)
      });      
    
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