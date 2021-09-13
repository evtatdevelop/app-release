// import React from 'react';
import classes from './nameSearch.module.scss';
import Input from './input';
import DataList from './datalist';
import { Component } from 'react';

export default class NameSearch extends Component {

  state = {
    requestNames: [],
    requestValue: '',
    names: [],
    value: '',
    showDatalist: false,
    timerId: null,
  }

  getNames(search) {
    let showDatalist = true;
    const res = this.props.handlerNames(search);
    res.then(data => {
      if (!data) {
        data = [];
        showDatalist = false;
      };
      this.setState({
        names: data,
        requestNames: data,
        requestValue: search,
        showDatalist,
      });
    });
  }

  filterNames(search) {
    const names = this.state.requestNames.filter(item => `${item.last_name} ${item.first_name} ${item.middle_name}`.toUpperCase().includes(search.toUpperCase()))
    this.setState({
      names
    })
  }

  getNameById = (id) => {
    const names = this.state.names.filter(item => item.id === id);
    const [{first_name, last_name, middle_name, email}] = names;
    return `${last_name} ${first_name} ${middle_name} (${email})`;
  }

  clearSarch() {
    this.setState({
      value: '',
      requestValue: '',
      showDatalist: false,
      names: [],
      requestNames: [],
      timerId: null,
    });
  }

  handlerInput = (e) => {
    clearTimeout(this.state.timerId);
    const {value} = e.target;
    const timerId = setTimeout(() => {
      if (
        this.state.requestNames.length === 0 
        || this.state.requestValue.length > this.state.value.length) {
        this.getNames(this.state.value)
      } else {
        this.filterNames(this.state.value)
      }
    }, 500);
    this.setState({
      timerId,
      value
    });
  }

  handlerClick = (id) => {
    this.props.getUserData(id);
    this.setState({
      value: this.getNameById(id),
      showDatalist: false,
    });
  }

  handlerClr = () => {
    this.props.clearUserData();
    this.clearSarch();
  }

  onKeyUp = (e, id = 0) => {
    switch (e.code) {
      case 'Escape': 
        this.clearSarch();
        break;

      case 'ArrowDown': 
        console.log(e.code);
        break;

      case 'ArrowUp': 
        console.log(e.code);
        break;

      case 'Enter': 
        if (e.target.nodeName ==='LI') {
          this.handlerClick(id);
        }
        break;
      
      default: return;  
    }
  }

  render() {
    const {value, names, showDatalist} = this.state;

    const datalist = showDatalist
      ? <DataList 
          names = {names}
          handlerClick = {this.handlerClick}
          handlerKeyUp = {this.onKeyUp}
        />
      : null;  

    return (
      <div className={classes.nameSearch}>
        <Input 
          value={value}
          handlerInput = {this.handlerInput}
          handlerClr = {this.handlerClr}
          onKeyUp = {this.onKeyUp}
        />
        {datalist}
      </div>
    )

  }
}
