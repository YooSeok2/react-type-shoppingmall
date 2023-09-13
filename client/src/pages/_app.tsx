import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {getClient} from '@/api/queryClient';
import {worker} from '@/mocks/browser';
import { RecoilRoot } from 'recoil';

const client = getClient();
/*
if(process.env.NODE_ENV === 'development') {
  worker.listen();
}
 */


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
