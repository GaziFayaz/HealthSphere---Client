import { MdOutlineAddShoppingCart } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddToCartButton = ({ product }) => {
	const axiosSecure = useAxiosSecure();

	const handleAddToCart = (product) => {
		console.log(product);

		// Add product to cart
		axiosSecure.post("/carts", product)
    .then(res => {
      console.log(res.data)
      // if(res?.data.inserted)
    });
	};

	return (
		<MdOutlineAddShoppingCart
			className="text-theme hover:text-theme2 text-2xl cursor-pointer"
			data-tooltip-id="my-tooltip"
			data-tooltip-content="Add to Cart"
			data-tooltip-place="bottom"
			onClick={() => handleAddToCart(product)}
		/>
	);
};

export default AddToCartButton;
