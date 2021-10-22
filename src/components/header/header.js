import classes from './header.module.scss';
import {Link} from 'react-router-dom';

const Header = (props) => {
  const {pageName, remoteUser, changeLang, lang} = props;
  const btnLabel = {EN: 'RU', RU: 'EN'}
  
  return (
    <header className={classes.header}>
      <div className={classes.appHeader}>
        <h1><Link to = '/'>{pageName}</Link></h1>
        <button
          className={classes.langs}
          onClick={() => changeLang(remoteUser.id, btnLabel[lang])}
        >{ucFirst(btnLabel[lang])}</button>
      </div>
    </header>
  )
}

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export default Header;