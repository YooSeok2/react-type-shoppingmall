import { useState } from "react"
import { useRecoilState } from "recoil";
import { checkedCartState } from "@/recoils/cart";
import {useRouter} from "next/router";
import { useMutation } from "@tanstack/react-query";
import { graphqlFetcher } from "@/api/queryClient";
import { EXECUTE_PAY } from "@/graphql/payment";

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
  const {mutate:executePay} = useMutation((ids:string[]) => graphqlFetcher(EXECUTE_PAY, {ids}))
  const showModal = () => {
    setModalShown(true);
  }

  const proceedPayment = () => {
    const ids = checkedCartData.map((item) => item.id);
    executePay(ids);
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