import { logindetails } from "@/app/login/page"
import { SignupDetails } from "@/app/signup/page"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationKey: ['user-signup'],
    mutationFn: (payload: SignupDetails) => axios.post('http://localhost:8000/auth/createuser', payload, { withCredentials: true }),
    onMutate: () => toast.loading("Creatign profile", { id: '2' }),
    onError: () => toast.error("Error while creating", { id: '2' }),
    onSuccess: () => toast.success("Signup Sucess", { id: '2' })

  });

  return mutation;

}

export const useLoginuser = () => {
  const mutation = useMutation({
    mutationKey: ['user-signup'],
    mutationFn: (payload: logindetails) => axios.post('http://localhost:8000/auth/login', payload, { withCredentials: true }),
    onMutate: () => toast.loading("Creatign profile", { id: '2' }),
    onError: () => toast.error("Error while Login", { id: '2' }),
    onSuccess: () => toast.success("Login Sucess", { id: '2' })

  });

  return mutation;

}



export const useGetLogedinUser = () => {

  const query = useQuery({
    queryKey: ['getlogedin-user'],
    queryFn: async () => axios.post('http://localhost:8000/auth/getLogedInuser', {}, { withCredentials: true }),
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus:false
  })

  return query;

}
