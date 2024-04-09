import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast";

export const useUploadImage = ()=>{
   const mutation = useMutation({
    mutationKey:['image-upload'],
    mutationFn:(formData:FormData)=>{
       return axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });
    },
    onMutate:()=>toast.loading("Uploading Image",{id:'1'}),
    onSuccess:async()=>{
        toast.success("Uploading Success", { id: "1" });
    },
    onError:()=> {
        toast.error("Error Aa gaya",{id:'1'})
    }
   });

   return mutation;

}