import classes from './option.module.scss'



const Option = (props) => {
  const {id, first_name, last_name, email, handlerClick} = props;
  return (
    <li
      className={classes.option}
      value={id}
      onClick={() => handlerClick(id)}
    >
      {`${first_name} ${last_name} (${email})`}
    </li>
  )
}

export default Option;