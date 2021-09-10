import classes from './datalist.module.scss';
import Option from "./option";

const DataList = (props) => {
  const {names, handlerClick} = props;

  return (
    <ul className={classes.datalist}>
      { 
        names.map((item) => 
          <Option 
            key={item.id} 
            {...item}       
            handlerClick = {handlerClick}
          />
        ) 
      }
    </ul>
  )
}

export default DataList;