import { UserProvider } from '@/context';
import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import type { AppProps } from "next/app";


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
export default MyApp;