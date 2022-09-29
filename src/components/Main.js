/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';
import Comment from './Comment';

// eslint-disable-next-line no-unused-vars
function Main(props) {
  const [travel, setTravel] = useState(null);
  const [comment, setComment] = useState(null);

  const API_URL = 'http://localhost:4000/api/travel/';
  const API_URL2 = 'http://localhost:4000/api/comments/';

  const getData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTravel(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTravel = async (travel) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(travel),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTravel = async (id) => {
    try {
      await fetch(API_URL + id, {
        method: 'DELETE',
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTravel = async (updatedTrip, id) => {
    try {
      await fetch(API_URL + id, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(updatedTrip),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentData = async () => {
    try {
      const response = await fetch(API_URL2);
      const data = await response.json();
      setComment(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (comment, postId) => {
    try {
      comment.postId = postId;
      await fetch(API_URL2, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(comment),
      });
      getCommentData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCommentData();
  }, []);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Index travel={travel} createTravel={createTravel} />}
        />
        <Route
          path="/travel/:id"
          element={
            <>
              <Show
                travel={travel}
                deleteTravel={deleteTravel}
                updateTravel={updateTravel}
              />
              <Comment comment={comment} createComment={createComment} />
            </>
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
