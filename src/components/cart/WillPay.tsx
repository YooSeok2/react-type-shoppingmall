import { CartType } from "@/graphql/cart";
import { checkedCartState } from "@/recoils/cart";
import { useRecoilState } from "recoil";

export function WillPay(){
  const [checkedCart, setCheckedCart] = useRecoilState(checkedCartState);
  console.log(checkedCart);
  return (
    <div className="carts-willpay">
      <ul>
        {checkedCart.map((cart) => <WillPay.CartItemBox datas={cart} key={cart.id} />)}
      </ul>
    </div>
  )
}

WillPay.CartItemBox = function CartItemBox({datas}: {datas:CartType}){
  return (
    <>
    <li>hi</li>
    <span>{datas.amount}</span>
    </>
  )
}