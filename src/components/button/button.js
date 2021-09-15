import classes from './button.module.scss';

const Button = (props) => {
  const {label, type} = props;
  return (
    <button type={type} className={classes.button}>{label}</button>
  )
}

export default Button;