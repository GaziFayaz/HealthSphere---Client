import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useOrders = () => {

  const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { refetch, data: orders = [] } = useQuery({
		queryKey: ["orders", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/orders`);
			return res.data;
		},
	});
  return { orders, refetch };
};

export default useOrders;