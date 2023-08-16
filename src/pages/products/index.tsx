import {QueryKeys} from '@/api/queryClient';
import {ProductItem}  from "@/components/product/ProductItem";
import { ProductType } from "@/graphql/products";
import QueryLayout from "@/components/QueryLayout";
import CustomImage from '@/components/Image'
import AppLayout from '@/components/AppLayout';
import { GET_PRODUCTS } from '@/graphql/products';

export default function Products() {
    return (
      <AppLayout title='상품페이지'>
        <div className={`flex min-h-screen flex-col items-center justify-between p-24`}>
          <div className="products">
            <QueryLayout 
              method= 'GET'
              path = '/products'
              qkey = {[QueryKeys.PRODUCTS]}
              graphqlQuery={GET_PRODUCTS}
              callback = {(data: any) => {
                return data.products.map((product:ProductType) => 
                  <ProductItem {...product} key={product.id}> 
                    <CustomImage  
                      width={200}
                      height={200}
                      src={product.imageUrl} 
                      alt={product.title} 
                      propHeight={'200px'}
                    />
                  </ProductItem>
                )
              }}
            />
          </div>
        </div>
      </AppLayout>
    )
}
