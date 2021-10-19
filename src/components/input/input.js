import classes from './input.module.scss';

const Input = (props) => {
  const {id, value, handlerInput, handlerClr, onKeyUp, readonly, placeholder, autofocus, arialabel, handlerClick} = props;
  
  return (
    <div className={classes.inputBox}>
      <input
        id = {id}
        className={classes.input} 
        placeholder={placeholder}
        onInput={(e) => handlerInput(e)}
        value={value}
        onKeyUp={e => onKeyUp(e)}
        autoFocus={autofocus}
        aria-label={arialabel}
        readOnly={readonly}
        onClick={handlerClick}
        autoComplete="off"
      />
      {value && !readonly
        ? <button 
            type="button" 
            className={classes.clrButton}
            onClick={handlerClr}
            aria-label={`Clear ${arialabel}`}
          >&times;</button> 
        : null}
    </div>  
  )
}

export default Input;