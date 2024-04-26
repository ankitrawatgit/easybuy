import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
//console.log("middle ware");

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    const cookie = cookies();

    if(!cookie.get('token')){
        return NextResponse.redirect(new URL('/signup', request.url))
    }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/post/:path*'],
}