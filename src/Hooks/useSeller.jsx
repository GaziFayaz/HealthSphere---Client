import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useSeller = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: isSeller, isPending: isSellerPending } = useQuery({
    queryKey: [ 'isSeller' ],
    enabled: !loading,
    queryFn: async () => {
      console.log('checking if user is seller', user)
      if(user){
      const res = await axiosSecure.get(`/users/seller/${user?.email}`);
            // console.log(res.data);
            return res.data?.seller;
      }
			return false
    }
  })
  return [isSeller, isSellerPending]
}

export default useSeller