import { useState } from "react";
import useOrders from "../../Hooks/useOrders";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
	const { orders } = useOrders();
	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Payment History</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Payment History
			</h1>

			<div className="overflow-x-auto">
				<table className="table table-zebra text-center">
					{/* head */}
					<thead className="lg:text-xl font-slab align-text-top">
						<tr>
							<th>Date</th>
							<th>Total Price</th>
							<th>Transaction ID</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{orders.map((order, index) => {
								return (
									<tr key={index}>
										<td>{order.date}</td>
										<td className="font-bold">{order.price}</td>
										<td className="font-bold">{order.transaction_id}</td>
										<td className="font-bold">
											{order.status}
										</td>
									</tr>
								);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;
