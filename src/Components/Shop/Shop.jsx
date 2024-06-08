import { FaEye } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ProductModal from "../Product/ProductModal";

const Shop = () => {
	const medicines = [
		{
			generic_name: "Paracetamol",
			medicine_name: "Tylenol",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "500 mg",
			manufacturer_name: "Johnson & Johnson",
			instructions:
				"Take 1 tablet every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
		},
		{
			generic_name: "Ibuprofen",
			medicine_name: "Advil",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "200 mg",
			manufacturer_name: "Pfizer",
			instructions:
				"Take 1-2 tablets every 4-6 hours as needed. Do not exceed 6 tablets in 24 hours.",
		},
		{
			generic_name: "Cetirizine",
			medicine_name: "Zyrtec",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "10 mg",
			manufacturer_name: "McNeil Consumer Healthcare",
			instructions:
				"Take 1 tablet once daily. Do not exceed 1 tablet in 24 hours.",
		},
		{
			generic_name: "Amoxicillin",
			medicine_name: "Amoxil",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Capsule",
			strength: "500 mg",
			manufacturer_name: "GlaxoSmithKline",
			instructions:
				"Take 1 capsule every 8 hours. Complete the full course as prescribed by your doctor.",
		},
		{
			generic_name: "Lisinopril",
			medicine_name: "Zestril",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "20 mg",
			manufacturer_name: "AstraZeneca",
			instructions:
				"Take 1 tablet once daily. Consult your doctor for the duration of treatment.",
		},
		{
			generic_name: "Metformin",
			medicine_name: "Glucophage",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "500 mg",
			manufacturer_name: "Bristol-Myers Squibb",
			instructions:
				"Take 1 tablet twice daily with meals. Follow your doctor's instructions.",
		},
		{
			generic_name: "Simvastatin",
			medicine_name: "Zocor",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "20 mg",
			manufacturer_name: "Merck & Co.",
			instructions:
				"Take 1 tablet in the evening. Follow your doctor's instructions.",
		},
		{
			generic_name: "Omeprazole",
			medicine_name: "Prilosec",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Capsule",
			strength: "20 mg",
			manufacturer_name: "AstraZeneca",
			instructions:
				"Take 1 capsule daily before a meal. Follow your doctor's instructions.",
		},
		{
			generic_name: "Levothyroxine",
			medicine_name: "Synthroid",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "50 mcg",
			manufacturer_name: "AbbVie",
			instructions:
				"Take 1 tablet daily on an empty stomach, 30 minutes before breakfast. Follow your doctor's instructions.",
		},
		{
			generic_name: "Azithromycin",
			medicine_name: "Zithromax",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "250 mg",
			manufacturer_name: "Pfizer",
			instructions:
				"Take 2 tablets on the first day, followed by 1 tablet daily for the next 4 days. Follow your doctor's instructions.",
		},
		{
			generic_name: "Amlodipine",
			medicine_name: "Norvasc",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Tablet",
			strength: "5 mg",
			manufacturer_name: "Pfizer",
			side_effects: ["Swelling", "Fatigue", "Dizziness"],
			instructions:
				"Take 1 tablet once daily. Consult your doctor for the duration of treatment.",
		},
		{
			generic_name: "Esomeprazole",
			medicine_name: "Nexium",
			unit_prices: [
				{
					unit: "piece",
					unit_size: 1,
					price: 7,
				},
			],
			category_name: "Capsule",
			strength: "20 mg",
			manufacturer_name: "AstraZeneca",
			side_effects: ["Headache", "Diarrhea", "Nausea"],
			instructions:
				"Take 1 capsule daily at least one hour before a meal. Follow your doctor's instructions.",
		},
	];

	return (
		<div className="w-full mt-24">
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Shop
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
						{medicines.map((medicine, index) => {
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
											<MdOutlineAddShoppingCart
												className="text-theme hover:text-theme2 text-2xl cursor-pointer"
												data-tooltip-id="my-tooltip"
												data-tooltip-content="Add to Cart"
												data-tooltip-place="bottom"
											/>
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

export default Shop;
