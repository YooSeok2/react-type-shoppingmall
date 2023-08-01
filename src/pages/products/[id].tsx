import { useRouter } from "next/router";
export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <div>Product Detail</div>;
}