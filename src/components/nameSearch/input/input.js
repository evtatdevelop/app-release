import classes from './input.module.scss';

const Input = (props) => {
  const {value, handlerInput, handlerClr, onKeyUp} = props;
  
  return (
    <div className={classes.inputBox}>
      <input 
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
          >&times;</button> 
        : null}
    </div>  
  )
}

export default Input;