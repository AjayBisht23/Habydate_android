import stripe from 'tipsi-stripe';
import {regex} from '../utils/regex';
import {updateUserAction} from './userAction';
import {STRIPE_PUBLIC_KEY} from '../config/config';

export function setUpStripe() {
    stripe.setOptions({
        publishableKey: STRIPE_PUBLIC_KEY
    })
}

export function openCardModal(user, amount, packageEndDate) {
    stripe.paymentRequestWithCardForm({
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
    }).then(response => {
        regex.showLoader();
        let tokenId = response.tokenId;
        if (Boolean(tokenId)) {
            paymentUsingCard({
                amount: amount,
                currency: 'usd',
                token: tokenId,
                description: 'Epicbae plan purchased.',
            }).then(response => {
                regex.hideLoader();
                if (Boolean(response.response))
                    updateUserAction(user.uid, {packageEndDate}, 'payment');
            }).catch(error => {
                regex.hideLoader();
            })
        }
    });
}


export function paymentUsingCard(parameter) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/epicbae-246b2/us-central1/payWithStripe', {
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
