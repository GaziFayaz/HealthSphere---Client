import { Helmet } from "react-helmet-async";
import useCategories from "../../Hooks/useCategories";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Category = () => {
	const { categories, refetch } = useCategories();
	console.log(categories);
	const axiosSecure = useAxiosSecure();

	const handleDelete = (id) => {
		axiosSecure.delete(`/categories/${id}`).then((res) => {
			console.log(res);
			refetch();
			if (res.data.deletedCount) {
				toast.success("Category Deleted!", {
					position: "bottom-left",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	};

	return (
		<div className="w-full mt-24">
			<Helmet>
				<title>HealthSphere | Manage Category</title>
			</Helmet>
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Categories
			</h1>
			<div className="w-full flex justify-end">
				<button
					className="btn bg-green-500 text-white md:mr-10 lg:mr-32"
					onClick={() => {
						// console.log(`getting clicked for id ${index}`)
						document.getElementById(`createCategoryModal`).showModal();
					}}
				>
					Create Category
				</button>
				<CreateCategoryModal refetch={refetch}></CreateCategoryModal>
			</div>

			<div className="overflow-x-auto">
				<table className="table table-zebra text-center">
					{/* head */}
					<thead className="lg:text-xl font-slab align-text-top">
						<tr>
							<th></th>
							<th>Name</th>
							<th>Products in Category</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="lg:text-lg font-roboto text-gray-300">
						{categories.map((category, index) => {
							return (
								<tr key={index}>
									<td>
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={category.image_url ? category.image_url : ""}
													alt="category"
												/>
											</div>
										</div>
									</td>
									<td className="font-bold">{category.name}</td>
									<td className="font-bold">{category.productIds.length}</td>
									<td>
										<div className="h-full flex gap-10 justify-center items-center">
											<button
												className="btn bg-green-500 text-white"
												onClick={() => {
													// console.log(`getting clicked for id ${index}`)
													document.getElementById(`modal${index}`).showModal();
												}}
											>
												Update
											</button>
											<button className="btn bg-red-500 text-white"
                      onClick={() => {handleDelete(category._id)}}>
												Delete
											</button>
											<UpdateCategoryModal
												modalId={`modal${index}`}
												category={category}
												refetch={refetch}
											></UpdateCategoryModal>
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

export default Category;
