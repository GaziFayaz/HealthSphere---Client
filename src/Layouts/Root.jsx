import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Shared/Navbar";

const Root = () => {
	return (
		<div className={`min-h-screen flex flex-col relative`}>
			<div className="absolute w-full top-0 z-40">
				<Navbar></Navbar>
			</div>
			<div>
				<Outlet></Outlet>
				<ToastContainer />
			</div>
			{/* <Footer></Footer> */}
		</div>
	);
};

export default Root;
