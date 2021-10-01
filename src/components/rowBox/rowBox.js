import classes from './rowBox.module.scss';

const RowBox = (props) => {
  const {label, children, id, name} = props;
  return (
    <div className = {classes.rowBox}>
      {label ? <label className = {classes.rowLabel} htmlFor={id}>{name}</label> : null}
      {children}
    </div>
  )
}

export default RowBox;