type Method = 'Query' | 'Mutation';

export type Resolver = {
  [key in Method]: {
    [key: string]: (
      parent: any, 
      args: {[key:string]:any}, 
      context: {
        db:{
          products: Products,
          cart: Cart
        }
      }, 
      info: any) => any
  }
}

export type Product = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
}

export type Products = Product[];

export type CartItem = {
  id : string;
  amount: number;
  product: Product;
}

export type Cart = CartItem[]