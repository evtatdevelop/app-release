import classes from './formSet.module.scss';

const FormSet = (props) => {
  return (
    <fieldset className = {classes.formSet}>
      <legend>{props.label}</legend>
      {props.children}
    </fieldset>
  )
}

export default FormSet;