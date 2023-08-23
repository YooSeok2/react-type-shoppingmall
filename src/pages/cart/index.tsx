import { QueryKeys } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { GET_CARTS } from '@/graphql/cart';
import QueryLayout from '@/components/QueryLayout'; 
import { CartList } from '@/components/cart/CartList';
import { SyntheticEvent, useRef } from 'react';

export default function Cart(){
  const formRef = useRef<HTMLFormElement>(null);
  const handleCheckBoxChanged = (e:SyntheticEvent) => {
    if(!formRef.current) return;
    const data = new FormData(formRef.current);
    console.dir([data]);
  }
  return (
    <AppLayout title='장바구니 페이지'>
      <form ref={formRef} onChange={handleCheckBoxChanged}>
        <label htmlFor=""><input type='checkbox' name='all-check' />전체선택</label>
        <ul className='carts'>
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
            callback={(data:any)=><CartList carts={data} />}
          />
        </ul>
      </form>
    </AppLayout>
  )
}