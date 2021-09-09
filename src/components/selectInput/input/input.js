import classes from './input.module.scss';

const Input = (props) => {
  const {value, handlerInput} = props;
  // console.log(value);
  
  return <input 
    className={classes.input} 
    placeholder="Search"
    onInput={(e) => handlerInput(e)}
    value={value}
  />
}

export default Input;