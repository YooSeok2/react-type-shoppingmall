import {useState} from "react"
import { WillPay } from "../willpay"
import {PaymentModal} from "../PotalModal"
import { useRecoilState } from "recoil";
import { checkedCartState } from "@/recoils/cart";
import {useRouter} from "next/router";

export default function PaymentComponent(){
  const router = useRouter();
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [checkedCartData, setCheckedCartData] =  useRecoilState(checkedCartState)
  const showModal = () => {
    console.log('showModal')
    setModalShown(true);
  }
  const proceedPayment = () => {
    setCheckedCartData([]);
    router.replace("/products")
  }

  const cancelPayment = () => {
    setModalShown(false);
  }
  return (
    <div className="payment">
      <WillPay>
        <WillPay.Button onClick={showModal}/>
      </WillPay>
      <PaymentModal 
        show={modalShown} 
        proceed={proceedPayment} 
        cancel={cancelPayment}
      />
    </div>
  )
}