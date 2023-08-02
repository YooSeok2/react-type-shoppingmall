import { useRouter } from "next/router";
import QueryLayout from "@/components/QueryLayout";
import {QueryKeys} from '@/api/queryClient';
import { Products } from "@/types";
import CustomImage from '@/components/Image'
import {ProductItem}  from "@/components/ProductItem";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  if(id) {
    return (
      <div className="product__detail">
          <QueryLayout 
            method= 'GET'
            path = {`/products/${id}`}
            qkey = {[QueryKeys.PRODUCTS, id as string]}
            callback = {(product: Products) => {
              return (
                <ProductItem {...product} key={product.id}> 
                  <CustomImage src={product.image} alt={product.title} width='100%' height='100%' />
                </ProductItem>
              )
            }}
          />
      </div>
    );
  }
  return <></>
}