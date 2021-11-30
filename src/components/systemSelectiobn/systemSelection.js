import { Component } from 'react';
import classes from './systemSelection.module.scss';
import Input from '../input';
import Spinner from '../spinner';
import Window from '../window';
import Error from '../Error';
import RowBox from '../rowBox';
import Service from '../../services';

export default class SystemSelection extends Component {
  state = {
    value: '',
    system: {},
    loading: false,
    error: false,
    showWindow: false,
    windowData: [],
  }
  
  service = new Service();
  // handlerInput = () => {return}
  // clearSarch = () => {return}
  onKeyUp = () => {return}


  getWindowData = (asz22_id) => {
    this.loading();
    this.service.getSystemsList(asz22_id)
    .then(windowData => {
      this.setState({
        windowData,
      })
      this.showWindow();
      this.noLoading();    
    })
    .catch(this.onError)
  }

  handlerWindowClick = (data) => {
    this.hideWindow();
    const system = this.getSystemById(data);
    const {full_name} = system;
    this.setState({
      system,
      value: full_name,
    })
    // this.props.getSapSystem(asz00_id);
    this.props.getSapSystem(system);
    this.props.clearRoles();
  }

  handlerWidowKeyUp = (e, set, id) => {
    switch (e.code) {
      case 'Escape': 
       this.hideWindow();
       break;
     case 'Enter':
       if (e.target.nodeName ==='LI') {
         this.handlerWindowClick(set, id);
       }
       break;  
     default: return;  
   }
  };


  getSystemById = id => {
    return this.state.windowData.filter(item => item.asz00_id === id)[0]
  }

  clearSystemSelection = () => this.setState({
    value: '',
    system: {},
    loading: false,
    error: false,
    showWindow: false,
    windowData: [],
  })


  loading = () => this.setState({loading: true})
  noLoading = () => this.setState({loading: false})
  showWindow = () => this.setState({showWindow: true});
  hideWindow = () => this.setState({showWindow: false});
  onError = () => {
    this.setState({error: true});
    this.noLoading();
  }

  render() {
    const {value, loading, showWindow, error, windowData} = this.state;
    const {asz22_id} = this.props;

    if (error) return <Error/>;
    return (
      <>
        <RowBox
          id = 'systemSelect'
          name = 'System'
          label = {true}
        >
          <Input
            id = 'systemSelect'
            value = {value}
            // handlerInput = {this.handlerInput}
            // handlerClr = {this.clearSarch}
            onKeyUp = {this.onKeyUp}
            placeholder = 'Selection of the system'
            arialabel = 'selection of the system'
            handlerClick = {() => this.getWindowData(asz22_id)}
            readonly
          />          
        </RowBox>



        {loading ? <Spinner className="spinner"/> : null}
        
        {showWindow 
          ? <Window handlerCloseWin={this.hideWindow}>
              {<ul className={classes.systemSelection}>
                {windowData.map(row => {
                  return (
                    <li
                      key={row.asz00_id}
                      tabIndex="0"
                      className={classes.option}
                      onClick={() => this.handlerWindowClick(row.asz00_id)}
                      onKeyUp={(e) => this.handlerWidowKeyUp(e, row.asz00_id)}
                      aria-label={row.name}
                    >{row.full_name}</li>
                  )
                })}
              </ul>}
            </Window>
          : null
        }
      </>
    )
  }

}