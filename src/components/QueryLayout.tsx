import {ReactElement} from 'react';
import {graphqlFetcher, QueryKeys} from '@/api/queryClient';
import { useQuery } from "@tanstack/react-query";
import {RequestDocument} from 'graphql-request';

type QueryLayoutProps = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path?: string;
  graphqlQuery?: RequestDocument;
  graphqlId?: string;
  qkey: string[],
  callback: (data: [] | any) => ReactElement;
}

export default function QueryLayout({ 
  method,
  path,
  graphqlQuery,
  graphqlId,
  qkey,
  callback 
}: QueryLayoutProps) {
  const {data, isLoading, isError} = useQuery([...qkey], () => graphqlFetcher(graphqlQuery, {graphqlId}));
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error...</div>
  return callback(data)
} 