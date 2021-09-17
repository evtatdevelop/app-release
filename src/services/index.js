export default class Service {
  constructor() {
    // this._apiBase = 'http:/';
    this._apiBase = 'https://request-tst.sibgenco.local';
  }

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    } 
    return await res.json();   
  }

  async postResource(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    if (!res.ok) {
      throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    } 
    return await res.json(); 
  }


  getNames(search) {
    return this.getResource(
      `${this._apiBase}/services/?data=names&search=${search}&system=SAP&key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`
    );
  }

  getDataUser(id) {
    return this.getResource(
      `${this._apiBase}/services/?data=user&id=${id}&key=CrgFJ2MlXCB1JZXw94kqzg3fZZL1wK`
    );
  }

  getDataSystem(url, path) {
    url = 'http://request-tst.sibgenco.local/corpsystems/'; // test data
    path = '/sap_devform/'                                  // test data
    return this.getResource(
      `${this._apiBase}/services/?data=system&url=${url}&path=${path}&key=N7Ej1YO2kqFH2FnqNiKA6tm980bwMS`
    );
  }

  getDataSystemById(id) { 
    id = 21; // test data
    return this.getResource(
      `${this._apiBase}/services/?data=system&id=${id}&key=N7Ej1YO2kqFH2FnqNiKA6tm980bwMS`
    );
  }


  async postForm(data) {
    return await this.postResource(
      `${this._apiBase}/services/?data=oredr&key=N7Ej1YO2kqFH2FnqNiKA6tm980bwMS`
    , data);
  }
  
}