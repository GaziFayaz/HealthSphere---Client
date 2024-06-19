import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = () => {
	return (
		<dialog id="payment-modal" className="modal">
			<div className="modal-box text-left lg:py-20 lg:px-16">
				<Elements stripe={stripePromise}>
					<CheckoutForm></CheckoutForm>
				</Elements>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default Payment;
