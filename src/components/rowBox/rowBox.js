import classes from './rowBox.module.scss';

const RowBox = (props) => {
  return (
    <div className = {classes.rowBox}>
      {props.children}
    </div>
  )
}

export default RowBox;