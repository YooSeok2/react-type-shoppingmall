import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {getClient} from '@/api/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient();
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
