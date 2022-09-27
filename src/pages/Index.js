/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Index({ travel, createTravel }) {
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
      <section>
        <button onClick={handleCreate}>
          {isCreating ? 'Cancel' : 'Add New Travel'}
        </button>
        {sortedList.map((t) => (
          <div className="travel" key={t._id}>
            <h3>{t.location}</h3>
            <div className="img-wrapper">
              <img src={t.image} alt={t.location} />
            </div>
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
  };

  return (
    <section>
      {isCreating && (
        <form onSubmit={handleSubmit}>
          <label>
            Location:
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
            Description:
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
      )}
      {travel ? loaded() : loading()}
    </section>
  );
}

export default Index;
