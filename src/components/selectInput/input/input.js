import classes from './input.module.scss';

const Input = (props) => {
  const {value} = props;
  console.log(value);
  
  return <input 
    className={classes.input} 
    placeholder="Search"
    // value={value}
  />
}

export default Input;