import { checkedCartState } from "@/recoils/cart";
import { useRecoilState } from "recoil";
import { Children, ReactElement, useEffect, useState } from "react";
import CustomImage from '@/components/Image'
import styled from '@emotion/styled'
export function WillPay(){
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkedCart, setCheckedCart] = useRecoilState(checkedCartState);
  useEffect(() => {
    const totalAmount = checkedCart.reduce((acc, cur) => acc + (cur.product.price * cur.amount), 0);
    setTotalAmount(totalAmount);
  }, [checkedCart]);
  return (
    <div className="willpay">
      <ul>
        {checkedCart.map((cart) =>(
          <WillPay.CartItemBox 
            amount={cart.amount}
            price={cart.product.price}
            key={cart.id}  
          >
            <CustomImage
              width={100}
              height={100}
              src={cart.product.imageUrl}
              alt={cart.product.title}
              propHeight={'100px'}
            />
          </WillPay.CartItemBox>
        ))}
      </ul>
      <span className="willpay__total">총 가격: {totalAmount}</span>
      
    </div>
  )
}

const ItemBox = styled.li`
  border: 1px solid #000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

WillPay.CartItemBox = function CartItemBox({
  amount,
  price,
  children
}: {amount:number, price:number, children?: ReactElement}){
  const ImageChild = Children.only(children);
  return (
    <ItemBox>
      {ImageChild} 
      <span>수량: {amount}</span>
      <span>가격: {price * amount}</span>
    </ItemBox>
  )
}