import { useQuery } from "@tanstack/react-query";
import {fetcher, QueryKeys} from '@/api/queryClient';
import ProductItem  from "@/components/ProductItem";
import { Products } from "@/types";
import QueryLayout from "@/components/QueryLayout";

export default function Products() {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <ul className="products">
        <QueryLayout 
          method= 'GET'
          path = '/products'
          qkey = {[QueryKeys.PRODUCTS]}
          callback = {(data: any) => {
            return data.map((product:Products) => 
              <ProductItem {...product} key={product.id}/> 
            )
          }}
        />
      </ul>
    </div>
  )
}