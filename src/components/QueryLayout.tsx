import {ReactElement} from 'react';
import {fetcher, QueryKeys} from '@/api/queryClient';
import { useQuery } from "@tanstack/react-query";

type QueryLayoutProps = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  qkey: string[],
  callback: (data: []) => ReactElement;
}

export default function QueryLayout({ 
  method,
  path,
  qkey,
  callback 
}: QueryLayoutProps) {
  const {data, isLoading, isError} = useQuery([...qkey], () => fetcher({
    method,
    path,
  }));

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error...</div>
  return callback(data)
} 