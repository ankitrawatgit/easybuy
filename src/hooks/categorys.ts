import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

const localhost = process.env.NEXT_PUBLIC_HOST_API_URL as string;

export const useGetAllCategory = () => {

  const query = useQuery({
    queryKey: ["all-category"],
    queryFn: () => axios.get(`${localhost}/category/getall`),
    refetchInterval:false,
    refetchOnWindowFocus:false,
    refetchOnMount:false
  });
  // console.log(query.data);
  
  return { ...query, categorys: query.data?.data.categories };

};