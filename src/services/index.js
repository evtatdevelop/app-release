export default class Service {
  constructor() {
    this._key = `key=fL1XVQ5CeeyZ6sBcQlgthfoXeZDxqY`;
    this._service = `/services`;
    this._apiBase = 'http:/';
    // this._apiBase = 'https://request-tst.sibgenco.local';
  }

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    } 
    return await res.json();   
  }

  postResource = async (url, data) => {
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


  getNames = (search) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=names&search=${search}&system=SAP&${this._key}`
    );
  }

  getDataUser = (id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=user&id=${id}&${this._key}`
    );
  }

  getDataSystem = (url, path) => {
    url = 'http://request-tst.sibgenco.local/corpsystems/'; // test data
    path = '/sap_devform/'                                  // test data
    return this.getResource(
      `${this._apiBase}${this._service}/?data=system&url=${url}&path=${path}&${this._key}`
    );
  }

  getDataSystemById = (id) => { 
    id = 21; // test data
    return this.getResource(
      `${this._apiBase}${this._service}/?data=system&asz24_id=${id}&${this._key}`
    );
  }

  getCompanies = () => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=companies&${this._key}`
    );
  }

  getBranches = (id) => {
    // console.log(id);
    return this.getResource(
      `${this._apiBase}${this._service}/?data=branches&hrs01_id=${id}&${this._key}`
    );
  }

  getDivisions = async (id) => {
    // console.log(id);
    const res = await this.getResource(
      `${this._apiBase}${this._service}/?data=divisions&hrs05_id=${id}&${this._key}`
    );
    return res.map(item => {
      return{
        id: item.idpath,
        name: item.division_path,
      }
    })
  }

  getRemoteUser = () => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=remote&${this._key}`
    );
  }


  postForm = async (data) =>{
    return await this.postResource(
      `${this._apiBase}${this._service}/?data=oredr&${this._key}`
    , data);
  }


}