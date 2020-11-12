import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';

import '../scss/index.scss';

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

const ProduvtsConfirm = () => {
  const [country, setCountry] = useState('');
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    getCountry();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountry = async () => {
    const data = await axios.get('http://ip-api.com/json');
    setCountry(data.data.country);
  };

  const { cartItems } = cart;

  const shippingAddress = () => {
    history.push('/placeorder');
  };

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  let calculatedPrice;
  // eslint-disable-next-line
  let totalPrices;
  const value = countryShippingPrices.findIndex(
    (item) => item.name === country
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

  let quantites = [];
  cartItems.map((item) => {
    quantites.push(Number(item.qty));
    return item.qty;
  });

  let quantitesSum = 0;

  quantites.map((item) => {
    quantitesSum = quantitesSum + item;
    return item;
  });

  return (
    <div style={{ marginTop: '8rem' }}>
      <Navbar />
      <div>
        <div className="container">
          <h1>Your Product</h1>
        </div>
        <div className="container">
          <div
            className="table-responsive"
            style={{ backgroundColor: 'rgba(230,227,227,0.91)' }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-center">
                      ${parseFloat(item.price).toFixed(2)} * {item.qty} = $
                      {parseFloat(item.price * item.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700 }}>TOTAL PRODUCT QUANTITIES</td>
                  <td className="text-center">{quantitesSum}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>SUBTOTAL</td>
                  <td className="text-center">
                    ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </td>
                </tr>
                <tr style={{ height: '67px', fontWeight: 700 }}>
                  <td>SHIPING</td>
                  <td>
                    ${sum && parseFloat(sum).toFixed(2)} shippng to {country}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>TOTAL</td>
                  <td className="text-center">
                    <strong>
                      ${parseFloat(Number(itemsPrice) + Number(sum)).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-warning" onClick={shippingAddress}>
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduvtsConfirm;
