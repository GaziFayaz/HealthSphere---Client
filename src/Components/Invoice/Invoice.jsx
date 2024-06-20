import { Helmet } from "react-helmet-async";
import useOrders from "../../Hooks/useOrders";
import { FaEye } from "react-icons/fa";
import ProductModal from "../Product/ProductModal";
import {
	PDFDownloadLink,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
} from "@react-pdf/renderer";

const Invoice = () => {
	const { orders } = useOrders();
	const date = new Date(orders[0]?.date);
	console.log(orders[0]);

	// Create styles
	const styles = StyleSheet.create({
		page: {
			padding: 30,
			fontSize: 12,
			fontFamily: "Helvetica",
		},
		header: {
			fontSize: 24,
			marginBottom: 20,
			textAlign: "center",
			color: "black",
		},
		section: {
			marginBottom: 10,
		},
		subHeader: {
			fontSize: 16,
			marginBottom: 10,
			color: "black",
		},
		text: {
			marginBottom: 5,
		},
		table: {
			display: "table",
			width: "auto",
			marginTop: 20,
		},
		tableRow: {
			flexDirection: "row",
		},
		tableColHeader: {
			width: "16%",
			borderStyle: "solid",
			borderWidth: 1,
			backgroundColor: "#E0E0E0",
			textAlign: "center",
		},
		tableCol: {
			width: "16%",
			borderStyle: "solid",
			borderWidth: 1,
			textAlign: "center",
		},
		tableCellHeader: {
			margin: 5,
			fontSize: 12,
			fontWeight: "bold",
		},
		tableCell: {
			margin: 5,
			fontSize: 10,
		},
		total: {
			marginTop: 10,
			fontSize: 14,
			textAlign: "right",
		},
		image: {
			width: 20,
			height: 20,
			borderRadius: "50%",
		},
	});

	// Create Document Component
	const MyDocument = () => (
		<Document>
			<Page style={styles.page}>
				<Text style={styles.header}>Invoice</Text>

				<View style={styles.section}>
					<Text style={styles.subHeader}>
						Order ID: pi_3PTqgfErWbVROuct1jll3kSc
					</Text>
					<Text style={styles.text}>Customer Name: pazi ahmed</Text>
					<Text style={styles.text}>Customer Phone: 01536100483</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.text}>Order Date: Fri Jun 21 2024</Text>
					<Text style={styles.text}>Customer Email: pazi@pazi.com</Text>
					<Text style={styles.text}>Customer Address: asdfasdfasdf</Text>
				</View>

				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Medicine</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Type</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Dosage Form</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Manufacturer</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Price</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Quantity</Text>
						</View>
					</View>

					{orders[0]?.items.map((medicine, index) => {
						return (
							<View key={index} style={styles.tableRow}>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>{medicine.medicine_name}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>{medicine.generic_name}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>{medicine.category_name}</Text>
									<Text style={styles.tableCell}>{medicine.strength}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>
										{medicine.manufacturer_name}
									</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>
										{medicine.unit_prices[0].price}
									</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>{medicine.quantity}</Text>
								</View>
							</View>
						);
					})}
				</View>
				<Text style={styles.total}>
					Total Price:{" "}
					{parseFloat(
						orders[0]?.items
							.reduce((acc, item) => {
								return acc + item.unit_prices[0].price * item.quantity;
							}, 0)
							.toFixed(2)
					)}
				</Text>
			</Page>
		</Document>
	);

	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Invoice</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Invoice
			</h1>
			<div className="grid grid-cols-2 gap-4 mb-20">
				<p className="text-2xl text-gray-300">
					<span className="font-semibold text-theme">Order ID:</span>{" "}
					{orders[0]?.transaction_id}
				</p>
				<p className="text-2xl text-gray-300">
					<span className="font-semibold text-theme">Order Date:</span>{" "}
					{date.toDateString()}
				</p>
				<p className="text-2xl text-gray-300">
					<span className="font-semibold text-theme">Customer Name:</span>{" "}
					{orders[0]?.name}
				</p>
				<p className="text-2xl text-gray-300">
					<span className="font-semibold text-theme">Customer Email:</span>{" "}
					{orders[0]?.email}
				</p>
				<p className="text-2xl text-gray-300">
					<span className="font-semibold text-theme">Customer Phone:</span>{" "}
					{orders[0]?.number}
				</p>
				<p className="text-2xl text-gray-300">
					<span className="font-semibold text-theme">Customer Address:</span>{" "}
					{orders[0]?.address}
				</p>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra text-center">
					{/* head */}
					<thead className="lg:text-xl font-slab align-text-top">
						<tr>
							<th></th>
							<th>
								<div className="font-bold">Medicine</div>
								<div className="text-sm opacity-50">Type</div>
							</th>
							<th>Dosage Form</th>
							<th>Manufacturer</th>
							<th>Price</th>
							<th>Details</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{orders[0]?.items.map((medicine, index) => {
							return (
								<tr key={index}>
									<td>
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
									</td>
									<td>
										<div className="flex-grow">
											<div className="font-bold">{medicine.medicine_name}</div>
											<div className="text-sm opacity-50">
												{medicine.generic_name}
											</div>
										</div>
									</td>
									<td className="font-bold">
										{medicine.category_name}
										<br />
										<span className="badge badge-ghost badge-sm">
											{medicine.strength}
										</span>
									</td>
									<td className="font-bold">{medicine.manufacturer_name}</td>
									<td className="font-bold">
										Tk. {medicine.unit_prices[0].price}
									</td>
									<td>
										<div className="h-full flex gap-10 justify-center items-center">
											<FaEye
												className="text-theme hover:text-theme2 text-2xl cursor-pointer"
												data-tooltip-id="my-tooltip"
												data-tooltip-content="See Details"
												data-tooltip-place="bottom"
												onClick={() => {
													// console.log(`getting clicked for id ${index}`)
													document.getElementById(`modal${index}`).showModal();
												}}
											/>
											<ProductModal
												modalId={`modal${index}`}
												modalData={medicine}
											></ProductModal>
										</div>
									</td>
									<td className="font-bold">{medicine.quantity}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div>
					<p className="text-right mt-5">
						Total Price: Tk.
						{parseFloat(
							orders[0]?.items
								.reduce((acc, item) => {
									return acc + item.unit_prices[0].price * item.quantity;
								}, 0)
								.toFixed(2)
						)}
					</p>
				</div>
				<div className="flex gap-6 justify-end mt-5">
					<button className="btn bg-green-500 text-white text-lg  hover:bg-green-700">
						<PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
							{({ loading }) =>
								loading ? "Loading document..." : "Download Invoice"
							}
						</PDFDownloadLink>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Invoice;
