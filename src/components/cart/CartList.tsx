import { QueryKeys, graphqlFetcher } from "@/api/queryClient";
import { CartType, DELETE_CART, UPDATE_CART } from "@/graphql/cart"; 
import styled from '@emotion/styled'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, Children, ReactElement } from "react";
import CustomImage from '@/components/Image'

export function CartList({ carts = {} }: { carts: {[key:string]:CartType} }) {
    const cartsArray = Object.values(carts);
    return cartsArray.map((cart: CartType) => ( 
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

const ItemBox = styled.li`
  border: 1px solid #000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
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
      queryClient.setQueryData([QueryKeys.CART], newCartData);
    },
    onSuccess: (newValue:{[key:string]:CartType}) => {
      const newCartData = {
        ...newValue
      }
      queryClient.setQueryData([QueryKeys.CART], newCartData);
    }
  })

  const {mutate:deleteCart} = useMutation(({ id } : {id:string}) => graphqlFetcher(DELETE_CART, {id}), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.CART]);
    }
  })

  const handleDeleteCart = (e:SyntheticEvent) => {
    e.preventDefault();
    deleteCart({ id });
  }

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const changeAmount = Number((e.target as HTMLInputElement).value);
    if(changeAmount < 1) return;
    updateCart({id, amount: changeAmount});
  }

  return(
    <ItemBox>
      <input className="checkbox" type="checkbox" name="select-item" />
      <h3>{product.title}</h3>
      {ImageChild}
      <p>{product.description}</p>
      <span>{product.price}원</span>
      <input 
         type="number"
         className="amount" 
         value={amount} 
         onChange={handleUpdateAmount}
         min={1}
        />
      <button onClick={handleDeleteCart} className="delete-button">삭제</button>
    </ItemBox>
  )
};