"use client"
import React, { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

export interface createPostData{
    title: string,
    description: string,
    images: string[],
    categoryid:number,
    price: number,
    Address: string,
}

export interface Post {
    id: number;
    title: string;
    description: string;
    category: Category;
    categoryId: number;
    images: string[];
    price: number;
    Address:string;
    createdAt: Date;
    authorId: number;
    author: User;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    image?: string | null;
}

interface Category {
    id: number;
}


interface PostContextValue {
    posts: Post[];
    setPosts: Dispatch<SetStateAction<Post[]>>;
    postDetails:postdetailsformdata;
    setpostDetails:Dispatch<SetStateAction<postdetailsformdata>>;
    categoryid:number,
    setcategoryid:Dispatch<SetStateAction<number>>,
    uploadedimages:imageuploadeddata[],
    setuploadedimages:Dispatch<SetStateAction<imageuploadeddata[]>>
}

interface PostProviderProps {
    children: React.ReactNode;
}



interface postdetailsformdata{
    title:string,
    description: string,
    price: number,
    Address: string,
    isvalidated:boolean
}

export interface imageuploadeddata{
    filename:string,
    filedisplayurl:string
}


const PostsContext = createContext<PostContextValue | null>(null);

export const usePostContext=()=>{
      return useContext(PostsContext);;
}


export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postDetails,setpostDetails] = useState<postdetailsformdata>({
        title:'',
        description:'',
        price:0,
        Address:'' ,
        isvalidated:false
       });
    const [categoryid, setcategoryid] = useState<number>(0);
    const [uploadedimages, setuploadedimages] = useState<imageuploadeddata[]>([])

    return (
        <PostsContext.Provider value={{ posts, setPosts,postDetails,setpostDetails,categoryid,setcategoryid,uploadedimages,setuploadedimages}}>
            {children}
        </PostsContext.Provider>
    );
};
