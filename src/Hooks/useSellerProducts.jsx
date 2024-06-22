import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSellerProducts = () => {
  const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { refetch, data: products = [] } = useQuery({
		queryKey: ["sellerProducts", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/seller-products`);
			return res.data;
		},
	});
  return { products, refetch };
}

export default useSellerProducts