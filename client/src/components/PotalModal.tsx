
import React, { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PotalModal = ({ children }: { children?: ReactElement | any }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  if (typeof window === "undefined") return <></>;
  return mounted ? createPortal(children , document.getElementById("modal")! as HTMLElement) : <></>;
};

export const PaymentModal = ({show, proceed, cancel}:{
  show: boolean, 
  proceed:()=>void, 
  cancel:()=>void}) => {
  return show && (
    <div className="modal-wrap">
      <PotalModal>
        <div className='paymentmodal'>
          <div className="paymentmodal__title">
            <h1>정말로 결제하시겠습니까?</h1>
          </div>
          <div className="paymentmodal__btnBox">
            <button className="paymentmodal__proceed" onClick={proceed}>결제하기</button>
            <button className="paymentmodal__cancel" onClick={cancel}>취소하기</button>
          </div>
        </div>
      </PotalModal>
    </div>
  )
}

