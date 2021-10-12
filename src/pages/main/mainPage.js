import React, { Component } from 'react';
import classes from './main.module.scss'
import {Link} from 'react-router-dom';
import Service from '../../services';
import Spinner from '../../components/spinner';
import Error from '../../components/Error';

// const MainPage = props => {
export default class MainPage extends Component {

  service = new Service();
  state = {
    dataPage: [],
    loading: false,
    error: false,
  } 
 
  // testPath = '/app-release';
  testPath = '';

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

    return (
      <main className={classes.main}>

        {this.state.dataPage.map(section => this.renderSection(section))}

        {loading ? <Spinner className="spinner"/> : null}

      </main>
      
    )    
  }    

  renderLi(system) {
    const path = system.request_url.slice(29);
    var divStyle = {
      backgroundImage: `url(./image/${system.icon_filename})`
    };
    return(
      <li key={path}>
        <div className={classes.linkBox} style={divStyle}>
          <Link to = {`${this.testPath}${path}`} className={classes.link}>{system.request_name}</Link>
          <div className={classes.visualLink}></div>
        </div>  
      </li>
    )
  }

  renderSection(section) {
    if (section.id === '1') return null
    return(
      <div key={section.id} className={classes.groupBox}>
        <input type="radio" id={section.id} name="groupSystems" value={section.id} className={classes.visuallyHidden}/>
        <label htmlFor={section.id}>{section.name}</label>
        <ul className={classes.systemList}>
          {section.systems.map((system, index) => this.renderLi(system))}
        </ul>        
      </div>             
    );
  }

}
