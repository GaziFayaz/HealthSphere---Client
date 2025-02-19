import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerDashboard = () => {
	const activeLinkAttr =
		"bg-gray-100 dark:bg-gray-800  dark:text-gray-200 text-gray-700";

	return (
		<div className="flex min-h-screen">
			<aside className="min-w-24 flex flex-col w-64 min-h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
				<div className="flex flex-col justify-between flex-1 mt-6">
					<nav>
						<NavLink
							to="/"
							className="flex items-center px-4 py-2 rounded-md"
							href="#"
						>
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<span className="hidden md:inline mx-4 font-medium">Home</span>
						</NavLink>

						<NavLink
							to="/dashboard/payment-history"
							className={({ isActive }) =>
								`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
									isActive ? activeLinkAttr : ""
								}`
							}
							href="#"
						>
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<span className="hidden md:inline mx-4 font-medium">
								Payment History
							</span>
						</NavLink>
					</nav>
				</div>
			</aside>
			<Outlet></Outlet>
			<ToastContainer />
		</div>
	);
};

export default CustomerDashboard;
