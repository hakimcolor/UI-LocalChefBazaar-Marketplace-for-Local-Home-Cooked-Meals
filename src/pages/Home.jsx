import React from 'react'
import TipsSlider from '../Componentes/HOmeAllpage/TipeSlider'
import HeroBanner from '../Componentes/HOmeAllpage/HeroBanner'
import DalySixDataDB from '../Componentes/HOmeAllpage/DalySixDataDB'
import CustomerReviews from '../Componentes/HOmeAllpage/CustomerReviews'
import HomeStats from '../Componentes/HOmeAllpage/HomeStats'

const Home = () => {
  return (
    <div>
      <title>LocalChefBazaar || Home page</title>
      <HeroBanner />
      <DalySixDataDB />
      <CustomerReviews />
      <HomeStats />
      <TipsSlider />
    </div>
  );
}

export default Home
