// src/DotLoader.js
import React, { useState, useEffect } from 'react';

const DotLoader = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 4 ? prevDots + '.' : ''));
    }, 500); // Adjust the interval for faster or slower dot appearance

    return () => clearInterval(interval);
  }, []);

  return <span className="text-blue-500">{`Loading${dots}`}</span>;
};

export default DotLoader;
