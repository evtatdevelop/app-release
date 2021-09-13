import classes from './option.module.scss'

const Option = (props) => {
  const {id, first_name, last_name, email, handlerClick, middle_name, handlerKeyUp} = props;
  return (
    <li
      tabIndex="0"
      className={classes.option}
      value={id}
      onClick={() => handlerClick(id)}
      onKeyUp={(e) => handlerKeyUp(e, id)}
      aria-label={`${last_name} ${first_name} ${middle_name} (${email})`}
    >
      {`${last_name} ${first_name} ${middle_name} (${email})`}
    </li>
  )
}

export default Option;