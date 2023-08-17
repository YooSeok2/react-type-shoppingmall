import { CartType } from "@/graphql/cart"; 

export function CartList({ carts = [] }: { carts: CartType[] }) {
    return carts.map((cart: CartType) => <CartList.Item {...cart} key={cart.id}/>)
}

CartList.Item = function Item({
  id,
  amount,
  product
}: CartType){
  return(
    <div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  )
};