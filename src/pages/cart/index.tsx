import { QueryKeys } from '@/api/queryClient';
import AppLayout from '@/components/AppLayout';
import { CartType, GET_CARTS } from '@/graphql/cart';
import QueryLayout from '@/components/QueryLayout'; 
import { CartList } from '@/components/cart/CartList';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '@/recoils/cart';
import { useQueryClient } from '@tanstack/react-query';
import { WillPay } from '@/components/cart/WillPay';
import { useRefCurrent } from '@/hooks';

export default function Cart(){
  const [formRef, formRefCurrent] = useRefCurrent<HTMLFormElement>();
  const queryClient = useQueryClient();
  const [checkedCartItems, setCeckedCartItems] = useRecoilState(checkedCartState);
  const [formData, setFormData] = useState<FormData>()

  useEffect(()=>{
    setCheckBoxWhenToStart();
  },[formRefCurrent]);
  
  useEffect(()=>{
    updateCheckedCartItems();
  }, [formData,formRefCurrent]);

  const handleCheckBoxChanged = (e:SyntheticEvent) => {
    if(!formRefCurrent) return;
    const data = new FormData(formRefCurrent);
    const selectedCount = data.getAll('select-item').length;
    const targetInput = e.target as HTMLInputElement;
    const checkboxes = formRefCurrent.querySelectorAll<HTMLInputElement>('.checkbox');

    if(targetInput.name === 'all-check'){ 
      // 장바구니 아이템 전체 선택
      const allCheck = targetInput.checked;
      checkboxes.forEach(inputElem => {
        inputElem.checked = allCheck;
      })
    } else {
      // 장바구니 아이템 개별 선택
      const allCheck = selectedCount === checkboxes.length;
      const allCheckInput = formRefCurrent.querySelector<HTMLInputElement>('input[name="all-check"]');
      if(allCheckInput) allCheckInput.checked = allCheck;
    }
    setFormData(data);
  }

  const updateCheckedCartItems = () => {
    if(!formRefCurrent) return;
    const checkBoxes = formRefCurrent.querySelectorAll<HTMLInputElement>('.checkbox');
    const checkedIds = [];
    checkBoxes.forEach((inputElem:HTMLInputElement) => {
      if(inputElem.checked) checkedIds.push(inputElem.dataset.id);
    })
    const cartItems = queryClient.getQueryData<CartType[]>([QueryKeys.CART]) || [];
    const checkedCartItems = cartItems.filter((cartItem:CartType) => {
      return checkedIds.some((id:string) => id === cartItem.id)
    })
    console.log(checkedCartItems);
    setCeckedCartItems(checkedCartItems);
  }

  const setCheckBoxWhenToStart = () => {
    if(!formRefCurrent) return;
    const checkboxes = formRefCurrent.querySelectorAll<HTMLInputElement>('.checkbox');
    const allCheckInput = formRefCurrent.querySelector<HTMLInputElement>('input[name="all-check"]');
    let checkCount = 0;
    checkedCartItems.forEach((cartItem:CartType) => {
      checkboxes.forEach((inputElem:HTMLInputElement) => {
        if(inputElem.dataset.id === cartItem.id) {
          inputElem.checked = true;
          checkCount++;
        }
      })
      if(checkCount === checkboxes.length) allCheckInput.checked = true;
    });
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