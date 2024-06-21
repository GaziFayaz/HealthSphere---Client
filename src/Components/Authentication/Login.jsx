import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithubAlt, FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	const successToast = (message) =>
		toast.success(message, { position: "bottom-right" });
	const errorToast = (message) =>
		toast.error(message, { position: "bottom-right" });
	const {
		user,
		loading,
		setLoading,
		signInEmailPassword,
		signInGoogle,
		signInGithub,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const axiosPublic = useAxiosPublic();

	const [showPassword, setShowPassword] = useState(false);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		signInEmailPassword(data.email, data.password)
			.then((userCredential) => {
				// console.log(userCredential);
				successToast("Login Successful");
				location.state ? navigate(location.state) : navigate(-1);
			})
			.catch((error) => {
				setLoading(false);
				if (error.code === "auth/invalid-credential") {
					errorToast("Invalid email or password");
				}
				// console.log(error);
			});
	};

	const loginUsingGoogle = () => {
		signInGoogle()
			.then((userCredential) => {
				successToast("Login Successful");
				const createdAt = userCredential.user?.metadata?.creationTime;
				const user_email = userCredential.user.email;
				const firebase_uid = userCredential.user.uid;
				const role = "Customer";
				const newUser = {
					user_email,
					firebase_uid,
					role,
					createdAt: createdAt,
				};
				axiosPublic.post("/users", newUser);
			})
			.catch((error) => {
				// // Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// // The email of the user's account used.
				// const email = error.customData.email;
				// // The AuthCredential type that was used.
				// const credential = GoogleAuthProvider.credentialFromError(error);
				// // ...
				setLoading(false);

				if (error.code === "auth/account-exists-with-different-credential") {
					errorToast("Email is already in use");
				}
			});
	};

	const loginUsingGithub = () => {
		signInGithub()
			.then((userCredential) => {
				successToast("Login Successful");
				const createdAt = userCredential.user?.metadata?.creationTime;
				const user_email = userCredential.user.email;
				const firebase_uid = userCredential.user.uid;
				const role = "Customer";
				const newUser = {
					user_email,
					firebase_uid,
					role,
					createdAt: createdAt,
				};
				axiosPublic.post("/users", newUser);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				if (error.code === "auth/account-exists-with-different-credential") {
					errorToast("Email is already in use");
				}
			});
	};

	if (loading) {
		return (
			<div className="flex justify-center ">
				<Helmet>
					<title>HealthSphere | Login</title>
				</Helmet>
				<span className="loading loading-spinner loading-lg text-accent-pink "></span>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex-1 flex items-center w-full mt-24 font-roboto">
				<Helmet>
					<title>HealthSphere | Login</title>
				</Helmet>
				<form
					data-aos="fade-down"
					onSubmit={handleSubmit(onSubmit)}
					action=""
					className="mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-theme rounded-2xl md:rounded-3xl text-black"
				>
					<h1 className="text-3xl font-bold text-center text-black font-slab">
						Login
					</h1>
					<div className="w-full">
						<p className="text-xl font-semibold text-black mb-2">Email</p>
						<input
							{...register("email", { required: true })}
							type="email"
							name="email"
							id="email"
							placeholder="Your Email"
							className="border-b-2 bg-white border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
					<div className="w-full flex flex-col">
						<p className="text-xl font-semibold text-black mb-2">Password</p>
						<div className="relative">
							<input
								{...register("password", { required: true })}
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								placeholder="Your Password"
								className="border-b-2 border-gray-400 w-full p-2 rounded-xl bg-white"
							/>
							{showPassword ? (
								<BsEyeFill
									className="absolute right-4 top-3 cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								></BsEyeFill>
							) : (
								<BsEyeSlashFill
									className="absolute right-4 top-3 cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								></BsEyeSlashFill>
							)}
						</div>

						<a className="text-sm text-gray-300 self-end link-hover mt-1">
							Forgot Password?
						</a>
					</div>
					<input
						type="submit"
						value={"Login"}
						className="btn w-full text-xl border-none bg-theme2 text-black hover:bg-gray-500"
					/>
					<p className="text-black font-semibold">Or Sign In using</p>
					<div className="flex gap-8">
						<FaGoogle
							onClick={() => loginUsingGoogle()}
							className="text-3xl text-black cursor-pointer hover:text-black"
						/>
						<FaGithubAlt
							onClick={() => loginUsingGithub()}
							className="text-4xl text-black cursor-pointer hover:text-black"
						/>
					</div>
					<p className="text-black w-full text-right mt-4">
						New here?{" "}
						<Link
							to="/register"
							className="link link-hover text-accent-pink font-bold text-lg "
						>
							Register
						</Link>
					</p>
				</form>
			</div>
		);
	} else {
		navigate("/");
	}
};

export default Login;
