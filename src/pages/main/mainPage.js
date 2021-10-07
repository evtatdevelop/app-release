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
            <div className={classes.linkBox}>
              <Link to = '/workplace' className={classes.link}>Workplace organization request</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/fileresource' className={classes.link}>Access to file resources</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/seuabd' className={classes.link}>Access to &laquo;СЭУ АБД&raquo; resources</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/ctcomm' className={classes.link}>Access to Internet resources and &laquo;КСПД&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/ptd_mobile' className={classes.link}>Access to the &laquo;ЭЛН&raquo; portal</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/itactive' className={classes.link}>IT asset application</Link>
              <div className={classes.visualLink}></div>
            </div>  
          </li>     
          <li>
            <div className={classes.linkBox}>
              <Link to = '/resource' className={classes.link}>Requesting file and server resources</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/servresource' className={classes.link}>Deleting a server resource</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/serviceacc' className={classes.link}>Creating a service account</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/vm' className={classes.link}>Access to virtual machines</Link>
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
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/sap' className={classes.link}>Access to SAP</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/iais' className={classes.link}>Access and Authorization in &laquo;ИАИС СГК&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>

          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/onec' className={classes.link}>Access and Authorization in &laquo;1С ЗУП СГК&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/onecother' className={classes.link}>Access and Authorization in &laquo;corporate systems based on 1C platform&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>

          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/teplosbyt' className={classes.link}>Access and Authorization in Heat billing systems</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/astep' className={classes.link}>Access and Authorization in 	&laquo;АСТЭП&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/citrix' className={classes.link}>Access to applications launched via Citrix</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/sed' className={classes.link}>Access and Authorization in EDMS SGC</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/seddeputy' className={classes.link}>Employees substitution in EDMS SGC</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/saperion' className={classes.link}>Access and Authorization in &laquo;Саперион&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/diadocmail' className={classes.link}>Access to the &laquo;ЭДО&raquo; operator interface</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/cert_ep' className={classes.link}>Issuing a certificate electronic signature</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/sozvezdie' className={classes.link}>Access and Authorization in &laquo;Созвездие&raquo;</Link>
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
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/appl_zulu' className={classes.link}>Access to GIS &laquo;ZULU&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/glkraskom' className={classes.link}>Access to the Glonass (&laquo;КрасКом&raquo;) system</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/appl_apab' className={classes.link}>Access to &laquo;АРМ АПАБ&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/appl' className={classes.link}>Access to &laquo;СИБЭКО&raquo; application systems</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/appl_eip' className={classes.link}>Access to information systems &laquo;Подключение&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/appl_ti' className={classes.link}>Access to the &laquo;Тепловой инспектор&raquo; workstation</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/gis_jkh' className={classes.link}>Access to the &laquo;ЛК РСО ГИС ЖКХ и ПО Стек-интеграция&raquo;</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
          <li>
            <div className={classes.linkBox}>
              <Link to = '/corpsystems/gis_jkh' className={classes.link}>Access to the information technology systems</Link>
              <div className={classes.visualLink}></div>
            </div>
          </li>
        </ul>      
      </div>
         

     
    </main>

  )
}

export default MainPage;