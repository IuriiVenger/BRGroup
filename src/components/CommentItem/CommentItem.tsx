import { FC, useState } from 'react';
import classes from './CommentItem.module.scss';
import CommentData from '@/types/CommentData';
import { getDataById } from '@/api/getData';
import DOMPurify from 'dompurify';
import dateTransform from '@/services/dateTransform';
import { Card } from '@mui/material';

const CommentItem: FC<CommentData> = comment => {
  const [subComments, setSubComments] = useState([] as CommentData[]);
  const [subCommentVisible, setSubCommentVisible] = useState(false);

  const cleanTextHtml = DOMPurify.sanitize(comment.text);

  const loadSubcomments = () => {
    Promise.all(comment.kids.map(commentId => getDataById(commentId))).then(comments => {
      setSubComments(comments);
    });
  };

  const toogleVisiblity = () => {
    if (!subCommentVisible && comment?.kids?.length > 0 && subComments?.length !== comment?.kids?.length) {
      loadSubcomments();
    }
    comment?.kids?.length && setSubCommentVisible(prev => !prev);
  };

  return (
    <Card variant='outlined' className={classes.commentItem}>
      <small className={classes.commentItem__header}>{`comment #${comment.id}, written by ${
        comment.by
      } at ${dateTransform(comment.time)}`}</small>
      <p dangerouslySetInnerHTML={{ __html: cleanTextHtml }} />
      <small className={classes.commentItem__footer} onClick={toogleVisiblity}>
        {`subcomments (${comment.kids?.length ? comment.kids.length : 0})`}
      </small>
      {subCommentVisible && (
        <section className={classes.commentItem__subcomments}>
          {subComments.map(subComment => (
            <CommentItem {...subComment} key={subComment.id} />
          ))}
        </section>
      )}
    </Card>
  );
};

export default CommentItem;
