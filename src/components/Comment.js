/* eslint-disable no-unused-vars */
//import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';

function Comment({ comment, createComment }) {
  return (
    <section>
      <h5>Comments</h5>
      {comment &&
        comment.map((c) => (
          <div key={c._id}>
            <p>{c.comment}</p>
          </div>
        ))}
      <form>
        <label>
          Comment Here:
          <input type="text" />
          <input type="submit" value="Add Comment" />
        </label>
      </form>
    </section>
  );
}

export default Comment;
