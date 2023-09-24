import React from 'react';

//Import components
import Banner from '../components/Banner';
import Category from '../components/Category';

//Import from react-router
import { json } from 'react-router-dom';
import Products from '../components/Products';
import OthersInfo from '../components/OthersInfo';

const HomePage = () => {
  return (
    <React.Fragment>
      {/*Render Banner Component */}
      <Banner />
      {/*Render Category Component */}
      <Category />
      {/*Render Products Component */}
      <Products />
      {/*Render Others Info Component */}
      <OthersInfo />
    </React.Fragment>
  );
};

export default HomePage;
export const loader = async () => {
  try {
    const response = await fetch(
      `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
    );

    if (!response.ok) {
      throw json({ message: 'Coulnd not fetch product list' }, { status: 500 });
    }
    return response;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};
