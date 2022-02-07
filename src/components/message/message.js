import { Component } from 'react';
import classes from './message.module.scss';

class Message extends Component {
  
  state = {
    showMessage: false,
    timeout: null,
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.showMessage(this.props.time);
    }
  }

  componentWillUnmount() {
    this.setState({
      showMessage: false,
      msgTime: null,
      timeout: null,
    })
  }

  showMessage = (time) => {
    this.setState({showMessage: true});
    const timeout = setTimeout(() => this.setState({showMessage: false}), time);
    this.setState({timeout});
  }

  render() {
    return (
      this.state.showMessage
        ? <section className={classes.message}>
            {this.props.data
              ? Object.entries(this.props.data).map((row, index) => {
                if ( typeof(row[1]) !== 'object')
                return <p key={index} >{row[0]}: {row[1]}</p>
                else {
                  // console.log(row[1]);
                  return (
                    <>
                      <p>Roles:</p>
                      <ul>
                        {row[1].map((item, index) => 
                          <li key={index}>
                            {`${item.group.name} / ${item.role.name}`}
                            <p>Levels:</p>
                            <ul>
                              {item.levels.map((item, index1) => 
                                <li key={index1}>{`${item.name}: ${item.value.join(', ')}`}</li>
                              )}
                            </ul>
                          </li>
                        )}
                      </ul>                    
                    </> 
                  )
                }
                
              })
              : null} 
            {/* {console.log(this.props.data)} */}
          </section>
        : null  
    )
  }

}

export default Message;