import './App.css';
import SelectInput from './components/selectInput';

// const names = [
//   {
//     id: 1833,
//     first_name: 'Evgenii',
//     last_name: 'Tatarenko',
//     login: 'TatarenkoEG',
//     email: 'tatarenkoeg@suek.ru',
//   },
//   {
//     id: 1835,
//     first_name: 'Segei',
//     last_name: 'Furs',
//     login: 'FursSV',
//     email: 'furssvg@suek.ru',
//   },
//   {
//     id: 1837,
//     first_name: 'Kramorova',
//     last_name: 'Olga',
//     login: 'CramorovaOV',
//     email: 'kramorovaov@suek.ru',
//   },
// ];

function App() {
  return (
    <div className="App">
      <h1>Test page</h1>
      <form>
        <SelectInput/>
      </form>
    </div>
  );
}

export default App;
