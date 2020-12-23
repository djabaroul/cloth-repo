import React from 'react';
import StrikeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton =({price}) => {
    const priceForStripe=price * 100;
    const publishablekey = 'pk_test_51I1VWdCG0KO2HkqcOVFyMqK1hXdhbjUlG2ZCMpTfeBiIOar1IBz22hs0PHXWlzZr4DTWoAkCuOTYyrYy3Ht6HuEf00nw56802x';

    const onToken= token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StrikeCheckout
           label='Pay Now'
           name ='CROWN CLOTH Ltd.'
           billingAddress
           shippingAddress
           image='https://sendeyo.com/up/d/f3eb2117da'
           description = {`Your total is $${price}`}
           amount={priceForStripe}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={publishablekey}
        />
    );
}

export default StripeCheckoutButton;