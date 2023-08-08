import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import {RequestDocument, request} from 'graphql-request';

type AnyObj = {[key: string]: any};

export const getClient = () => {
    let client : QueryClient | null = null;
    return (() => {
        if (!client) {
            client = new QueryClient({
              defaultOptions:{
                queries: {
                  staleTime: 1000 * 60,
                  cacheTime: 1000 * 60 * 60 * 24,
                  refetchOnWindowFocus: false,
                  refetchOnMount: false,
                  refetchOnReconnect: false,
                }
              }
            });
        }
        return client;
    })()
};

const AXIOS_BASE_URL = 'https://fakestoreapi.com';
const GRAPHQL_BASE_URL = '/';
export const restFetcher = async ({
  method,
  path,
  body,
  params
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  body?: AnyObj,
  params?: AnyObj
}) => {
  try {
    const url = `${AXIOS_BASE_URL}${path}`;
    const fetchOptions: AxiosRequestConfig = {
      method,
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': AXIOS_BASE_URL
      }
    }
    const res = await axios(url, fetchOptions);
    const json = await res.data;
    return json;
  } catch(err){
    console.error(err);
  }
}

export const graphqlFetcher = (query: RequestDocument, variables?: {}) => request(GRAPHQL_BASE_URL, query, variables);

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
}