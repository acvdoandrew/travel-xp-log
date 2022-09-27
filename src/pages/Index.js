/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Index({ travel }) {
  const loaded = () => {
    return travel.map((t) => (
      <div className="travel" key={t._id}>
        <h3>{t.location}</h3>
        <div className="img-wrapper">
          <img src={t.image} alt={t.location} />
        </div>
        <h4>{t.cost}</h4>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return travel ? loaded() : loading();
}

export default Index;
