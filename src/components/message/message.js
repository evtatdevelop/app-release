import classes from './message.module.scss';

const Message = (props) => {
  return (
    <section className={classes.message}>
      {props.children}
    </section>
  )
}

export default Message;