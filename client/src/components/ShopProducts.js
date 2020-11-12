import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder, Visibility } from '@material-ui/icons';
import { listProducts } from '../redux/actions/productAction';
import { addToCart } from '../redux/actions/cartAction';

const ShopProducts = () => {
  // getting the product from redux
  const productList = useSelector((state) => state.productList);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // destructuring the variable
  const { products, loading } = productList;

  // dispatch the mathod the in the action folder
  const dispatch = useDispatch();

  console.log(products);

  // React lifecyle method
  useEffect(() => {
    // dispatch the listProducts in products action
    dispatch(listProducts());
    return () => {
      ///
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  // add to cart function
  const addcart = (id, items) => {
    // dispatvh the function cartAction file
    dispatch(addToCart(id, items));
  };
  return (
    <>
      <section className="new">
        <div className="container">
          <div className="row">
            {loading ? (
              <h1>Workings</h1>
            ) : products.length !== 0 ? (
              // lopp the products
              products.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-12">
                  <div className="card mb-4 card-pos" style={{ width: '100%' }}>
                    <>
                      <img
                        src={`${product.image}`}
                        className="card-img-top p-1"
                        height="200"
                        width="200"
                        alt=""
                      />
                      <div className="card-overlay">
                        <div className="card-overlay-item">
                          <IconButton
                            style={{ background: '#f7f7f7', margin: '0 10px' }}
                            onClick={() => {
                              addcart(product._id, 1);
                            }}
                          >
                            {cartItems.findIndex((item) => {
                              return item.product === product._id;
                            }) === -1 ? (
                              <FavoriteBorder color="action" />
                            ) : (
                              <Favorite color="action" />
                            )}
                          </IconButton>
                          <Link
                            style={{
                              background: '#f7f7f7',
                              margin: '0 10px',
                              padding: '1rem',
                              borderRadius: '50%',
                            }}
                            to={`/products/single/${product._id}`}
                          >
                            <Visibility color="action" />
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-text title">
                          <Link
                            className="single-link"
                            to={`/products/single/${product._id}`}
                          ></Link>
                          {product.name}
                        </h5>
                        <p className="card-text sub-title">
                          {product.category}
                        </p>
                        <p className="card-text text-warning">
                          $ {product.price.toFixed(2)}
                        </p>
                        {product.discount && (
                          <p>
                            Real Price:{' '}
                            <strike className="text-dark">
                              ${product.realPrice}
                            </strike>
                          </p>
                        )}
                        {product.discount && (
                          <p className="bg-warning text-secondary p-2 card-p">
                            {product.amountOfDiscount}%
                          </p>
                        )}
                      </div>
                    </>
                    <div className="card-footer">
                      <button
                        onClick={() => {
                          addcart(product._id, 1);
                        }}
                        className="btn btn-outline-warning"
                      >
                        {cartItems.findIndex((item) => {
                          return item.product === product._id;
                        }) === -1
                          ? 'Add to cart'
                          : 'Producted added'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Product found</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopProducts;
