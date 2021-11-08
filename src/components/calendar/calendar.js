import classes from './calendar.module.scss';

const Calendar = props => {
  return( 
    
    <div className={classes.calendar}>
      <p className={classes.date}><label>From:</label><input type="date" name="calendar"/></p>
      <p className={classes.date}><label>To:</label><input type="date" name="calendar"/></p>      
    </div> 
  )
}

export default Calendar;