import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useCategories from "../../Hooks/useCategories";

const CreateMedicineModal = ({ refetch }) => {
	const { categories } = useCategories();
	const axiosSecure = useAxiosSecure();
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const {
		register,
		handleSubmit,
		// watch,
		reset,
	} = useForm();

	// console.log(watch("categoryName"))

	const onSubmit = (data) => {
		console.log(data);
    const medicineData = {
      medicine_image: data.image_url,
      medicine_name: data.medicineName,
      category_name: data.categoryName,
      generic_name: data.genericName,
      strength: data.strength,
      discount_type: data.discountType,
      discount_value: data.discountValue,
      unit_prices: [{price: data.price, unit: data.unit}]
    }
		axiosSecure.post(`/products`, { ...medicineData, productIds: [] }).then((res) => {
			console.log(res);
			if (res.data.insertedId) {
				refetch();
				reset();
				toast.success("Medicine Created Successfully");
				document.getElementById("createMedicineModal").close();
			}
		});
	};

	return (
		<dialog id={"createMedicineModal"} className="modal">
			<form
				data-aos="fade-down"
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="modal-box text-left  mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-theme text-black rounded-2xl md:rounded-3xl mt-28"
			>
				<div className="w-full flex flex-col">
					<p className="text-xl font-semibold text-black mb-2">Image URL</p>
					<input
						{...register("image_url", { required: true })}
						type="text"
						name="image_url"
						id="image_url"
						placeholder="Image URL"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Medicine Name</p>
					<input
						{...register("medicineName", { required: true })}
						type="text"
						name="medicineName"
						id="medicineName"
						placeholder="Medicine Name"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Category Name</p>
					<select
						{...register("categoryName", { required: true })}
						name="categoryName"
						id="categoryName"
						className="bg-white border-b-2 border-gray-400 w-full p-2 rounded-xl"
						defaultValue=""
					>
						<option value="" disabled>
							Select Option
						</option>
						{categories.map((category, index) => {
							return (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Generic Name</p>
					<input
						{...register("genericName", { required: true })}
						type="text"
						name="genericName"
						id="genericName"
						placeholder="Generic Name"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Strength</p>
					<input
						{...register("strength", { required: true })}
						type="text"
						name="strength"
						id="strength"
						placeholder="Medicine Strength"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Discount Type</p>
					<input
						{...register("discountType")}
						type="text"
						name="discountType"
						id="discountType"
						placeholder="Discount Type"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">
						Discount Value
					</p>
					<input
						{...register("discountValue")}
						type="number"
						name="discountValue"
						id="discountValue"
						placeholder="Discount Value"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Price</p>
					<input
						{...register("price", { required: true })}
						type="number"
						name="price"
						id="price"
						placeholder="Price Per Unit"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-black mb-2">Unit</p>
					<input
						{...register("unit", { required: true })}
						type="text"
						name="unit"
						id="unit"
						placeholder="Unit Type"
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>

				<input
					type="submit"
					value={"Create Medicine"}
					className={`btn w-full text-xl border-none bg-theme2 text-black hover:bg-gray-500 disabled:opacity-100 disabled:cursor-not-allowed`}
				/>
			</form>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default CreateMedicineModal;
