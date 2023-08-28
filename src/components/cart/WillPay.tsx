import { CartType } from "@/graphql/cart";
import { checkedCartState } from "@/recoils/cart";
import { useRecoilState } from "recoil";

export function WillPay(){
  const [checkedCart, setCheckedCart] = useRecoilState(checkedCartState);
  return (
    <div className="carts-willpay">
      <ul>
        {checkedCart.map((cart) => <WillPay.Layout datas={cart} key={cart.id} />)}
      </ul>
    </div>
  )
}



WillPay.Layout = function Layout({datas}: {datas:CartType}){
  console.log(datas);
  return (
    <li>hi</li>
  )
}