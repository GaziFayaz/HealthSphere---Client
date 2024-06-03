import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
	return (
		<div className="min-h-screen flex flex-col relative text-white">
			<div className="w-full top-0 z-40">
				<Navbar></Navbar>
			</div>
			<div className="mx-12 md:mx-24 lg:mx-32">
				<Outlet></Outlet>
				<ToastContainer />
			</div>
			{/* <Footer></Footer> */}
		</div>
	);
};

export default Root;
