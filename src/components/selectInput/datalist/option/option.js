import classes from './option.module.scss'

const Option = (props) => {
  const {id, first_name, last_name, email, handlerClick, middle_name} = props;
  return (
    <li
      className={classes.option}
      value={id}
      onClick={() => handlerClick(id)}
    >
      {`${last_name} ${first_name} ${middle_name} (${email})`}
    </li>
  )
}

export default Option;