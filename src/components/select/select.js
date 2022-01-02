import { Component } from 'react';
import classes from './select.module.scss';

export default class Select extends Component {
  state = {
    list: [],
    showList: false,
  }

  componentDidMount() {
    const {list} = this.props;
    let initChecked = true
    list.map(item => {
      item.checked = initChecked;
      if (initChecked) initChecked = false;
      return item;
    });
    this.setState({list})
  }

  handleItemClick = checkedItem => {
    const list = [...this.state.list];
    list.map(item => {
      if (item.id === checkedItem.id) item.checked = true
      else item.checked = false;
      return item;
    })
    this.setState({
      list,
      showList: false,
    });
  }

  handleBtnClick = () => {
    const {showList} = this.state;
    this.setState({showList: !showList})   
    const list = [...this.state.list];
    this.setState({
      list,
      showList: !showList,
    });
  }

  render() {
    const {name} = this.props;
    const {list, showList} = this.state;

    return (
      <div className={classes.select}>
        <div className={classes.main}>
           {list
            .filter( item => item.checked)
            .map( item => <label htmlFor={name} key = {item.id}>{item.name}</label> )
          }
          <button type='button' id={name} onClick={this.handleBtnClick}></button>         
        </div>

        {showList
          ? <ul>
              {list
                .filter( item => !item.checked )
                .map( item => {
                  return (
                    <li key = {item.id}
                      onClick={() => this.handleItemClick(item)}
                    >
                      {item.name}
                    </li>
                  )
                })}
            </ul>
          : null
        }
      </div> 

    )
  }
}