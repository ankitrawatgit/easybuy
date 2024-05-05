import { logindetails } from "@/app/login/page"
import { SignupDetails } from "@/app/signup/page"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

const localhost = process.env.NEXT_PUBLIC_HOST_API_URL;

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationKey: ['user-signup'],
    mutationFn: (payload: SignupDetails) => axios.post(`${localhost}/auth/createuser`, payload, { withCredentials: true }),
    onMutate: () => toast.loading("Creatign profile", { id: '2' }),
    onError: () => toast.error("Error while creating", { id: '2' }),
    onSuccess: () => toast.success("Signup Sucess", { id: '2' })

  });

  return mutation;

}

export const useLoginuser = () => {
  const mutation = useMutation({
    mutationKey: ['user-signup'],
    mutationFn: (payload: logindetails) => axios.post(`${localhost}/auth/login`, payload, { withCredentials: true }),
    onMutate: () => toast.loading("Login ..", { id: '2' }),
    onError: () => toast.error("Error while Login", { id: '2' }),
    onSuccess: () => toast.success("Login Sucess", { id: '2' })

  });

  return mutation;

}



export const useGetLogedinUser = () => {

  const query = useQuery({
    queryKey: ['getlogedin-user'],
    queryFn: async () => axios.post(`${localhost}/auth/getLogedInuser`, {}, { withCredentials: true }),
    retry:false,
    refetchOnMount:true,
    staleTime:10
  })
  
  return query;

}

export const useGetUserByid=(id:number)=>{
  const query = useQuery({
    queryKey: ['get-userbyid',id],
    queryFn: async () => axios.post(`${localhost}/auth/getUserbyid`, {id:id}, { withCredentials: true }),
    retryOnMount: true,
    refetchOnWindowFocus:true
  })

  return query;
}

interface updateUserinterface{
  name:string;
  image:string | undefined;
}

export const useUpdateUser=()=>{
  const mutate = useMutation(
    {
      mutationKey:['update-user'],
      mutationFn:(payload:updateUserinterface)=>axios.post(`${localhost}/auth/updateprofile`,payload,{withCredentials:true}),
      onMutate: () => toast.loading("Updating ..", { id: '2' }),
      onError: () => toast.error("Error while Updating", { id: '2' }),
      onSuccess: () => toast.success("Update Sucess", { id: '2' })
    }
  )

  return mutate;

}
