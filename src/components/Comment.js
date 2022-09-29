/* eslint-disable no-unused-vars */
import { useState } from 'react';

function Comment({ comments, createComment, postId }) {
  const [commentForm, setCommentForm] = useState({
    comment: '',
  });
  const handleChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    createComment(commentForm, postId);
    setCommentForm({
      comment: '',
    });
  };

  return (
    <section>
      <h5>Comments</h5>
      {comments &&
        comments.map((c) => (
          <div key={c._id}>
            <p>{c.comment}</p>
          </div>
        ))}

      <form>
        <label>
          Comment Here:
          <input
            type="text"
            name="comment"
            value={commentForm.comment}
            onChange={handleChange}
          />
          <input type="submit" value="Add Comment" onClick={handleAddComment} />
        </label>
      </form>
    </section>
  );
}

export default Comment;
