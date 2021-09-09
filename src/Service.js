import axios from "axios";

export default class Service {

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could non fetch ${url}. Status: ${res.status}`);
    } 
    return await res.json();   
  }

  async getNames(url) {
    return await this.getResource(`http://services/?data=names&search=тат&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
    // return await this.getResource(`https://request-tst.sibgenco.local/services/?data=names&search=иванов сергей&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
  }



  getAxiosResource() {
    const res = axios.get(`http://services/?data=names&search=тат&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`);
    return res.then(d => d.data)
  }

  
  
}