"use server"

import { cookies } from "next/headers"

export const DeleteCookie = (name:string)=>{
    const cookie = cookies();
    cookie.delete(name);
}