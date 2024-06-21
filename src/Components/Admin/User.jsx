import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { BiChevronDown } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";

const User = () => {
	const [users, setUsers] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		axiosSecure.get("/users").then((res) => {
			setUsers(res.data);
		});
	}, [axiosSecure]);

  const changeRole = (user_email, role) => {
    axiosSecure.post("/users/change-role", { user_email, role})
    .then(() => {
      window.location.reload()
    })
  }

	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Manage Users</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Manage Users
			</h1>
			<div className="overflow-x-auto">
				<table className="table table-zebra text-center">
					{/* head */}
					<thead className="lg:text-xl font-slab align-text-top">
						<tr>
							<th></th>
							<th>User Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{users.map((user, index) => {
							if (user.role !== "Admin") {
								return (
									<tr key={index}>
										<td></td>
										<td className="font-bold">{user.user_email}</td>
										<td className="font-bold">{user.role}</td>
										<td className="font-bold">
											<div className="dropdown">
												<div
													tabIndex={0}
													role="button"
													className="btn m-1 w-32 bg-theme text-black flex hover:bg-gray-400"
												>
													<p>{user.role}</p>{" "}
													<div>
														<FaChevronDown></FaChevronDown>
													</div>
												</div>
												<ul
													tabIndex={0}
													className="dropdown-content z-[1] menu p-2 shadow bg-theme2 text-black rounded-box w-32"
												>
													{(user.role === "Seller" ||
														user.role === "Customer") && (
														<li>
															<button onClick={() => {changeRole(user.user_email, "Admin")}}>Admin</button>
														</li>
													)}
													{user.role === "Customer" && (
														<li>
															<button onClick={() => {changeRole(user.user_email, "Seller")}}>Seller</button>
														</li>
													)}
													{(user.role === "Seller") && (<li>
														<button onClick={() => {changeRole(user.user_email, "Customer")}}>Customer</button>
													</li>)}
												</ul>
											</div>
										</td>
									</tr>
								);
							}
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default User;
