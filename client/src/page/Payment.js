import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePayment } from '../redux/actions/cartAction';
import Navbar from '../components/layout/Navbar';

const Payment = (props) => {
  // set payment state
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  // ready the dispatch function action folder
  const dispatch = useDispatch();
  // history for changing the routes
  const history = useHistory();

  // submit the paymentv
  const handlePayment = (e) => {
    history.push('/completeOrder');
    e.preventDefault();
    // dispatch the payment in folder of action file orderAction.js
    dispatch(savePayment({ paymentMethod }));
  };
  return (
    <div style={{ marginTop: '10rem' }}>
      <Navbar />
      <div className="container">
        <div className="shipping-flex">
          <h3>Payment Method</h3>
          <div className="card p-3" style={{ width: '18rem' }}>
            <form>
              <div className="form-group">
                <label htmlFor="address">Payment Method</label>
                <select
                  className="custom-select"
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    console.log(paymentMethod);
                  }}
                >
                  <option value="paypal">Paypal</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <button
                onClick={handlePayment}
                className="btn btn-warning btn-block"
              >
                Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
