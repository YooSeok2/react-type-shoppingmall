import { useRouter } from "next/router";
import QueryLayout from "@/components/QueryLayout";
import {QueryKeys} from '@/api/queryClient';
import CustomImage from '@/components/Image'
import {ProductItem}  from "@/components/product/ProductItem";
import { GET_PRODUCT, PRODUCTS } from "@/graphql/products";

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
            graphqlQuery={GET_PRODUCT}
            graphqlId={id as string}
            callback = {(product: PRODUCTS) => {
              console.log(product)
              return (
                <ProductItem {...product} key={product.id}> 
                  <CustomImage 
                    fill={true} 
                    src={product.imageUrl} 
                    alt={product.title} 
                    propHeight={'600px'} 
                    loading='eager'
                  />
                </ProductItem>
              )
            }}
          />
      </div>
    );
  }
  return <></>
}