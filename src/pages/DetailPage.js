import React, { useState, useEffect } from 'react';

//Import css module
import classes from './DetailPage.module.css';

//Import uuid
import { v4 as uuidv4 } from 'uuid';

//Import from react-router-dom
import {
  useRouteLoaderData,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';

//Import cart actions
import { cartActions } from '../store/cart';

//Import from react-redux
import { useSelector, useDispatch } from 'react-redux';

const DetailPage = () => {
  //dispatch
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.cart.listCart);

  //location
  const location = useLocation();

  //navigate
  const navigate = useNavigate();

  //Get products from API
  const products = useRouteLoaderData('products');

  //Create product state
  const [product, setProduct] = useState(null);

  //Quantity state
  const [quantity, setQuantity] = useState(1);

  //Create relatedProduct
  const [relatedProducts, setRelatedProducts] = useState([]);

  //params
  const params = useParams();

  //Side effect handler
  useEffect(() => {
    setQuantity(1);

    // filter productItem with productId
    const productItem = products.find(
      (product) => product._id.$oid === params.productId
    );
    if (productItem) {
      //Set product
      setProduct(productItem);
    }

    //Filter related product
    const relatedData = products.filter(
      (product) =>
        product.category === productItem.category &&
        product._id.$oid !== params.productId
    );

    //Check if have related products
    if (relatedData.length > 0) {
      setRelatedProducts(relatedData);
    }
  }, [params.productId, location.pathname, products]);

  // Click product list image  to navigate detail page
  const clickProductImgHandler = (product) => {
    //navigate

    navigate(`/detail/${product._id.$oid}`);
    setProduct(product);
  };

  //Increment quantity handler
  const incrementHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  //Decrement quantity handler
  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  //Add cart click handler
  const addCartClickHandler = (cartItem) => {
    //Dispatch to add to cartList
    dispatch(cartActions.addCart(cartItem));
  };

  return (
    <div className={classes.detail}>
      {product && (
        <React.Fragment>
          <div className={classes.main}>
            <div className={classes.left}>
              <div className={classes.one}>
                <img src={product.img1} alt={product.name} />
                <img src={product.img2} alt={product.name} />
                <img src={product.img3} alt={product.name} />
                <img src={product.img4} alt={product.name} />
              </div>
              <div className={classes.four}>
                <img src={product.img4} alt={product.name} />
              </div>
            </div>
            <div className={classes.right}>
              <h2>{product.name}</h2>
              <h3>
                {/*Handle currency formatting */}
                {new Intl.NumberFormat()
                  .format(product.price)
                  .replace(/,/g, '.') + ' VND'}
              </h3>
              <p>{product.short_desc}</p>
              <h4>
                Category: <span>{product.category}</span>{' '}
              </h4>
              <div className={classes.quantity}>
                <span>Quantity</span>
                <span style={{ cursor: 'pointer' }} onClick={decrementHandler}>
                  <i className='fa-sharp fa-solid fa-caret-left'></i>
                </span>
                <span className={classes.number}>{quantity}</span>
                <span style={{ cursor: 'pointer' }} onClick={incrementHandler}>
                  <i className='fa-sharp fa-solid fa-caret-right'></i>
                </span>
                <button
                  onClick={() => {
                    addCartClickHandler({
                      quantity: quantity,
                      id: product._id.$oid,
                      name: product.name,
                      img: product.img1,
                      price: product.price,
                    });
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className={classes.description}>
        <button>Description</button>
        <h3>Product Description</h3>
        {/* Handle string with  long_desc property */}
        {product &&
          product.long_desc
            .split('\n')
            .map((text) => <p key={uuidv4()}>{text}</p>)}
      </div>
      <div className={classes['related-products']}>
        <h3>Related products</h3>
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            {/* Map through relatedProducts array */}
            {relatedProducts.map((product) => (
              <div key={product._id.$oid}>
                <img
                  onClick={() => {
                    clickProductImgHandler(product);
                  }}
                  src={product.img1}
                  alt='product_item'
                />
                <h3>{product.name}</h3>
                <p>
                  {/*Handle currency formatting */}
                  {new Intl.NumberFormat()
                    .format(product.price)
                    .replace(/,/g, '.') + '  VND'}
                </p>
              </div>
            ))}
          </div>
        )}
        {relatedProducts.length === 0 && <p>No related product found!</p>}
      </div>
    </div>
  );
};

export default DetailPage;
