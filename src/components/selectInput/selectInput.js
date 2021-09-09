// import React from 'react';
import classes from './selectInput.module.scss';
import Input from './input';
import DataList from './datalist';
import { Component } from 'react';
import Service from '../../Service';

class SelectInput extends Component {

  state = {
    names: [
      {
        id: 1833,
        first_name: 'Evgenii',
        last_name: 'Tatarenko',
        login: 'TatarenkoEG',
        email: 'tatarenkoeg@suek.ru',
      },
      {
        id: 1835,
        first_name: 'Segei',
        last_name: 'Furs',
        login: 'FursSV',
        email: 'furssvg@suek.ru',
      },
      {
        id: 1837,
        first_name: 'Kramorova',
        last_name: 'Olga',
        login: 'CramorovaOV',
        email: 'kramorovaov@suek.ru',
      },
    ],
    value: '',
    showDatalist: false,
  }

  getNames() {
    const service = new Service();
    return service.getAxiosResource();
  }

  getNameById = (id) => {
    const names = this.state.names.filter(item => item.id === id);
    const [{first_name, last_name, email}] = names;
    return `${first_name} ${last_name} (${email})`;
  }

  handlerInput = (e) => {
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

  render() {
    const {value, names, showDatalist} = this.state;

    // console.log(this.getNames());

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