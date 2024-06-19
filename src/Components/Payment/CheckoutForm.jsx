import { useMemo, useState } from "react";
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
} from "@stripe/react-stripe-js";

import "./styles.css";

const useOptions = () => {
	const fontSize = "18px";
	const options = useMemo(
		() => ({
			style: {
				base: {
					fontSize,
					color: "#424770",
					letterSpacing: "0.025em",
					fontFamily: "Source Code Pro, monospace",
					"::placeholder": {
						color: "#aab7c4",
					},
				},
				invalid: {
					color: "#9e2146",
				},
			},
		}),
		[fontSize]
	);

	return options;
};

const CheckoutForm = () => {
  const [error, setError] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardNumberElement),
		});
		// console.log("[PaymentMethod]", paymentMethod);

    if(error){
      setError(error.message)
    } else {
      setError('')
    }
	};

	return (
			<form onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center mb-6 text-">Make Payment</h1>
				<label>
					Card number
					<CardNumberElement options={options} />
				</label>
				<label>
					Expiration date
					<CardExpiryElement options={options} />
				</label>
				<label>
					CVC
					<CardCvcElement options={options} />
				</label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
				<button className="btn bg-theme text-white text-lg" type="submit" disabled={!stripe}>
					Pay
				</button>
			</form>
	);
};

export default CheckoutForm;
