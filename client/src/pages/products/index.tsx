import {useCallback,useRef, useEffect} from 'react';
import {QueryKeys, graphqlFetcher} from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { GET_PRODUCTS } from '@/graphql/products';
import { ProductList } from '@/components/product/ProductList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRefCurrent } from '@/hooks';
import useIntersection from '@/hooks/useIntersection';

export default function Products() {
  const fetchMoreRef = useRef<HTMLDivElement>();
  const interSecting = useIntersection(fetchMoreRef);
  const { data, hasNextPage, fetchNextPage, isSuccess, isFetchingNextPage } = useInfiniteQuery<any>(
    [QueryKeys.PRODUCTS], 
    ({pageParam = ""}) => graphqlFetcher(GET_PRODUCTS, {cursor: pageParam}), {
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.products[lastPage.products.length - 1].id
    }
  })
  
  // useEffect(()=>{
  //   if(!interSecting || !hasNextPage || !isSuccess || isFetchingNextPage) return;
  //   fetchNextPage();
  // },[interSecting]);
  return (
    <AppLayout title='상품페이지'>
      <div className="products">
      <ProductList list={data?.pages || []} />
      </div>
      <div ref={fetchMoreRef}/>
    </AppLayout>
  )
}
