import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/logo-no-background.svg";
import { FaShoppingCart } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import useAdmin from "../../Hooks/useAdmin";
import useCustomer from "../../Hooks/useCustomer";
import useSeller from "../../Hooks/useSeller";

const Navbar = () => {
	const { user, loading, logout } = useContext(AuthContext);
	const [isAdmin, isAdminPending] = useAdmin();
	console.log(isAdmin, isAdminPending)
	const [isCustomer, isCustomerPending] = useCustomer();
	const [isSeller, isSellerPending] = useSeller();

	const activeLinkAttr = "bg-black text-white rounded-lg";
	if (loading || isAdminPending || isCustomerPending || isSellerPending) {
		return <div className="navbar"></div>;
	}

	const routeItems = (
		<>
			<li className="h-full text-xl">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? activeLinkAttr : "")}
				>
					Home
				</NavLink>
			</li>
			<li className="h-full text-xl">
				<NavLink
					to="/shop"
					className={({ isActive }) => (isActive ? activeLinkAttr : "")}
				>
					Shop
				</NavLink>
			</li>
			<li className="h-full p-2">
				<NavLink
					to="/cart"
					className={({ isActive }) =>
						(isActive ? activeLinkAttr : "") + "px-0"
					}
				>
					<FaShoppingCart className="text-2xl" />
				</NavLink>
			</li>
			<li className="h-full">
				<details>
					<summary>
						<IoLanguage className="text-2xl" />
					</summary>
					<ul className="p-2 bg-white rounded-xl text-black">
						<li>
							<a>English</a>
						</li>
						<li>
							<a>Bangla</a>
						</li>
					</ul>
				</details>
			</li>
		</>
	);

	return (
		<div className="navbar text-white font-slab bg-theme flex">
			<Tooltip id="my-tooltip" />
			<div className="navbar-start w-auto">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="lg:hidden ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#000000"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="z-50 menu menu-md  dropdown-content mt-3 p-2 shadow bg-gray-900 rounded-box w-40"
					>
						{routeItems}
						{user ? (
							<></>
						) : (
							<>
								<li className="h-full">
									<NavLink
										to="/login"
										className={`${({ isActive }) =>
											isActive ? activeLinkAttr : ""} focus:text-white`}
									>
										Join Us
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
				<Link to={"/"}>
					<img className="ml-4 w-52" src={logo} alt="" />
				</Link>
			</div>
			<div className="navbar-end w-full hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-lg h-full items-center font-slab font-bold text-defaultBg">
					{routeItems}
					{user ? (
						<></>
					) : (
						<>
							<li className="h-full text-xl bg-theme2 rounded-lg">
								<NavLink
									to="/login"
									className={({ isActive }) => (isActive ? activeLinkAttr : "")}
								>
									Join Us
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
			{user ? (
				<div className="flex-1 justify-end">
					<div
						className=" h-full "
						data-tooltip-id="my-tooltip"
						data-tooltip-content={user.displayName}
						data-tooltip-place="bottom-start"
					>
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img alt="profile" src={user.photoURL} />
								</div>
							</div>
							<ul
								tabIndex={0}
								className="mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-theme2 rounded-box text-black font-bold"
							>
								<li>
									<Link to={"/update-profile"} className="text-lg text-nowrap">
										Update Profile
									</Link>
								</li>
								{user && isAdmin && (
									<li>
										<Link to={"/admin-dashboard"} className="text-lg text-nowrap">Admin Dashboard</Link>
									</li>
								)}
								{user && isSeller && (
									<li>
										<Link className="text-lg text-nowrap">Seller Dashboard</Link>
									</li>
								)}
								{user && isCustomer && (
									<li>
										<Link className="text-lg">Dashboard</Link>
									</li>
								)}

								<li>
									<Link to={"/"} className="text-lg" onClick={() => logout()}>
										Logout
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Navbar;
