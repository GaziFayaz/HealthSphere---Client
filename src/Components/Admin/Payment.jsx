import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const Payment = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/orders/all").then((res) => {
      console.log(res.data)
      setOrders(res.data)
    })
  },[])

  const handleAcceptPayment = (id) => {
    axiosSecure.patch(`update-payment-status/${id}`)
    .then(res => {
      if(res.data.modifiedCount){
        setOrders(orders.map(order => {
          if(order._id === id){
            order.status = "paid"
          }
          return order
        }))
      }
    })
  }

  console.log(orders)
	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Manage Payments</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Payments
			</h1>
			<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
				<Tabs className="w-full">
					<TabList className="flex border-b-2 justify-around">
						<Tab className="text-2xl w-40 btn">Pending</Tab>
						<Tab className="text-2xl w-40 btn">Paid</Tab>
					</TabList>

					<TabPanel>
						<div className="overflow-x-auto">
							<table className="table table-zebra text-center">
								{/* head */}
								<thead className="lg:text-xl font-slab align-text-top">
									<tr>
										<th>Order ID</th>
										<th>Customer</th>
										<th>Price</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody className="lg:text-lg font-roboto text-gray-300">
									{orders.map((order, index) => {
                    if(order.status === "pending")
										return (
											<tr key={index}>
												<td className="font-bold">{order.transaction_id}</td>
												<td className="font-bold">
													{order.name}
												</td>
												<td className="font-bold">
													{order.price}
												</td>
												<td>
														<button
															className="btn bg-green-500 text-white"
															onClick={() => {handleAcceptPayment(order._id)}}
														>
															Accept Payment
														</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="overflow-x-auto">
							<table className="table table-zebra text-center">
								{/* head */}
								<thead className="lg:text-xl font-slab align-text-top">
									<tr>
										<th>Order ID</th>
										<th>Customer</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody className="lg:text-lg font-roboto text-gray-300">
									{orders.map((order, index) => {
                    if(order.status === "paid")
										return (
											<tr key={index}>
												<td className="font-bold">{order.transaction_id}</td>
												<td className="font-bold">
													{order.name}
												</td>
												<td className="font-bold">
													{order.price}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default Payment;
