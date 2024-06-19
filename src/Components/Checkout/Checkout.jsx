import { Helmet } from "react-helmet-async";
import useCart from "../../Hooks/useCart";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Payment from "../Payment/Payment";

const Checkout = () => {
	const { cart } = useCart();
	const { user } = useAuth();
	const { register, handleSubmit,watch, formState: { errors }, } = useForm({
		defaultValues: {name: user?.displayName, email: user?.email}
	})
  // console.log(watch("name"));
  console.log(errors);
	const onSubmit = (data) => {

		// console.log(data);
    document.getElementById(`payment-modal`).showModal();
	};

	if (!cart?.items?.length)
		return (
			<div className="w-full mt-24">
				<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
					Checkout
				</h1>
				<div className="text-center">No items in cart to Checkout</div>
			</div>
		);
	return (
		<div className="flex-1 flex flex-col items-center w-full mt-24 font-roboto">
			<Helmet>
				<title>HealthSphere | Checkout</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Checkout
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-theme rounded-2xl md:rounded-3xl"
			>
				<h1 className="text-3xl font-bold text-center text-black font-slab">
					Billing Information
				</h1>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Name</p>
					<input
						{...register("name", { required: true })}
						defaultValue={user?.displayName}
						type="text"
						name="name"
						id="name"
						disabled
						placeholder="Your Name"
						className="border-b-2 text-black bg-gray-300 border-gray-400 w-full p-2 rounded-xl"
					/>
					<p className="text-xl font-semibold text-black mb-2">Email</p>
					<input
						{...register("email", { required: true })}
						defaultValue={user?.email}
						type="email"
						name="email"
						id="email"
						disabled
						placeholder="Your Email"
						className="border-b-2 text-black bg-gray-300 border-gray-400 w-full p-2 rounded-xl"
					/>
					<p className="text-xl font-semibold text-black mb-2">Phone Number</p>
					<input
						{...register("number", { required: true })}
						type="tel"
						name="number"
						id="number"
						placeholder="01XXXXXXXXX"
						className="border-b-2 text-black bg-white border-gray-400 w-full p-2 rounded-xl"
					/>
          {errors.number && <p className="text-red-500">Phone Number is required</p>}
					<p className="text-xl font-semibold text-black mb-2">Address</p>
					<input
						{...register("address", { required: true })}
						type="text"
						name="address"
						id="address"
						placeholder="Your Address"
						className="border-b-2 text-black bg-white border-gray-400 w-full p-2 rounded-xl"
					/>
          {errors.address && <p className="text-red-500">Address is required</p>}
				</div>
				<input
					type="submit"
					value={"Proceed to Payment"}
					className="btn w-full text-xl border-none bg-theme2 text-black hover:bg-gray-500"
				/>
			</form>
      <Payment></Payment>
		</div>
	);
};

export default Checkout;
