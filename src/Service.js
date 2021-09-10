import axios from "axios";

export default class Service {

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could non fetch ${url}. Status: ${res.status}`);
    } 
    return await res.json();   
  }

  async getNames(search) {
    return await this.getResource(`http://services/?data=names&search=${search}&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
    // return await this.getResource(`https://request-tst.sibgenco.local/services/?data=names&search=иванов сергей&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
  }



  getAxiosResource(search) {
    // console.log(search);
    const res = axios.get(`http://services/?data=names&search=${search}&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
    // const res = axios.get(`https://request-tst.sibgenco.local/services/?data=names&search=${search}&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
    return res.then(d => d.data)
  }

  
  
}