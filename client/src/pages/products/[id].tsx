import { useRouter } from "next/router";
import QueryLayout from "@/components/QueryLayout";
import {QueryKeys} from '@/api/queryClient';
import CustomImage from '@/components/Image'
import {ProductItem}  from "@/components/product/ProductItem";
import { GET_PRODUCT, ProductType } from "@/graphql/products";

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
            callback = {(product: {product: ProductType}) => {
              const newProduct = product.product;
              return (
                <ProductItem {...newProduct} key={newProduct.id}> 
                  <CustomImage 
                    fill={true} 
                    src={newProduct.imageUrl} 
                    alt={newProduct.title} 
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