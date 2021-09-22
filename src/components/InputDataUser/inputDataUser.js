import RowBox from '../rowBox';
import Input from '../input';



const InputDataUser = (props) => {
  const {value, option, label, readonly, placeholder, handlerInput, handlerClr} = props;
  
  const onKeyUp = e => {
    if (e.code === 'Escape') {
      handlerClr(option)
    }
  }  
  
  return (
    <RowBox>
      <label className="rowLabel" htmlFor={option}>{label}</label>
      <Input
        id = {option}
        value = {value}
        handlerInput = {(e) => handlerInput(e, option)}
        onKeyUp = {onKeyUp}
        handlerClr = {() => handlerClr(option)}
        readonly = {readonly}
        placeholder = {placeholder}
        arialabel = {label}
      />
    </RowBox>
  )
}

export default InputDataUser;