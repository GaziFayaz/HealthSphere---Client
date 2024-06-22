import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateCategoryModal = ({ category, modalId, refetch }) => {
	const axiosSecure = useAxiosSecure();
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const {
		register,
		handleSubmit,
		// watch,
		formState: { isDirty },
	} = useForm({
		defaultValues: { name: category.name, image_url: (category.image_url? category.image_url : "")},
	});

	const onSubmit = (data) => {
		console.log(data);
		axiosSecure.post(`/update-categories/${category._id}`, data)
		.then(res => {
			console.log(res)
			refetch();
			document.getElementById(modalId).close();
		})
	};

	return (
		<dialog id={modalId} className="modal">
			{/* <div className="modal-box w-11/12 max-w-3xl text-left  flex-1 flex items-center"> */}
				<form
					data-aos="fade-down"
					onSubmit={handleSubmit(onSubmit)}
					action=""
					className="modal-box text-left  mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-theme text-black rounded-2xl md:rounded-3xl mt-28"
				>
					<img
						src={category.image_url ? category.image_url : ""}
						className="rounded-full w-1/3 aspect-square object-cover"
					/>
					<div className="w-full">
						<p className="text-xl font-semibold text-black mb-2">Name</p>
						<input
							{...register("name")}
							type="text"
							name="name"
							id="name"
							placeholder="Category Name"
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
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
					<input
						type="submit"
						value={"Update Category"}
						disabled={!isDirty}
						className={`btn w-full text-xl border-none bg-theme2 text-black hover:bg-gray-500 disabled:opacity-100 disabled:cursor-not-allowed`}
					/>
					{!isDirty && (
						<p className="text-red-600">Make Changes to Update Category</p>
					)}
				</form>
			{/* </div> */}
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default UpdateCategoryModal;
