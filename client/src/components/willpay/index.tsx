import { checkedCartState } from "@/recoils/cart";
import { useRecoilState } from "recoil";
import { Children, ReactElement, useEffect, useState } from "react";
import CustomImage from '@/components/Image'
import styled from '@emotion/styled'
import { commas } from "@/util";

export function WillPay({children}: {children: ReactElement}) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkedCart, setCheckedCart] = useRecoilState(checkedCartState);
  const buttonChild = Children.only(children);
  
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
      <span className="willpay__total">총 결제 예상 금액: {commas(totalAmount)}원</span>
      {checkedCart.length> 0 ? buttonChild : null}
    </div>
  )
}

const WillPayItemBox = styled.li`
  border: 1px solid #000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 5px;
`;

WillPay.Button = function WillPayButton ({onClick} : {onClick: () => void}) {
  return <button className="willpay__button" onClick={onClick}>결제하기</button>
}

WillPay.CartItemBox = function CartItemBox({
  amount,
  price,
  children
}: {amount:number, price:number, children?: ReactElement}){
  const ImageChild = Children.only(children);
  return (
    <WillPayItemBox>
      {ImageChild} 
      <span>수량: {amount}</span>
      <span>가격: {commas(price * amount)}</span>
    </WillPayItemBox>
  )
}