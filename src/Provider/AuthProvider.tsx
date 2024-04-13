// "use client"
// import { useLogedinUser } from "@/hooks/Auth";
// import { useQuery } from "@tanstack/react-query";
// import axios, { AxiosResponse } from "axios";
// import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";


// interface authcontextprops{
//   data: AxiosResponse<any, any> | undefined,
//   error:Error | null
//   isFetched:boolean,
//   isError:boolean,
//   isSuccess:boolean,
//   isFetching:boolean
// }

// const AuthContext = createContext<authcontextprops | null>(null);

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// }


// interface providerprops {
//   children: React.ReactNode
// }




// export const AuthProvider: React.FC<providerprops> = ({ children }) => {

//   const {data,isFetching,isFetched,isError,isSuccess,error,refetch} = useLogedinUser();

//   return (
//     <AuthContext.Provider value={{ data, isFetched,isFetching,isError,isSuccess,error }}>
//       {
//         children
//       }
//     </AuthContext.Provider>
//   )
// }
