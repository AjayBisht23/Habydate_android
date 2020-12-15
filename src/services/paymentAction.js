import stripe from 'tipsi-stripe';
import {
  STRIPE_CLOUD_SERVER_URL,
  STRIPE_PUBLIC_KEY,
} from '@env';

export function setUpStripe() {
  stripe.setOptions({
    publishableKey: STRIPE_PUBLIC_KEY,
  });
}

export function openCardModal(user, amount, packageEndDate, context) {
  stripe
    .paymentRequestWithCardForm({
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: user.name,
          line1: 'Canary Place',
          line2: '3',
          city: 'Macon',
          state: '',
          country: 'Estonia',
          postalCode: '31217',
          email: user.email,
          phone: user.phone,
        },
      },
    })
    .then((response) => {
      context.props.showLoaderAction();
      let tokenId = response.tokenId;
      if (Boolean(tokenId)) {
        if (response.livemode) {
          paymentUsingCard({
            amount: amount,
            currency: 'usd',
            token: tokenId,
            description: 'Legendbae plan purchased.',
          })
              .then((response) => {
                context.props.hideLoaderAction();
                if (Boolean(response.response)) {
                  context.props.updateUserDataAction(
                      user.uid,
                      {packageEndDate},
                      'payment',
                  );
                  context.props.navigation.navigate('Home');
                }
              })
              .catch((error) => {
                context.props.hideLoaderAction();
                setTimeout(() => alert('Something went wrong.'), 10);
              });
        } else {
          context.props.hideLoaderAction();
          setTimeout(() => {
            context.props.updateUserDataAction(
                user.uid,
                {packageEndDate},
                'payment',
            );
            context.props.navigation.navigate('Home');
          }, 5);
        }
      }
    });
}

export function paymentUsingCard(parameter) {
  return new Promise((resolve, reject) => {
    fetch(STRIPE_CLOUD_SERVER_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameter),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
