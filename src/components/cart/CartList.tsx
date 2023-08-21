import { graphqlFetcher } from "@/api/queryClient";
import { CartType, UPDATE_CART } from "@/graphql/cart"; 
import styled from '@emotion/styled'
import { useMutation } from "@tanstack/react-query";
import { SyntheticEvent } from "react";

export function CartList({ carts = [] }: { carts: CartType[] }) {
    return carts.map((cart: CartType) => <CartList.Item {...cart} key={cart.id}/>)
}

const ItemBox = styled.div`
  height: 250px;
  border: 1px solid #000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .amount{
    border: 1px solid #888;
  }
`

CartList.Item = function Item({
  id,
  amount,
  product
}: CartType){
  const {mutate: updateCart} = useMutation(({id, amount} : {id:string, amount:number}) => graphqlFetcher(UPDATE_CART, {id, amount}))
  const handleUpdateAmount = (e: SyntheticEvent) => {
    const changeAmount = Number((e.target as HTMLInputElement).value);
    updateCart({id, amount: changeAmount});
  }
  return(
    <ItemBox>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <span>{product.price}원</span>
      <input type="number" className="amount" value={amount} onChange={handleUpdateAmount}/>
    </ItemBox>
  )
};