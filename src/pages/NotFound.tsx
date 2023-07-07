import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div>
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
