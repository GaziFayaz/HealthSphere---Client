
const Product = ({product}) => {
	return (
		<div>
			<div className="card bg-base-100 shadow-xl">
				<figure>
					<img
						src={product.medicine_image? product.medicine_image : ""}
						alt="Discounted Medicine"
						className="min-h-[250px] max-h-[250px] object-cover"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{product.medicine_name}</h2>
					<div className="card-actions justify-end">
						<button className="p-4 rounded-xl text-black font-bold bg-theme">{product.discount_value}%</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
