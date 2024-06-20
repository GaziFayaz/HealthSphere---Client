import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = ({orderData}) => {
	const {user} = useAuth();
	const { cart } = useCart();
	const axiosSecure = useAxiosSecure();
	const [clientSecret, setClientSecret] = useState("");
	const price = cart?.items.reduce((acc, item) => {
		return acc + item.unit_prices[0].price * item.quantity;
	}, 0);
	// console.log(cart?.items)
	useEffect(() => {
		axiosSecure.post("/create-payment-intent", { price }).then((res) => {
			// console.log(res.data.clientSecret)
			setClientSecret(res.data.clientSecret);
		});
	}, [axiosSecure, price]);
	return (
		<dialog id="payment-modal" className="modal">
			<div className="modal-box text-left lg:py-20 lg:px-16">
					<Elements stripe={stripePromise}>
						<CheckoutForm orderData={orderData} clientSecret={clientSecret} user={user} cart={cart} price={price}></CheckoutForm>
					</Elements>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default Payment;
