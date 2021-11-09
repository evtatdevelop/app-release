import classes from './calendar.module.scss';

const Calendar = props => {
  const {roleNumber} = props;
  
  return(    
    <div className={classes.calendar}>
      <p className={classes.date}>
        <label htmlFor={`${roleNumber}datefrom`}>From:</label>
        <input id={`${roleNumber}datefrom`} type="date" name="calendar"/>
      </p>
      <p className={classes.date}>
        <label htmlFor={`${roleNumber}dateto`}>To:</label>
        <input id={`${roleNumber}dateto`} type="date" name="calendar"/>
      </p>      
    </div> 
  )
}

export default Calendar;