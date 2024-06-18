import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const successToast = (message) =>
		toast.success(message, { position: "bottom-right" });
	const errorToast = (message) =>
		toast.error(message, { position: "bottom-right" });

	const { loading, setLoading, createUserEmailPassword, customizeProfile } =
		useContext(AuthContext);

	const axiosPublic = useAxiosPublic();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { register, handleSubmit, reset, watch } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		if (data.password.length < 6) {
			errorToast("Password must be at least 6 characters");
			if (!/[A-Z]/.test(data.password)) {
				errorToast("Password must contain at least one uppercase letter");
			}
			if (!/[a-z]/.test(data.password)) {
				errorToast("Password must contain at least one lowercase letter");
			}
			return;
		}
		if (!/[A-Z]/.test(data.password)) {
			errorToast("Password must contain at least one uppercase letter");
			if (!/[a-z]/.test(data.password)) {
				errorToast("Password must contain at least one lowercase letter");
			}
			return;
		}
		if (!/[a-z]/.test(data.password)) {
			errorToast("Password must contain at least one lowercase letter");
			return;
		}
		createUserEmailPassword(data.email, data.password)
			.then((userCredential) => {
				// Signed up
				console.log(userCredential);
				customizeProfile(data.name, data.photoUrl)
					.then(() => {
						const createdAt = userCredential.user?.metadata?.creationTime;
						const user_email = userCredential.user.email;
						const firebase_uid = userCredential.user.uid;
						const role = data.role;
						const newUser = {
							user_email,
							firebase_uid,
							role,
							createdAt: createdAt,
						};

						axiosPublic.post("/users", newUser).then((res) => {
							if (res.data.insertedId) {
								console.log("User created successfully");
								reset();
								successToast("Registration Successful");
								window.location.reload();
								navigate("/")
							}
						});
					})
					.catch((error) => {
						console.log(error);
					});

				location.state ? navigate(location.state) : navigate(-1);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				if (error.code === "auth/email-already-in-use") {
					errorToast("Email is already in use");
				}
			});
	};

	if (loading) {
		return (
			<div className="flex justify-center ">
				<Helmet>
					<title>GlobeGuide | Register</title>
				</Helmet>
				<span className="loading loading-spinner loading-lg text-accent-pink "></span>
			</div>
		);
	}

	console.log(watch("role"));
	return (
		<div className="flex-1 flex items-center w-full mt-24 font-roboto">
			<Helmet>
				<title>GlobeGuide | Register</title>
			</Helmet>
			<form
				data-aos="fade-down"
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-theme rounded-2xl md:rounded-3xl"
			>
				<h1 className="text-3xl font-bold text-center text-black font-slab">
					Register
				</h1>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Name</p>
					<input
						{...register("name", { required: true })}
						type="text"
						name="name"
						id="name"
						placeholder="Your Name"
						required
						className="border-b-2 bg-theme2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Role</p>
					<div className="flex gap-4 items-center">
						<input
							{...register("role", { required: true })}
							type="radio"
							value="Customer"
							className="w-4 h-4 radio radio-primary bg-white"
						/>
						<p>Customer</p>
						<input
							{...register("role", { required: true })}
							type="radio"
							value="Seller"
							className="w-4 h-4 radio radio-primary bg-white"
						/>
						<p>Seller</p>
					</div>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Email</p>
					<input
						{...register("email", { required: true })}
						type="email"
						name="email"
						id="email"
						placeholder="Your Email"
						required
						className="border-b-2 bg-theme2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full flex flex-col">
					<p className="text-xl font-semibold text-black mb-2">Photo URL</p>
					<input
						{...register("photoUrl", { required: true })}
						type="text"
						name="photoUrl"
						id="photoUrl"
						placeholder="Photo Url"
						required
						className="border-b-2 bg-theme2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full flex flex-col">
					<p className="text-xl font-semibold text-black mb-2">Password</p>
					<div className="relative">
						<input
							{...register("password", {
								required: true,
							})}
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Your Password"
							required
							className="border-b-2 bg-theme2 border-gray-400 w-full p-2 rounded-xl text-black"
						/>
						{showPassword ? (
							<BsEyeFill
								className="absolute right-4 top-3 cursor-pointer text-black"
								onClick={() => setShowPassword(!showPassword)}
							></BsEyeFill>
						) : (
							<BsEyeSlashFill
								className="absolute right-4 top-3 cursor-pointer text-black"
								onClick={() => setShowPassword(!showPassword)}
							></BsEyeSlashFill>
						)}

						{/* {showPassword ? ():()}
						 */}
					</div>
				</div>
				<input
					type="submit"
					value={"Sign Up"}
					className="btn w-full text-xl border-none bg-theme2 text-black hover:bg-gray-500"
				/>

				<p className="text-black w-full text-center mt-2">
					Already have an account?{" "}
					<Link
						to="/login"
						className="link link-hover text-accent-pink font-bold text-lg "
					>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
