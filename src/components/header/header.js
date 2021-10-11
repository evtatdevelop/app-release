import classes from './header.module.scss';
import {Link} from 'react-router-dom';

const Header = (props) => {
  const {pageName, systemName, remoteUser, changeLang, lang} = props;
  const btnLabel = {EN: 'RU', RU: 'EN'}
  
  return (
    <header className={classes.header}>
      <div className={classes.appHeader}>
        <div className={classes.leftSide}>
          <button className={classes.menu}>&mdash;</button>
          <div className={classes.systemName}>
            <div className={classes.headerTopLine}>
              <h1><Link to = '/'>{pageName}</Link></h1>
              <button
                className={classes.langs}
                onClick={() => changeLang(remoteUser.id, btnLabel[lang])}
              >{ucFirst(btnLabel[lang])}</button>
            </div>
            <h3>{systemName}</h3>
            </div>
        </div>
        
        <p className={classes.ownerName}><span className={classes.userIcon}>&#128100;</span> {remoteUser.given_name}</p>     
      </div>
    </header>
  )
}

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export default Header;