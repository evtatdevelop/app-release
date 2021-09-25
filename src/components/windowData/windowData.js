import classes from './windowData.module.scss';

const WindowData = (props) => {
  console.log(props);
  
  let key = 'id';
  let name = 'name';
  if (props.type === 'getDivisions') {
    key = 'idpath';
    name = 'division_path'
  }

  const lis = props.data.map(company => {
    return <li key={company[key]}>{company[name]}</li>
  })
  return (
    <ul className={classes.widowData}>{lis}</ul>
  )
}

export default WindowData;