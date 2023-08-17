import {ProductType} from '@/graphql/products'
import {ProductItem}  from "@/components/product/ProductItem";
import CustomImage from '@/components/Image'

export function ProductList({products}:{products:ProductType[]}){
  return (
    products.map((product:ProductType) =>
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
  )
  
}