"use client"

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PostProvider } from "./CreatePostsData"


export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 10000,
          },
        },
      })
  )

  return (

    <QueryClientProvider client={queryClient}>
      <PostProvider>
          <ReactQueryDevtools />
          {children}
      </PostProvider>
    </QueryClientProvider>
  )
}
