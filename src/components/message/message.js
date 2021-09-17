import classes from './message.module.scss';

const Message = (props) => {
  const {data} = props;
  return (
    <section className={classes.message}>
      {data
        ? Object.entries(data).map((row, index) => {
          return <p key={index} >{row[0]}: {row[1]}</p>
        })
        : null} 
    </section>
  )
}

export default Message;