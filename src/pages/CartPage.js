import React, { useState } from 'react';

//Import from react-router-dom
import { Link } from 'react-router-dom';

//Import css module
import classes from './CartPage.module.css';

//Import from react-redux
import { useSelector, useDispatch } from 'react-redux';

//Import cart actions
import { cartActions } from '../store/cart';

const CartPage = () => {
  //Coupon  state
  const [coupon, setCoupon] = useState('');

  //Coupon change handler
  const couponInputChange = (e) => {
    //set coupon state
    setCoupon(e.target.value);
  };

  //Coupon submit handler
  const couponSubmit = (e) => {
    //Prevent default behavior submit
    e.preventDefault();

    //Reset coupon
    setCoupon('');
  };

  //Dispatch
  const dispatch = useDispatch();

  //Select  listCart state
  const listCart = useSelector((state) => state.cart.listCart);

  //Increment quantity handler
  const incrementQuantityHandler = (cartItem) => {
    //Dispatch increment quantity
    dispatch(cartActions.incrementCartQuantity(cartItem));
  };

  //Decrement quantity handler
  const decrementQuantityHandler = (cartItem) => {
    //Dispatch decrement quantity
    dispatch(cartActions.decrementCartQuantity(cartItem));
  };

  //Delete cart handler
  const deleteCartHandler = (cartId) => {
    //Dispatch to delete cart
    dispatch(cartActions.deleteCart(cartId));
  };

  return (
    <div className={classes.cart}>
      <div className={classes['cart-banner']}>
        <h2>Cart</h2>
        <p>cart</p>
      </div>
      <h3>Shopping cart</h3>
      <div className={classes.container}>
        <div className={classes.left}>
          <table>
            <thead>
              <tr className={classes.heading}>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {listCart &&
                listCart.length > 0 &&
                listCart.map((cart) => (
                  <tr key={cart.id}>
                    <td>
                      <img src={cart.img} alt='product' />
                    </td>
                    <td className={classes['product-name']}>{cart.name}</td>
                    <td className={classes.price}>
                      {/*Handle currency formatting */}
                      {new Intl.NumberFormat()
                        .format(cart.price)
                        .replace(/,/g, '.') + ' '}
                      <p>VND</p>
                    </td>
                    <td>
                      <span
                        onClick={() => decrementQuantityHandler(cart)}
                        style={{ padding: '0 0.25rem', cursor: 'pointer' }}
                      >
                        <i className='fa-sharp fa-solid fa-caret-left'></i>
                      </span>
                      <span className={classes.number}>{cart.quantity}</span>
                      <span
                        onClick={() => incrementQuantityHandler(cart)}
                        style={{ padding: '0 0.25rem', cursor: 'pointer' }}
                      >
                        <i className='fa-sharp fa-solid fa-caret-right'></i>
                      </span>
                    </td>
                    <td className={classes.price}>
                      {/*Handle currency formatting */}
                      {new Intl.NumberFormat()
                        .format(cart.price * cart.quantity)
                        .replace(/,/g, '.') + +' '}
                      <p>VND</p>
                    </td>

                    <td>
                      <i
                        onClick={() => deleteCartHandler(cart.id)}
                        className={`fa-regular fa-trash-can ${classes.trash}`}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {listCart.length === 0 && (
            <h2 className={classes['no-cart']}>No any products in Cart</h2>
          )}

          <div className={classes.actions}>
            <div>
              <Link to='/shop'>
                <i className='fa-solid fa-arrow-left'></i> Continue shopping
              </Link>
            </div>
            <div>
              <Link to='/checkout' className={classes.border}>
                Proceed to checkout <i className='fa-solid fa-arrow-right'></i>
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.wrapper}>
            <h2>Cart Total</h2>
            <div>
              <h3>Subtotal</h3>
              <p className={classes['main-total']}>
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
            <div>
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
          <div className={classes.coupon}>
            <form onSubmit={couponSubmit}>
              <div>
                <input
                  value={coupon}
                  onChange={couponInputChange}
                  type='text'
                  placeholder='Enter your coupon'
                />
              </div>
              <div>
                <button type='submit'>
                  <i className='fa-solid fa-gift'></i>Apply coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
