import { useState } from "react"
import { useRecoilState } from "recoil";
import { checkedCartState } from "@/recoils/cart";
import {useRouter} from "next/router";

type ReturnType = {
  modalShown: boolean,
  showModal: () => void,
  proceedPayment: () => void,
  cancelPayment: () => void
}

export const usePayment = () : ReturnType => {
  const router = useRouter();
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [checkedCartData, setCheckedCartData] =  useRecoilState(checkedCartState)
  const showModal = () => {
    setModalShown(true);
  }

  const proceedPayment = () => {
    setCheckedCartData([]);
    router.replace("/products")
  }

  const cancelPayment = () => {
    setModalShown(false);
  }
  return {
    modalShown,
    showModal,
    proceedPayment,
    cancelPayment
  }
}