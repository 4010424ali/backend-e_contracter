import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { createOrder } from '../redux/actions/orderAction';

const countryShippingPrices = [
  { name: 'Sri Lanka', price: '1.09', currency: 'rupess' },
  { name: 'Pakistan', price: '1.05', currency: 'rupess' },
  { name: 'Canada', price: '1.33', currency: 'candian' },
  { name: 'America', price: '30', currency: '$' },
  { name: 'London', price: '51.00', currency: '£' },
  { name: 'France', price: '23.44', currency: '€' },
  { name: 'German', price: '23.44', currency: '€' },
  { name: 'Swiss', price: '32.57', currency: 'Sw' },
  { name: 'Australia', price: '21.48', currency: 'Au$' },
];

const CompleteOrder = () => {
  const [country, setCountry] = useState('');
  // select the data from redux store
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);

  // ready for dispatch function in action folder
  const dispatch = useDispatch();
  const history = useHistory();

  const { success, order } = orderCreate;
  const { cartItems, shipping, payment } = cart;

  // if not ship address address placeorder
  if (!shipping.address) {
    history.push('/placeorder');
  } else if (!payment.paymentMethod) {
    history.push('/payment');
  }

  // calculate the prices
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  // const totalPrice = itemsPrice + shippingPrice;

  const getCountry = async () => {
    const data = await axios.get('http://ip-api.com/json');
    setCountry(data.data.country);
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }

    getCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const checkCountry = shipping.country ? shipping.country : country;
  console.log(checkCountry);

  let calculatedPrice;
  // eslint-disable-next-line
  let totalPrices;
  const value = countryShippingPrices.findIndex(
    (item) => item.name === checkCountry
  );

  const newValue = countryShippingPrices[value];

  let prices;
  let allPrice = [];
  let sum = 0;
  if (newValue !== undefined) {
    calculatedPrice = newValue.price;
    totalPrices = Number(calculatedPrice) + Number(itemsPrice);

    cartItems.map((item) => {
      const numbervalue = Number(item.qty);
      if (numbervalue === 1 || numbervalue <= 3) {
        prices = Number(calculatedPrice);
        allPrice.push(prices);
      } else if (numbervalue === 4 || numbervalue <= 6) {
        prices = Number(calculatedPrice) * 2;
        allPrice.push(prices);
      } else if (numbervalue === 7 || numbervalue <= 9) {
        prices = Number(calculatedPrice) * 3;
        allPrice.push(prices);
      } else if (numbervalue === 10 || numbervalue <= 12) {
        prices = Number(calculatedPrice) * 4;
        allPrice.push(prices);
      } else if (numbervalue === 13 || numbervalue <= 15) {
        prices = Number(calculatedPrice) * 6;
        allPrice.push(prices);
      } else if (numbervalue === 16 || numbervalue <= 18) {
        prices = Number(calculatedPrice) * 7;
        allPrice.push(prices);
      } else if (numbervalue === 17 || numbervalue <= 19) {
        prices = Number(calculatedPrice) * 8;
        allPrice.push(prices);
      } else if (numbervalue === 20 || numbervalue <= 22) {
        prices = Number(calculatedPrice) * 9;
        allPrice.push(prices);
      } else {
        prices = Number(calculatedPrice) * 10;
        allPrice.push(prices);
      }
      return prices;
    });
  }

  allPrice.map((item) => {
    sum = sum + item;
    return sum;
  });

  // Place the order
  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice: sum,
        taxPrice,
        totalPrice: parseFloat(Number(itemsPrice) + Number(sum)).toFixed(2),
      })
    );
  };

  return (
    <div style={{ marginTop: '8rem' }}>
      <Navbar />
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <h2 className="divider-style">
            <span>Order Detail</span>
          </h2>
          <div className="row">
            <div className="col">
              <div className="Push-20" />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Product</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="text-center">SUBTOTAL:</td>
                <td className="text-center">${itemsPrice}</td>
              </tr>
              <tr>
                <td className="text-center">SHOPING:</td>
                <td className="text-center">${parseFloat(sum).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="text-center">
                  PAYMENT METHOD:
                  <br />
                </td>
                <td className="text-center">{payment.paymentMethod}</td>
              </tr>
              <tr>
                <td className="text-center">TOTAL:</td>
                <td className="text-center">
                  ${parseFloat(Number(sum) + Number(itemsPrice)).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <button onClick={placeOrderHandler} className="btn btn-warning">
              pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
