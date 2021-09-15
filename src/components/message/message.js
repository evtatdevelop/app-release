import classes from './message.module.scss';

const Message = (props) => {
  return (
    <section className={classes.message}>
      {props.message}
    </section>
  )
}

export default Message;