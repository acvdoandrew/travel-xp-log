/* eslint-disable no-unused-vars */
import { useState } from 'react';

function Comment({ comments, createComment, postId, user }) {
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
    <section className="comment-box">
      <h3>Comments</h3>
      {comments &&
        comments.map((c) => (
          <div key={c._id}>
            <p>
              {c.userName}: {c.comment}
            </p>
          </div>
        ))}

      {user && (
        <form className="comment-form">
          <label>
            MAKE A COMMENT HERE:
            <br />
            <input
              type="text"
              name="comment"
              value={commentForm.comment}
              onChange={handleChange}
            />
            <input
              type="submit"
              value="Add Comment"
              onClick={handleAddComment}
            />
          </label>
        </form>
      )}
    </section>
  );
}

export default Comment;
