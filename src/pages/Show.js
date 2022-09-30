import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Comment from '../components/Comment';

function Show({
  travel,
  deleteTravel,
  updateTravel,
  createComment,
  comments,
  getCommentData,
}) {
  const { id } = useParams();
  const trip = travel ? travel.find((t) => t._id === id) : null;
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState({
    location: '',
    description: '',
    image: '',
    cost: '',
    visit: '',
  });

  const [likes, setLikes] = useState(0);
  const handleClick = () => {
    setLikes(likes + 1);
  };

  const { user } = UserAuth();

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTravel(editForm, id);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  const loaded = () => {
    const handleEdit = () => {
      setIsEditing((prevState) => !prevState);
    };

    const handleDelete = () => {
      deleteTravel(trip._id);
      navigate('/');
    };

    return (
      <section className="trip-card">
        <p>
          <strong>XP.Log by: </strong>
          {trip.userName}
        </p>
        <div className="show-img-container">
          <img src={trip.image} alt={trip.location} />
        </div>
        <h3>Location: {trip.location} </h3>
        <h3>XP.Log: {trip.description}</h3>
        <h3>Cost: {trip.cost}</h3>
        <h3>Places to visit: {trip.visit}</h3>

        <button onClick={handleClick}>
          <span className="likes-counter">{`Like | ${likes}`}</span>
        </button>

        {user && user.uid === trip.userId && (
          <>
            <button onClick={handleEdit}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </section>
    );
  };

  useEffect(() => {
    if (trip) {
      setEditForm(trip);
    }
    getCommentData(id);
  }, [trip, id]);

  return (
    <section className="main-show">
      {travel ? loaded() : loading()}
      {isEditing && (
        <div className="edit-form">
          <form onSubmit={handleSubmit}>
            <label>
              Location:
              <br />
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              XP.Log:
              <br />
              <input
                type="text"
                name="description"
                value={editForm.description}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Image:
              <br />
              <input
                type="text"
                name="image"
                value={editForm.image}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Cost:
              <br />
              <input
                type="text"
                name="cost"
                value={editForm.cost}
                onChange={handleChange}
                placeholder="$5000"
              />
            </label>
            <br />
            <label>
              Visit:
              <br />
              <input
                type="text"
                name="visit"
                value={editForm.visit}
                onChange={handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Update Experience" />
          </form>
        </div>
      )}
      <Comment
        comments={comments}
        createComment={createComment}
        postId={id}
        user={user}
      />
    </section>
  );
}

export default Show;
