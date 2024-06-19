import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { refetch, data: cart = {} } = useQuery({
		queryKey: ["cart", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/carts?email=${user?.email}`);
			return res.data;
		},
	});

	const changeQuantity = (cartId, type, item) => {
		axiosSecure
			.post(`/carts/change-quantity/${cartId}/${type}`, item)
			.then(() => {
				refetch();
			});
	};

	const clearCart = (cartId) => {
		console.log("clear cart clicked", cartId)
		axiosSecure.delete(`/carts/clear/${cartId}`).then(() => {
			refetch();
		});
	};
	return { cart, refetch, changeQuantity, clearCart };
};

export default useCart;
