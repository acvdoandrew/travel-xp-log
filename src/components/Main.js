import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Index from '../pages/Index';
import Show from '../pages/Show';

// eslint-disable-next-line no-unused-vars
function Main(props) {
  const { user } = UserAuth();

  const [travel, setTravel] = useState(null);
  const [comments, setComments] = useState(null);

  const API_URL = 'https://travel-xp-log-api.herokuapp.com/api/travel/';
  const API_URL2 = 'https://travel-xp-log-api.herokuapp.com/api/comments/';

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
      travel.userName = user.displayName;
      travel.userId = user.uid;
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

  const getCommentData = async (postId) => {
    try {
      const response = await fetch(API_URL2 + postId);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (comment, postId) => {
    try {
      comment.userName = user.displayName;
      comment.userId = user.uid;
      comment.postId = postId;
      await fetch(API_URL2, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(comment),
      });
      getCommentData(postId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
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
            <Show
              travel={travel}
              deleteTravel={deleteTravel}
              updateTravel={updateTravel}
              comments={comments}
              createComment={createComment}
              getCommentData={getCommentData}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
