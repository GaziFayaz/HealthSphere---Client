import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useCustomer = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: isCustomer, isPending: isCustomerPending } = useQuery({
    queryKey: [ 'isCustomer' ],
    enabled: !loading,
    queryFn: async () => {
      console.log('checking if user is customer', user)
      const res = await axiosSecure.get(`/users/role`);
      if( res.data.role === 'Customer') {
        return true
      } else {
        return false
      }
    }
  })
  return [isCustomer, isCustomerPending]
}

export default useCustomer