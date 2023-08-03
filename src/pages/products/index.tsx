import {QueryKeys} from '@/api/queryClient';
import {ProductItem}  from "@/components/product/ProductItem";
import { Products } from "@/types";
import QueryLayout from "@/components/QueryLayout";
import CustomImage from '@/components/Image'
import AppLayout from '@/components/AppLayout';

export default function Products() {
    return (
      <AppLayout title='상품페이지'>
        <div className={`flex min-h-screen flex-col items-center justify-between p-24`}>
          <div className="products">
            <QueryLayout 
              method= 'GET'
              path = '/products'
              qkey = {[QueryKeys.PRODUCTS]}
              callback = {(data: any) => {
                return data.map((product:Products) => 
                  <ProductItem {...product} key={product.id}> 
                    <CustomImage  
                      fill={true}
                      src={product.image} 
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
