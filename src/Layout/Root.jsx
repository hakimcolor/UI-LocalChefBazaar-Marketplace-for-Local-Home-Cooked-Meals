import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componentes/Header.jsx';
import Footer from '../Componentes/Footer.jsx';

const Root = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Outlet />
    <Footer/>
    </div>
  );
};

export default Root;
