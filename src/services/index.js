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

  getAddNames = (search, asz01_id, ids, system) => {
    // console.log(search, asz01_id, ids, system);
    return this.getResource(
      `${this._apiBase}${this._service}/?data=adduser&asz01_id=${asz01_id}&ids=${ids}&search=${search}&system=${system}&${this._key}`
    );
  }

  getDataUser = (id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=user&id=${id}&${this._key}`
    );
  }

  getDataSystem = (url, path, lang) => {
    url = 'http://request.sibgenco.local/corpsystems/'; // test data
    path = `/${path}/`;
    return this.getResource(
      `${this._apiBase}${this._service}/?data=systemdata&url=${url}&path=${path}&lang=${lang}&${this._key}`
    );
  }

  getDataSystemById = (id) => { 
    id = 21; // test data
    return this.getResource(
      `${this._apiBase}${this._service}/?data=systemdata&asz24_id=${id}&${this._key}`
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

  setLanguage = (app12_id, lang) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=userlang&app12_id=${app12_id}&lang=${lang}&${this._key}`
    );
  }

  getLanguage = (app12_id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=userlang&app12_id=${app12_id}&${this._key}`
    );
  }

  getMainPage = lang => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=mainpage&lang=${lang}&${this._key}`
    );
  }

  getPhrase = (lang, form_name, phrase) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=phrase&form_name=${form_name}&phrase=${phrase}&lang=${lang}&${this._key}`
    );
  }

  getSystemsList = (asz22_id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=sapsystems&asz22_id=${asz22_id}&${this._key}`
    );
  }

  getGroups = (asz00_id, asz01_id, app12_id, app12_id_author, order_type, instance_type) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=groups&asz00_id=${asz00_id}&asz01_id=${asz01_id}&app12_id=${app12_id}&app12_id_author=${app12_id_author}&order_type=${order_type}&instance_type=${instance_type}&${this._key}`
    );
  }

  getRoles = (asz00_id, asz01_id, app12_id, app12_id_author, order_type, instance_type, asz02_id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=roles&asz02_id=${asz02_id}&asz00_id=${asz00_id}&asz01_id=${asz01_id}&app12_id=${app12_id}&app12_id_author=${app12_id_author}&order_type=${order_type}&instance_type=${instance_type}&${this._key}`
    );
  }

  getRoleGroup = (asz00_id, asz03_id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=group&asz00_id=${asz00_id}&asz03_id=${asz03_id}&${this._key}`
    );
  }

  getLevels = (asz03_id) => {
    return this.getResource(
      `${this._apiBase}${this._service}/?data=levels&asz03_id=${asz03_id}&${this._key}`
    );
  }


  postForm = async (data) =>{
    return await this.postResource(
      `${this._apiBase}${this._service}/?data=oredr&${this._key}`
    , data);
  }


}