import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CreateCategoryModal = ({ refetch }) => {
	const axiosSecure = useAxiosSecure();
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const {
		register,
		handleSubmit,
		// watch,
    reset
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		axiosSecure.post(`/categories`, { ...data, productIds: [] }).then((res) => {
			console.log(res);
			if (res.data.insertedId) {
        reset()
				refetch();
				toast.success("Category Created Successfully");
				document.getElementById("createCategoryModal").close();
			}
		});
	};

	return (
		<dialog id={"createCategoryModal"} className="modal">
			<form
				data-aos="fade-down"
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="modal-box text-left  mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-theme text-black rounded-2xl md:rounded-3xl mt-28"
			>
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
					value={"Create Category"}
					className={`btn w-full text-xl border-none bg-theme2 text-black hover:bg-gray-500 disabled:opacity-100 disabled:cursor-not-allowed`}
				/>
			</form>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default CreateCategoryModal;
