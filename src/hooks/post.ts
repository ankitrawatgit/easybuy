import { Post, createPostData } from "@/Provider/Posts";
import { QueryCache, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { unstable_noStore } from "next/cache";
import { headers } from "next/headers";
import toast from "react-hot-toast";


export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: (payload: createPostData) => {
      console.log(payload);
      
      return axios.post('http://localhost:8000/post/createpost', payload, { withCredentials: true });
    },
    onMutate: (payload) => toast.loading("Creating Your Post", { id: "1" }),
    onSuccess: async (payload) => {
      await queryClient.invalidateQueries({ queryKey: ['all-posts'] })
      toast.success("Created Success", { id: "1" });
    },
    onError: (e) => {
      //console.log(e);

      toast.error("Error Aa gaya", { id: '1' })

    }
  });

  return mutation;
};

export const useGetUserPosts=(id:number)=>{
  const query = useQuery({
    queryKey: ["user's-posts",id],
    queryFn: () => axios.post('http://localhost:8000/post/getbyuserid',{id:id}),
    refetchOnMount:true
  });

  return { ...query, posts: query.data?.data.posts };
}

export const useGetAllPosts = () => {

  const query = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => axios.get('http://localhost:8000/post/getAll'),
  });

  return { ...query, posts: query.data?.data.posts };

};

export const useGetByIdPost = (id: number) => {

  const { posts, isLoading } = useGetAllPosts();
  if (posts) {
    const allPostsData = posts as Post[];
    // console.log(id);
    
    // console.log(allPostsData);
    
    const post = allPostsData.find(post => post.id === id);
    return { post: post, isLoading };
  } else {
    return { post: null }
  }
};

export const useDeletePost =()=>{
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: (payload: {id:number | undefined}) => {
      return axios.post('http://localhost:8000/post/delete', {id:payload.id}, { withCredentials: true });
    },
    onMutate: (payload) => toast.loading("Deleting Post", { id: "1" }),
    onSuccess: async (payload) => {
      await queryClient.invalidateQueries({ queryKey: ["user's-posts"] })
      toast.success("Deleted", { id: "1" });
    },
    onError: (e) => {
      //console.log(e);

      toast.error("Error Aa gaya", { id: '1' })

    }
  });

  return mutation;
}

