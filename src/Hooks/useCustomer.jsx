import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCustomer = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: isCustomer, isPending: isCustomerPending } = useQuery({
		queryKey: [user?.email, "isCustomer"],
		enabled: !loading,
		queryFn: async () => {
      if(user){
        const res = await axiosSecure.get(`/users/customer/${user?.email}`);
			return res.data?.customer;
      }
			return false
		},
	});
	return [isCustomer, isCustomerPending];
};

export default useCustomer;
