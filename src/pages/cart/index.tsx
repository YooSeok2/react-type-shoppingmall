import { QueryKeys } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { CartType, GET_CARTS } from '@/graphql/cart';
import QueryLayout from '@/components/QueryLayout'; 
import { CartList } from '@/components/cart/CartList';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { checkedCartState } from '@/recoils/cart';
import { useQueryClient } from '@tanstack/react-query';
import { WillPay } from '@/components/cart/WillPay';

export default function Cart(){
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const setCeckedCartItems = useSetRecoilState(checkedCartState);
  const [formData, setFormData] = useState<FormData>()

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
    setFormData(data);
  }

  useEffect(()=>{
    const checkBoxes = formRef.current.querySelectorAll<HTMLInputElement>('.checkbox');
    const checkedIds = [];
    checkBoxes.forEach((inputElem:HTMLInputElement) => {
      if(inputElem.checked) checkedIds.push(inputElem.dataset.id);
    })
    const cartItems = queryClient.getQueryData<CartType[]>([QueryKeys.CART]);
    const checkedCartItems = cartItems.filter((cartItem:CartType) => {
      return checkedIds.some((id:string) => id === cartItem.id)
    })
    setCeckedCartItems(checkedCartItems);
  }, [formData, queryClient]);
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
            callback={(data:any)=>{
              return <CartList carts={data} />}
            }
          />
        </ul>
      </form>
      <WillPay />
    </AppLayout>
  )
}