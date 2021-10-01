import classes from './header.module.scss';

const Header = (props) => {
  const {name} = props;
  return (
    <header className={classes.header}>
      <div className={classes.appHeader}>
        <div className={classes.leftSide}>
          <button className={classes.menu}>&mdash;</button>
          <div className={classes.systemName}>
            <div className={classes.headerTopLine}>
              <h1>Request for access to the corporate system</h1>
              <button className={classes.langs}>Ru</button>
            </div>
            <h3>{name}</h3>
            </div>
        </div>
        
        <p className={classes.ownerName}><span className={classes.userIcon}>&#128100;</span> Tatarenko Evgeniy</p>     
      </div>
    </header>
  )
}

export default Header;