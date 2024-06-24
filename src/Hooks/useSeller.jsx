import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useSeller = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: isSeller, isPending: isSellerPending, refetch } = useQuery({
    queryKey: [user?.email,  'isSeller' ],
    enabled: !loading,
    queryFn: async () => {
      if(user){
      const res = await axiosSecure.get(`/users/seller/${user?.email}`);
            return res.data?.seller;
      }
			return false
    }
  })
  return [isSeller, isSellerPending, refetch]
}

export default useSeller