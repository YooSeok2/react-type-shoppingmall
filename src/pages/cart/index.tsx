import { QueryKeys, graphqlFetcher } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { GET_CARTS } from '@/graphql/cart';
import { useQuery } from '@tanstack/react-query';

export default function Cart(){
  const {data} = useQuery([QueryKeys.CART], () => graphqlFetcher(GET_CARTS));
  return (
    <AppLayout title='장바구니 페이지'>
      <div>장바구니 페이지</div>
    </AppLayout>
  )
}