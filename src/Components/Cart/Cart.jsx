import { FaEye } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import ProductModal from "../Product/ProductModal";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Cart = () => {
	const navigate = useNavigate();
	const { cart, changeQuantity, clearCart } = useCart();
	const [aboveHundred, setAboveHundred] = useState(false);
	console.log("cart", cart);

	useEffect(() => {
		const price = cart?.items?.reduce((acc, item) => {
			return acc + item.unit_prices[0].price * item.quantity;
		}, 0);
		if (price < 100) {
			setAboveHundred(false);
		} else {
			setAboveHundred(true);
		}
	}, [cart]);

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
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | My Cart</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				My Cart
			</h1>
			<div className="overflow-x-auto">
				<table className="table table-zebra text-center">
					{/* head */}
					<thead className="lg:text-xl font-slab align-text-top">
						<tr>
							<th></th>
							<th>
								<div className="font-bold">Medicine</div>
								<div className="text-sm opacity-50">Type</div>
							</th>
							<th>Dosage Form</th>
							<th>Manufacturer</th>
							<th>Price</th>
							<th>Details</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{cart.items.map((medicine, index) => {
							return (
								<tr key={index}>
									<td>
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
									</td>
									<td>
										<div className="flex-grow">
											<div className="font-bold">{medicine.medicine_name}</div>
											<div className="text-sm opacity-50">
												{medicine.generic_name}
											</div>
										</div>
									</td>
									<td className="font-bold">
										{medicine.category_name}
										<br />
										<span className="badge badge-ghost badge-sm">
											{medicine.strength}
										</span>
									</td>
									<td className="font-bold">{medicine.manufacturer_name}</td>
									<td className="font-bold">
										Tk. {medicine.unit_prices[0].price}
									</td>
									<td>
										<div className="h-full flex gap-10 justify-center items-center">
											<FaEye
												className="text-theme hover:text-theme2 text-2xl cursor-pointer"
												data-tooltip-id="my-tooltip"
												data-tooltip-content="See Details"
												data-tooltip-place="bottom"
												onClick={() => {
													// console.log(`getting clicked for id ${index}`)
													document.getElementById(`modal${index}`).showModal();
												}}
											/>
											<ProductModal
												modalId={`modal${index}`}
												modalData={medicine}
											></ProductModal>
										</div>
									</td>
									<td>
										<div className="flex items-center space-x-4 justify-center">
											<button
												id="decrement"
												// disabled = {!dataPending}
												className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
												onClick={() => {
													if (medicine.quantity > 0) {
														changeQuantity(cart._id, "decrement", medicine);
													}
												}}
											>
												-
											</button>
											<span id="number" className="text-2xl font-semibold">
												{medicine.quantity}
											</span>
											<button
												id="increment"
												className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
												onClick={() =>
													changeQuantity(cart._id, "increment", medicine)
												}
											>
												+
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div>
					<p className="text-right mt-5">
						Total Price: Tk.
						{parseFloat(cart?.items.reduce((acc, item) => {
							return acc + item.unit_prices[0].price * item.quantity;
						}, 0).toFixed(2))}
					</p>
				</div>
				<div className="flex gap-6 justify-end mt-5">
					<button
						className="btn bg-red-500 text-white text-lg hover:bg-red-700"
						onClick={() => clearCart(cart._id)}
					>
						Clear Cart
					</button>
					<div className="flex flex-col">
						<button
							disabled={!aboveHundred}
							className="btn bg-green-500 text-white text-lg  hover:bg-green-700"
							onClick={() => {
								navigate("/checkout");
							}}
						>
							Checkout
						</button>
						{!aboveHundred && <p className="text-red-500">Total price must be atleast 100 Tk.</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
