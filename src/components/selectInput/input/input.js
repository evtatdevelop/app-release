import classes from './input.module.scss';

const Input = (props) => {
  const {value, handlerInput, handlerClr} = props;
  
  return (
    <div className={classes.inputBox}>
      <input 
        className={classes.input} 
        placeholder="Name search"
        onInput={(e) => handlerInput(e)}
        value={value}
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