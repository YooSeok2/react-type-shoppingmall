import {useState} from "react"
import { WillPay } from "../willpay"
import {PaymentModal} from "../PotalModal"
import { usePayment } from "@/hooks/usePayment"

export default function PaymentComponent(){
  const {modalShown, showModal, proceedPayment, cancelPayment} = usePayment();
  
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