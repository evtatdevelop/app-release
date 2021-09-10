// import React from 'react';
import classes from './selectInput.module.scss';
import Input from './input';
import DataList from './datalist';
import { Component } from 'react';
import Service from '../../Service';

class SelectInput extends Component {

  state = {
    names: [],
    value: '',
    showDatalist: false,
    timerId: null,
  }

  getNames(search) {
    const service = new Service();
    const res = service.getAxiosResource(search);
    res.then(data => {
      if (!data) {
        this.setState({
          data: [],
          showDatalist: false
        })
        return;
      };
      this.setState({names: data})
    });
  }

  getNameById = (id) => {
    const names = this.state.names.filter(item => item.id === id);
    const [{first_name, last_name, email}] = names;
    return `${first_name} ${last_name} (${email})`;
  }

  handlerInput = (e) => {
    clearTimeout(this.state.timerId);
    const timerId = setTimeout(() => this.getNames(this.state.value), 500);
    this.setState({
      timerId
    })
    
    this.setState({
      value: e.target.value,
      showDatalist: true,
    });
  }

  handlerClick = (id) => {
    this.setState({
      value: this.getNameById(id),
      showDatalist: false,
    });
  }

  handlerClr = () => {
    this.setState({
      value: '',
      showDatalist: false,
      names: [],
    });
  }

  render() {
    const {value, names, showDatalist} = this.state;

    const datalist = showDatalist
      ? <DataList 
          names = {names}
          handlerClick = {this.handlerClick}
        />
      : null;  

    return (
      <div className={classes.selectInput}>
        <Input 
          value={value}
          handlerInput = {this.handlerInput}
          handlerClr = {this.handlerClr}
        />
        {datalist}
      </div>
    )

  }
}

// const SelectInput = (props) => {
//   const {names} = props;
  
//   return (
//       <div className={classes.selectInput}>
//         <Input/>
//         <DataList names = {names}/>
//       </div>
//   )
// }

export default SelectInput;