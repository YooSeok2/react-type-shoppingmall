import {QueryKeys} from '@/api/queryClient';
import {ProductItem}  from "@/components/ProductItem";
import { Products } from "@/types";
import QueryLayout from "@/components/QueryLayout";
import CustomImage from '@/components/Image'

export default function Products() {
    return (
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
    )
}
