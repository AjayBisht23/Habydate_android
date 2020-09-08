
export function paymentUsingCard(parameter) {
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
            console.log(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}
