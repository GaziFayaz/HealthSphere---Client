import { useEffect, useMemo, useState } from "react";
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

const CheckoutForm = ({ clientSecret, user }) => {
	const [error, setError] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		if (!clientSecret) {
			return;
		}
	}, [stripe, clientSecret]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error: cardError, paymentMethod } =
			await stripe.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardNumberElement),
			});
		// console.log("[PaymentMethod]", paymentMethod);

		if (cardError) {
			setError(cardError.message);
		} else {
			setError("");
		}

		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
					},
				},
			})
			.then((error) => {
				if (error.type === "card_error" || error.type === "validation_error") {
					setMessage(error.message);
				} else {
					setMessage("An unexpected error occurred.");
				}

				setIsLoading(false);
				stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
					switch (paymentIntent.status) {
						case "succeeded":
							setMessage("Payment succeeded!");
							break;
						case "processing":
							setMessage("Your payment is processing.");
							break;
						case "requires_payment_method":
							setMessage("Your payment was not successful, please try again.");
							break;
						default:
							setMessage("Something went wrong.");
							break;
					}
				});
			});
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
			<button
				className="btn bg-theme text-white text-lg"
				type="submit"
				disabled={isLoading || !stripe || !elements}
			>
				{isLoading ? (
					<span className="loading loading-spinner"></span>
				) : (
					"Pay now"
				)}
			</button>
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
};

export default CheckoutForm;
