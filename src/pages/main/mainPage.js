import classes from './main.module.scss'
import {Link} from 'react-router-dom';

const MainPage = props => {
  return (
    <main className={classes.main}>
      <ul>
        <li><Link to = '/resource' className={classes.link}>Requesting file and server resources</Link></li>
        <li><Link to = '/workplace' className={classes.link}>Workplace organization request</Link></li>
        <li><Link to = '/corpsystems/sap' className={classes.link}>Sap</Link></li>
        <li><Link to = '/corpsystems/iais' className={classes.link}>iais</Link></li>
        <li><Link to = '/corpsystems/teplosbyt' className={classes.link}>teplosbyt</Link></li>
        <li><Link to = '/corpsystems/astep' className={classes.link}>astep</Link></li>
        <li><Link to = '/corpsystems/citrix' className={classes.link}>citrix</Link></li>
        <li><Link to = '/corpsystems/sed' className={classes.link}>sed</Link></li>
        <li><Link to = '/corpsystems/seddeputy' className={classes.link}>seddeputy</Link></li>
        <li><Link to = '/corpsystems/saperion' className={classes.link}>saperion</Link></li>
        <li><Link to = '/corpsystems/diadocmail' className={classes.link}>diadocmail</Link></li>
        <li><Link to = '/corpsystems/cert_ep' className={classes.link}>cert_ep</Link></li>
        <li><Link to = '/corpsystems/sozvezdie' className={classes.link}>sozvezdie</Link></li>
      </ul>      
    </main>

  )
}

export default MainPage;