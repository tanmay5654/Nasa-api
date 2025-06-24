import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NasaData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://nasa-api-aeiq.vercel.app/api/apod')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching APOD:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading NASA data...</p>;
  if (!data) return <p>Error loading data</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      {data.media_type === 'image' ? (
        <img src={data.url} alt={data.title} style={{ maxWidth: '100%' }} />
      ) : (
        <iframe title="NASA Video" src={data.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      )}
      <p>{data.explanation}</p>
    </div>
  );
};

export default NasaData;