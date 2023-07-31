import { useQuery } from "@tanstack/react-query";
import {fetcher, QueryKeys} from '@/api/queryClient';
import ProductItem  from "@/components/ProductItem";
import { Products } from "@/types";

export default function Products() {
  const {data} = useQuery([QueryKeys.PRODUCTS], () => fetcher({
    method: 'GET',
    path: '/products'
  }))

  return (
    <div className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <ul>
        {data?.map((product:Products)=>{
            return <ProductItem {...product} key={product.id}/>
        })}
      </ul>
    </div>
  )
}