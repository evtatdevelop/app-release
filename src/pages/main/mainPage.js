import classes from './main.module.scss'
import {Link} from 'react-router-dom';


const MainPage = props => {
  return (
    <main className={classes.main}>
      
      <div className={classes.groupBox}>
        <input type="radio" id="workplace" name="groupSystems" value="workplace" className={classes.visuallyHidden}/>
        <label htmlFor="workplace">Workplace organization and network resources</label>
        <ul className={classes.systemList}>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/resource' className={classes.link}>Requesting file and server resources</Link>
              <div className={classes.visualLink}></div>
            </div>

          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/workplace' className={classes.link}>Workplace organization request</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>
        </ul>        
      </div>


      <div className={classes.groupBox}>
        <input type="radio" id="corpsystems" name="groupSystems" value="corpsystems" className={classes.visuallyHidden}/>
        <label htmlFor="corpsystems">Corporate information systems</label>
        <ul className={classes.systemList}>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/sap' className={classes.link}>Sap</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/iais' className={classes.link}>iais</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/teplosbyt' className={classes.link}>teplosbyt</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/astep' className={classes.link}>astep</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/citrix' className={classes.link}>citrix</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/sed' className={classes.link}>sed</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/seddeputy' className={classes.link}>seddeputy</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/saperion' className={classes.link}>saperion</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/diadocmail' className={classes.link}>diadocmail</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/cert_ep' className={classes.link}>cert_ep</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/sozvezdie' className={classes.link}>sozvezdie</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
        </ul>         
      </div>



      <div className={classes.groupBox}>
        <input type="radio" id="applications" name="groupSystems" value="applications" className={classes.visuallyHidden}/>
        <label htmlFor="applications">Applied and information systems</label>
        <ul className={classes.systemList}>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/seddeputy' className={classes.link}>seddeputy</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/saperion' className={classes.link}>saperion</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/diadocmail' className={classes.link}>diadocmail</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/cert_ep' className={classes.link}>cert_ep</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linlBox}>
              <Link to = '/corpsystems/sozvezdie' className={classes.link}>sozvezdie</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
        </ul>      
      </div>
         

     
    </main>

  )
}

export default MainPage;