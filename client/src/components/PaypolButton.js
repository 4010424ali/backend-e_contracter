import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
function PaypalButton(props) {
  // Show sdk
  const [sdkReady, setSdkReady] = useState(false);

  console.log(sdkReady);
  // add the sdk in th dom
  const addPaypalSdk = async () => {
    // create the elements
    const script = document.createElement('script');
    // tell the dom it's a javascript
    script.type = 'text/javascript';
    // create the javascript src
    script.src = 'https://www.paypal.com/sdk/js?client-id=sb';
    // this script the proform the task asynchronous
    script.async = true;
    // this script load the file load in the DOM
    script.onload = () => {
      setSdkReady(true);
    };
    // push the script in the body
    document.body.appendChild(script);
  };

  // create the order
  const createOrder = (data, actions) =>
    // this function give the money parpol
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: props.amount,
          },
        },
      ],
    });

  // this excute when payment happen successful
  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((err) => console.log(err));

  // this life method of javascript
  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
    return () => {
      //
    };
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>;
  }

  // create paypol button
  const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalButton;
