import { QueryKeys } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { GET_CARTS } from '@/graphql/cart';
import QueryLayout from '@/components/QueryLayout'; 
import { CartList } from '@/components/cart/CartList';

export default function Cart(){
  return (
    <AppLayout title='장바구니 페이지'>
      <div className="carts">
        <QueryLayout
          method='GET'
          path='/carts'
          qkey={[QueryKeys.CART]}
          graphqlQuery={GET_CARTS}
          graphqlOption={{
            staleTime: 0, 
            cacheTime: 1000 * 60 * 5, 
            refetchOnMount: true
          }}
          callback={(data:any)=><CartList carts={data.carts} />}
        />
      </div>
    </AppLayout>
  )
}