import React, { Component } from 'react';
import classes from './sideBar.module.scss';
import {Link} from 'react-router-dom';
import Service from '../../services';
import Spinner from '../../components/spinner';
import Error from '../../components/Error';

export default class SideBar extends Component {

  service = new Service();
  state = {
    dataPage: [],
    loading: false,
    error: false,
  } 

  componentDidCatch() {
    this.setState({error: true})
  }
  
  componentDidMount() {
    this.getMainPage(this.props.lang);
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.getMainPage(this.props.lang);
    }
  }

  getMainPage = lang => {
    this.loading();
    this.service.getMainPage(lang)
      .then(dataPage => {
        this.setState({dataPage});
        this.noLoading();
      })
      .catch(this.onError)
  }

  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})
  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {loading, error} = this.state;
    
    if (error) return <Error/>;
    
    const {remoteUser} = this.props;
    // const {remoteUser, changeLang, lang} = this.props;
    // const btnLabel = {EN: 'RU', RU: 'EN'}
    
    return (
      
      <aside className = {classes.sideBar}>
        <button type='button' className={classes.menu}>&mdash;</button> 

        <p className={classes.ownerName}>{remoteUser.given_name}</p>
        
        {/* <button
          className={classes.langs}
          onClick={() => changeLang(remoteUser.id, btnLabel[lang])}
        >{this.ucFirst(btnLabel[lang])}</button> */}

        {this.state.dataPage.map(section => this.renderSection(section))}

        {loading ? <Spinner className="spinner"/> : null}
      </aside>
    )
  }

  renderLi(system) {
    const path = system.request_url.slice(0);
    return(
      <li key={path}>
        <div className={classes.linkBox}>
          <Link to = {path} className={classes.link}>
            <div className={classes.visualLink}></div>
            <div className={classes.labelLink}>{this.goodLabel[system.request_name]}</div>
          </Link>
          
        </div>  
      </li>
    )
  }

  renderSection(section) {
    if (section.id !== '1') return null
    // console.log(section.systems)
    return(
      <div key={section.id} className={classes.groupBox}>
        <ul className={classes.systemList}>
          <li key='allsystems'>
            <div className={classes.linkBox}>
              <Link to = '/' className={classes.link}>
                <div className={classes.visualLink}></div>
                <div className={classes.labelLink}>{this.goodLabel['All applications'][this.props.lang]}</div>
              </Link>
            </div>  
          </li>
          {section.systems.map((system, index) => this.renderLi(system))}
          <li key='usermanual'>
            <div className={classes.linkBox}>
              <Link to = '/' className={classes.link}>
                <div className={classes.visualLink}></div>
                <div className={classes.labelLink}>{this.goodLabel['User manual'][this.props.lang]}</div>
              </Link>
            </div>  
          </li>
        </ul>        
      </div>             
    );
  }

  // ucFirst(str) {
  //   if (!str) return str;
  //   return str[0].toUpperCase() + str.slice(1).toLowerCase();
  // }
  goodLabel = {
    'Все поданные мной заявки в АСУЗ': 'Подданные заявки',
    'Заявки, находящиеся у меня на согласовании в АСУЗ': 'Ожидают согласования',
    'Настройки моих согласований/замещений в АСУЗ': 'Настройки',
    'Заявки, согласованные/отклоненные мной в АСУЗ': 'История согласований',
    'Requests created by me in ASUZ': 'Мy requests',
    'Requests waiting for my approval in ASUZ': 'Pending approval',
    'My approve settings/acting deputies in ASUZ': 'Settings',
    'History of requests approved/denied by me in ASUZ': 'Request history',
    'All applications': {
      'RU': 'Все заявки',
      'EN': 'All applications',
    },
    'User manual': {
      'RU': 'Инструкция по заполнению',
      'EN': 'User manual',
    },
  }
}
