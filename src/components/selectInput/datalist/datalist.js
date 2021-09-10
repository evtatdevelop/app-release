import classes from './datalist.module.scss';
import Option from "./option";

const DataList = (props) => {
  const {names, handlerClick} = props;

  const list = 
    <ul className={classes.datalist}>
      { 
        names.map((item) => <Option 
        key={item.id} 
        {...item}       
        handlerClick = {handlerClick}
        /> ) 
      }
    </ul>;

  return (
    list
  )
}

export default DataList;