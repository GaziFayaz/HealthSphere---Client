import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCategories = () => {
	const axiosSecure = useAxiosSecure();
	const { refetch, data: categories = [] } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = await axiosSecure.get(`/categories`);
			return res.data;
		},
	});
return { categories, refetch };
};

export default useCategories;
