import './App.css';
import SelectInput from './components/selectInput';
import RowBox from './components/rowBox';
import FormSet from './components/formSet';
import Service from './Service';


const  getNames = (search) => {
  return new Service().getAxiosResource(search);
}

const  getOherNames = (search) => {
  return new Service().getNames(search);
}

function App() {
  return (
    <div className="App">
      <h1>Test page</h1>
      <form className="mainForm">
        <FormSet label="Employee info">
          <RowBox>
            <label>Employee name</label>
            <SelectInput handlerNames = {getNames}/>
          </RowBox>
          <RowBox>
            <label>Employee name</label>
            <SelectInput handlerNames = {getOherNames}/>
          </RowBox>
        </FormSet>
      </form>
    </div>
  );
}

export default App;
