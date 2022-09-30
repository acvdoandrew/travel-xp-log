import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

function Index({ travel, createTravel }) {
  const { user } = UserAuth();

  const [newForm, setNewForm] = useState({
    location: '',
    description: '',
    image: '',
    cost: '',
    visit: '',
  });

  const [isCreating, setIsCreating] = useState(false);

  const loaded = () => {
    const handleCreate = () => {
      setIsCreating((prevState) => !prevState);
    };

    const sortedList = [...travel].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
      <section className="xp-feed">
        {user && (
          <button onClick={handleCreate}>
            {isCreating ? 'Cancel' : 'Add New Travel'}
          </button>
        )}
        {sortedList.map((t) => (
          <div className="travel" key={t._id}>
            <p>
              <strong>Added By: </strong>
              {t.userName}
            </p>
            <h3>{t.location}</h3>
            <Link to={`/travel/${t._id}`}>
              <div className="img-wrapper">
                <img src={t.image} alt={t.location} />
              </div>
            </Link>
            <h4>{t.cost}</h4>
          </div>
        ))}
      </section>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  const handleChange = (e) => {
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createTravel(newForm);
    setNewForm({
      location: '',
      description: '',
      image: '',
      cost: '',
      visit: '',
    });
    setIsCreating(false);
  };

  return (
    <section className="form-container">
      {isCreating && (
        <div className="new-form">
          <form onSubmit={handleSubmit}>
            <label>
              Location:
              <br />
              <input
                type="text"
                name="location"
                value={newForm.location}
                onChange={handleChange}
                placeholder="Spain"
              />
            </label>
            <br />
            <label>
              XP.Log:
              <br />
              <input
                type="text"
                name="description"
                value={newForm.description}
                onChange={handleChange}
                placeholder="Spain is a perfect place to..."
              />
            </label>
            <br />
            <label>
              Image:
              <br />
              <input
                type="text"
                name="image"
                value={newForm.image}
                onChange={handleChange}
                placeholder="https://your-place-image.com/file.jpeg"
              />
            </label>
            <br />
            <label>
              Cost:
              <br />
              <input
                type="text"
                name="cost"
                value={newForm.cost}
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
                value={newForm.visit}
                onChange={handleChange}
                placeholder="The Prado and Paseo del Artes"
              />
            </label>
            <br />
            <input type="submit" value="Add Experience" />
          </form>
        </div>
      )}
      {travel ? loaded() : loading()}
    </section>
  );
}

export default Index;
