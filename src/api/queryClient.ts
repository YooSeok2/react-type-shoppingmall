import { QueryClient } from "@tanstack/react-query";
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

const BASE_URL = 'https://fakestoreapi.com';
export const fetcher = async ({
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
    const url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL
      }
    }
    const res = await fetch(url, fetchOptions);
    // if(!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json;
  } catch(err){
    console.log(err);
  }
}

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
}