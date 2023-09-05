import AppLayout from "@/components/AppLayout";
import PaymentComponent from "@/components/payment/Payment";

export default function Payment () {
  return (
    <AppLayout title="결제 페이지">
        <PaymentComponent></PaymentComponent>
    </AppLayout>
  )
}