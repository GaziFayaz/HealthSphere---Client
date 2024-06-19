import { MdOutlineAddShoppingCart } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddToCartButton = ({ product }) => {
	const axiosSecure = useAxiosSecure();

	const handleAddToCart = (product) => {
		console.log(product);

		// Add product to cart
		axiosSecure.post("/carts", product)
    .then(res => {
      console.log(res.data)
      if(res?.data.modifiedCount || res?.data.insertedId){
				toast.success("Product added to cart successfully!", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			}
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
