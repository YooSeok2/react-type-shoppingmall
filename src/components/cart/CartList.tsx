import { QueryKeys, graphqlFetcher } from "@/api/queryClient";
import { CartType, DELETE_CART, UPDATE_CART } from "@/graphql/cart"; 
import styled from '@emotion/styled'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, Children, ReactElement } from "react";
import CustomImage from '@/components/Image'
import { useRecoilState } from "recoil";
import { checkedCartState } from '@/recoils/cart';
import { commas } from "@/util";

export function CartList({ carts }: { carts: CartType[] }) {
    return carts.map((cart: CartType) => ( 
    <CartList.Item {...cart} key={cart.id}>
      <CustomImage
        width={200}
        height={200}
        src={cart.product.imageUrl} 
        alt={cart.product.title} 
        propHeight={'200px'}
      />
    </CartList.Item>))
}

const CartItemBox = styled.li`
  border: 1px solid #000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
  & .amount{
    border: 1px solid #888;
  }
  & .delete-button{
    border: 1px solid #888;
    margin-top: 10px;
    padding: 5px;
    height: 30px;
  }
  & .checkbox{
    margin-bottom: 5px;
  }
`

CartList.Item = function Item({
  id,
  amount,
  product,
  children
}: CartType & {children?: ReactElement}){
  const ImageChild = Children.only(children);
  const queryClient = useQueryClient();
  const [checkedCart, setCheckedCart] = useRecoilState(checkedCartState);

  const {mutate: updateCart} = useMutation(({id, amount} : {id:string, amount:number}) => graphqlFetcher(UPDATE_CART, {id, amount}), 
  {
    onMutate: async ({id, amount}) => {
      await queryClient.cancelQueries([QueryKeys.CART]);
      const prevCartData = queryClient.getQueryData<{[key:string]:CartType}>([QueryKeys.CART]);
      if(!prevCartData?.[id]) return;
      const newCartData = {
        ...(prevCartData || {}),
        [id]: {
          ...prevCartData?.[id],
          amount
        }
      }
      queryClient.setQueryData([QueryKeys.CART], [...Object.values(newCartData)]);
      return amount
    },
    onSuccess: (newValue:{[key:string]:CartType}, context) => {
      const newCartData = {
        ...newValue
      }
      queryClient.setQueryData([QueryKeys.CART], [...Object.values(newCartData)]);
      changeCheckedCartQueryItem(context.amount);
    }
  })

  const {mutate: deleteCart} = useMutation(({ id } : {id:string}) => graphqlFetcher(DELETE_CART, {id}), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.CART]);
    }
  })

  const handleDeleteCart = (e:SyntheticEvent) => {
    e.preventDefault();
    const newCartItems = checkedCart.filter((cartItem:CartType) => cartItem.id !== id);
    setCheckedCart(newCartItems);
    deleteCart({ id });
  }

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const changeAmount = Number((e.target as HTMLInputElement).value);
    if(changeAmount < 1) return;
    updateCart({id, amount: changeAmount});
  }

  const changeCheckedCartQueryItem = (chageAmount: number) => {
    const newCartItems = checkedCart.map((cartItem:CartType) => {
      if(cartItem.id === id) return {...cartItem, amount: chageAmount}
      return cartItem;
    });
    setCheckedCart(newCartItems);
  }
  
  return(
    <CartItemBox>
      <input className="checkbox" type="checkbox" name="select-item" data-id={`${id}`}/>
      <h3>{product.title}</h3>
      {ImageChild}
      <p>{product.description}</p>
      <span>{commas(product.price)}원</span>
      <input 
         type="number"
         className="amount" 
         value={amount} 
         onChange={handleUpdateAmount}
         min={1}
        />
      <button onClick={handleDeleteCart} className="delete-button">삭제</button>
    </CartItemBox>
  )
};