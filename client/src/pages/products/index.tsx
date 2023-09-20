import {QueryKeys} from '@/api/queryClient';
import { ProductType } from "@/graphql/products";
import QueryLayout from "@/components/QueryLayout";
import AppLayout from '@/components/AppLayout';
import { GET_PRODUCTS } from '@/graphql/products';
import { ProductList } from '@/components/product/ProductList';

export default function Products() {
    return (
      <AppLayout title='상품페이지'>
        <div className="products">
          <QueryLayout 
            method= 'GET'
            path = '/products'
            qkey = {[QueryKeys.PRODUCTS]}
            graphqlArg={{cursor:""}}
            graphqlQuery={GET_PRODUCTS}
            callback = {(data: any) => {
              return <ProductList products={data.products} />
            }}
          />
        </div>
      </AppLayout>
    )
}
