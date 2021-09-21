import classes from './input.module.scss';

const Input = (props) => {
  const {id, value, handlerInput, handlerClr, onKeyUp} = props;
  
  return (
    <div className={classes.inputBox}>
      <input
        id = {id}
        className={classes.input} 
        placeholder="Search"
        onInput={(e) => handlerInput(e)}
        value={value}
        onKeyUp={e => onKeyUp(e)}
        autoFocus
        aria-label="Search"
      />
      {value 
        ? <button 
            type="button" 
            className={classes.clrButton}
            onClick={handlerClr}
            aria-label="Clear search"
          >&times;</button> 
        : null}
    </div>  
  )
}

export default Input;