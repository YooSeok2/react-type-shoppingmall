import { QueryKeys, graphqlFetcher } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { GET_CARTS } from '@/graphql/cart';
import { useQuery } from '@tanstack/react-query';
import QueryLayout from '@/components/QueryLayout'; 
import { CartList } from '@/components/cart/CartList';

export default function Cart(){
  const {data} = useQuery([QueryKeys.CART], () => graphqlFetcher(GET_CARTS));
  return (
    <AppLayout title='장바구니 페이지'>
      <div className="cart">
        <QueryLayout
          method='GET'
          path='/carts'
          qkey={[QueryKeys.CART]}
          graphqlQuery={GET_CARTS}
          callback={(data:any)=><CartList carts={data.carts} />}
        />
      </div>
    </AppLayout>
  )
}