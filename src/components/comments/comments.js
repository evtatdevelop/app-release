import classes from './comments.module.scss';

const Comments = props => {
  const {roleNumber} = props;

  return( 
    <textarea className={classes.comments} id={`${roleNumber}comment`}></textarea>
  )
}

export default Comments;