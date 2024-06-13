import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Categories = () => {
	const axiosPublic = useAxiosPublic();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axiosPublic.get("/categories")
		.then(res => {
			setCategories(res.data)
		})
	}, [])
	
	return (
		<div className="w-full mt-24">
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Categories
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-x-6 md:gap-y-5 lg:gap-x-10 lg:gap-y-5">
				{categories.map((category, index) => {
					return (
						<Link 
            key={index} to={`/categories/${category.slug}`}>
							<div
								className="card card-compact shadow-xl bg-theme relative"
							>
								<figure>
									<img
										src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
										alt="Shoes"
									/>
								</figure>
								<div className="flex justify-center items-center">
									<div className="card-body text-gray-900 w-full">
										<h2 className=" font-bold font-slab text-lg md:text-2xl lg:text-2xl w-full">
											{category.name}
										</h2>
									</div>
									<div className="medicines-in-category text-nowrap mr-4 font-medium font-roboto md:text-lg lg:text-xl bg-theme2 rounded-lg p-2 md:p-3 lg:p-2 text-orange-500">
										{category.productIds.length} Items
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Categories;
