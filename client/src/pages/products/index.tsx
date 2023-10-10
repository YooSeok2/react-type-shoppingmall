import {useCallback,useRef, useEffect} from 'react';
import {QueryKeys, graphqlFetcher} from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { GET_PRODUCTS } from '@/graphql/products';
import { ProductList } from '@/components/product/ProductList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRefCurrent } from '@/hooks';

export default function Products() {
  const observerRef = useRef<IntersectionObserver>();
  const [fetchMoreRef, fetchMoreRefCurrent] = useRefCurrent<HTMLDivElement>();
  const { data, hasNextPage, fetchNextPage, isLoading, isError } = useInfiniteQuery<any>(
    [QueryKeys.PRODUCTS], 
    ({pageParam = ""}) => graphqlFetcher(GET_PRODUCTS, {cursor: pageParam}), {
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.products[lastPage.products.length - 1].id
    }
  })
  const getObserver = useCallback(()=>{
    if(!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if(entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      })
    }
  },[observerRef.current]);
  useEffect(()=>{
    // if(fetchMoreRefCurrent) getObserver().observe(fetchMoreRefCurrent);
  },[getObserver, fetchMoreRefCurrent]);
  return (
    <AppLayout title='상품페이지'>
      <div className="products">
      <ProductList list={data?.pages || []} />
      </div>
      <div ref={fetchMoreRef}/>
    </AppLayout>
  )
}
