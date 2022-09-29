import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
function Show({ travel, deleteTravel, updateTravel }) {
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
          <strong>XP.Log by:</strong>
          {trip.userName}
        </p>
        <div className="show-img-container">
          <img src={trip.image} alt={trip.location} />
        </div>
        <h3>Location: {trip.location} </h3>
        <h3>XP.Log: {trip.description}</h3>
        <h3>Cost: {trip.cost}</h3>
        <h3>Places to visit: {trip.visit}</h3>
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
  }, [trip]);

  return (
    <section>
      {travel ? loaded() : loading()}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <label>
            Location:
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
      )}
    </section>
  );
}

export default Show;
