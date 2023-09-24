import React, { useEffect } from 'react';
//Import from react-dom
import ReactDOM from 'react-dom';

//Import from react-router-dom
import { Outlet, useLocation } from 'react-router-dom';

//Import components
import MainNavigation from '../components/MainNavigation';
import Footer from '../components/Footer';

//Import react-redux
import { useDispatch } from 'react-redux';

//Import auth actions
import { authActions } from '../store/auth';

//Import products actions
import { productActions } from '../store/product';

//Improt cart actions
import { cartActions } from '../store/cart';
import LiveChat from '../components/LiveChat';

const Root = () => {
  //location object
  const location = useLocation();

  //dispatch
  const dispatch = useDispatch();

  //Handle navigation page
  useEffect(() => {
    //Hide popup
    dispatch(productActions.hidePopup());

    //Check user from localStorage
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
    if (user) {
      //Dispatch to set user login
      dispatch(authActions.onLogin(user));
    }

    //Check cart from local Storage
    const listCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    if (listCart.length > 0) {
      //Dispatch to update cart
      dispatch(cartActions.updateCart(listCart));
    }

    //Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, dispatch]);

  return (
    <div>
      {/* Create portal to render live chat component*/}
      {ReactDOM.createPortal(
        <LiveChat />,
        document.getElementById('live-chat')
      )}

      {/* Render Main Navigation */}
      <MainNavigation />
      <main>
        {/* Render nested routes  */}
        <Outlet />
      </main>
      {/* Render Footer Component */}
      <Footer />
    </div>
  );
};

export default Root;
