"use client"
import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface usercontextinterface {
  user: User ,
  setuser: Dispatch<SetStateAction<User>>
}


interface User {
  id: number | null;
  name: string;
  username: string;
  email: string;
  image?: string[] | null;
}

const Usercontext = createContext<usercontextinterface | null>(null);

interface providerprops {
  childrens: React.ReactNode
}

export const UserProvider: React.FC<providerprops> = ({ childrens }) => {
  const [user, setuser] = useState<User>({
    id:null,
    name:'',
    username:'',
    email:'',
    image:[]
  })
  return (
    <Usercontext.Provider value={{user, setuser}}>
      {
        childrens
      }
    </Usercontext.Provider>
  )
}
