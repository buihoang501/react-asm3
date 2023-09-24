import React, { useState } from 'react';

//Import css module
import classes from './CheckOutPage.module.css';

//Import from react-redux
import { useSelector } from 'react-redux';

const CheckOutPage = () => {
  //Select list cart state
  const listCart = useSelector((state) => state.cart.listCart);

  //Data order form state
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  //Change order input handler
  const inputValueChange = (e) => {
    //Set state input value change
    setOrderData((prevOrderData) => {
      return {
        ...prevOrderData,
        [e.target.name]: e.target.value,
      };
    });
  };

  //Order submit handler func
  const orderSubmitHandler = (e) => {
    //Prevent default behavior submission
    e.preventDefault();

    //Reset order data after submit
    setOrderData({
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
    });
  };

  return (
    <div className={classes.checkout}>
      <div className={classes['checkout-banner']}>
        <h2>Checkout</h2>
        <div>
          <h3>Home /</h3>
          <h3> Cart /</h3>
          <p> Checkout</p>
        </div>
      </div>
      <h3>Billing details</h3>
      <div className={classes.container}>
        <div className={classes.left}>
          <form onSubmit={orderSubmitHandler}>
            <div className={classes['form-control']}>
              <label>Full name:</label>
              <input
                value={orderData.name}
                name='name'
                onChange={inputValueChange}
                type='text'
                placeholder='Enter Your Full Name Here!'
              />
            </div>

            <div className={classes['form-control']}>
              <label>Email:</label>
              <input
                value={orderData.email}
                onChange={inputValueChange}
                type='email'
                name='email'
                placeholder='Enter Your Email Here!'
              />
            </div>
            <div className={classes['form-control']}>
              <label>Phone Number:</label>
              <input
                onChange={inputValueChange}
                type='text'
                value={orderData.phoneNumber}
                name='phoneNumber'
                placeholder='Enter Your Phone Number Here!'
              />
            </div>

            <div className={classes['form-control']}>
              <label>Address:</label>
              <input
                onChange={inputValueChange}
                value={orderData.address}
                type='text'
                name='address'
                placeholder='Enter Your Adress Here!'
              />
            </div>
            <div>
              <button type='submit'>Place order</button>
            </div>
          </form>
        </div>
        <div className={classes.right}>
          <div className={classes.wrapper}>
            <h2>Your Order</h2>

            {/* Loop through and render from list cart */}
            {listCart &&
              listCart.length > 0 &&
              listCart.map((cart) => (
                <div key={cart.id} className={classes['item-order']}>
                  <h3>{cart.name.substring(0, 20)}</h3>
                  <p>
                    {' '}
                    {/*Handle currency formatting */}
                    {new Intl.NumberFormat()
                      .format(cart.price)
                      .replace(/,/g, '.') + ` VND x ${cart.quantity}`}
                  </p>
                </div>
              ))}

            <div className={classes.total}>
              <h3>Total</h3>
              <p>
                {/* Handle total price */}

                {new Intl.NumberFormat()
                  .format(
                    listCart.reduce((acc, curr) => {
                      return acc + curr.price * curr.quantity;
                    }, 0)
                  )
                  .replace(/,/g, '.') + '  VND'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
