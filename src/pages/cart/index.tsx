import { QueryKeys } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { CartType, GET_CARTS } from '@/graphql/cart';
import QueryLayout from '@/components/QueryLayout'; 
import { CartList } from '@/components/cart/CartList';
import { SyntheticEvent, useRef } from 'react';

export default function Cart(){
  const formRef = useRef<HTMLFormElement>(null);

  const handleCheckBoxChanged = (e:SyntheticEvent) => {
    if(!formRef.current) return;
    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>('.checkbox');
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    if(targetInput.name === 'all-check'){
      const allCheck = targetInput.checked;
      checkboxes.forEach(inputElem => {
        inputElem.checked = allCheck;
      })
    } else {
      const allCheck = selectedCount === checkboxes.length;
      const allCheckInput = formRef.current.querySelector<HTMLInputElement>('input[name="all-check"]');
      if(allCheckInput) allCheckInput.checked = allCheck;
    }
  }
  return (
    <AppLayout title='장바구니 페이지'>
      <form ref={formRef} onChange={handleCheckBoxChanged}>
        <label htmlFor=""><input className="all-check" type='checkbox' name='all-check' />전체선택</label>
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
            callback={(data:any)=><CartList carts={data.carts} />}
          />
        </ul>
      </form>
    </AppLayout>
  )
}