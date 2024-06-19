import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import ProductModal from "../../Product/ProductModal";
import { FaEye } from "react-icons/fa";
import AddToCartButton from "../../Cart/AddToCartButton";
import { Helmet } from "react-helmet-async";

const CategoryDetails = () => {
	const axiosPublic = useAxiosPublic();
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState({});

	useEffect(() => {
		axiosPublic.get(`/categories/${slug}`).then((res) => {
			setCategory(res.data);
			setLoading(false);
		});
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | {category.name}</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-3xl lg:text-4xl font-slab font-bold text-theme2 text-center ">
				{category.name}
			</h1>
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
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{category.categoryProducts.map((medicine, index) => {
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
											<AddToCartButton product={medicine}></AddToCartButton>
											<ProductModal
												modalId={`modal${index}`}
												modalData={medicine}
											></ProductModal>
										</div>
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

export default CategoryDetails;
