import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componentes/Header.jsx';

const Root = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Outlet />
    </div>
  );
};

export default Root;
