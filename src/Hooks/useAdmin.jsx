import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useAdmin = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: isAdmin, isPending: isAdminPending } = useQuery({
		queryKey: ["isAdmin"],
		enabled: !loading,
		queryFn: async () => {
			console.log("checking if user is admin", user);
			if (user) {
				const res = await axiosSecure.get(`/users/admin/${user?.email}`);
				// console.log(res.data);
				return res.data?.admin;
			}
			return false;
		},
	});
	return [isAdmin, isAdminPending];
};

export default useAdmin;
