import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
	withCredentials: true
})

const useAxiosSecure = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	// intercepts 401 and 403 status codes
	axiosSecure.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const status = error.response?.status;

			// for 401 and 403 logout the user and move the user to the login page
			if (status === 401 || status === 403) {
				await logout();
				navigate("/login");
			}
		}
	);

	return axiosSecure;
};

export default useAxiosSecure;
