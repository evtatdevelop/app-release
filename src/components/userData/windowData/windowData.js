import classes from './windowData.module.scss';

const WindowData = (props) => {
  // console.log(props);
  const {set, data, handlerClick, handlerKeyUp} = props;

  // TODO
  let id = 'id';
  let name = 'name';
  if (set === 'idpath') {
    id = 'idpath';
    name = 'division_path'
  }

  const lis = data.map(row => {

    return (
    <li key={row[id]}
      tabIndex="0"
      className={classes.option}
      onClick={() => handlerClick(set, row[id])}
      onKeyUp={(e) => handlerKeyUp(e, row[id])}
      aria-label={row[name]}
    >
      {row[name]}
    </li>)
  })
  return (
    <ul className={classes.widowData}>{lis}</ul>
  )
}

export default WindowData;