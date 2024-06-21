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
			console.log("checking if user is customer", user.email);
      if(user){
        const res = await axiosSecure.get(`/users/customer/${user?.email}`);
			// console.log(res.data);
			return res.data?.customer;
      }
			return false
		},
	});
	console.log("is customer", isCustomer);
	return [isCustomer, isCustomerPending];
};

export default useCustomer;
