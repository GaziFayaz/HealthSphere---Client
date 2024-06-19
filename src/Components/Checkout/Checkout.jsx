import { Helmet } from "react-helmet-async";
import useCart from "../../Hooks/useCart";

const Checkout = () => {
	const { cart } = useCart();

	if (!cart?.items?.length)
		return (
			<div className="w-full mt-24">
				<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
					My Cart
				</h1>
				<div className="text-center">No items in cart</div>
			</div>
		);
	return (
		<div>
			<Helmet>
				<title>HealthSphere | Checkout</title>
			</Helmet>
		</div>
	);
};

export default Checkout;
