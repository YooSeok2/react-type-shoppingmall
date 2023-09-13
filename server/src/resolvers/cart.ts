import { v4 as uuidv4 } from 'uuid';
import { Resolver } from './types';
type CartType = {
  id: string;
  amount: number;
  product: {
    id: string;
    imageUrl: string;
    price: number;
    title: string;
    description?: string;
    createdAt?: number;
  }
}
const mock_products = Array.from({length: 20}).map((_,i) => ({
  id: uuidv4(),
  imageUrl: `https://i.pravatar.cc/150?img=${10+i}`,
  price: 50000,
  title: `임시상품${i+1}`,
  description: `임시상품${i+1}입니다.`,
  createdAt: new Date(1645735501883+(i*1000*60*60*10)).toISOString(),
}))

let cartData: {[key:string]:CartType} = {};

const cartResolver: Resolver = {
  Query: {
    carts: (parent, args, contextValue, info)  => {
      return [...Object.values(cartData)];
   },
  },
  Mutation: {
    addCart: (parent, args, contextValue, info) => {
      const newData = JSON.parse(JSON.stringify(cartData));
      const id = args.id;
      if(newData[id]) {
          newData[id] = {
              ...newData[id],
              amount: newData[id].amount + 1
          }
      } else {
        const foundItem = mock_products.find((item) => item.id === id);
        if ( foundItem ){
          newData[id] = {
            id: id,
            amount: 1,
            product: {...foundItem},
          }
        }
      }
      cartData = newData;
      return newData[id];
    },
    updateCart: (parent, args, contextValue, info) => {
      const newData = JSON.parse(JSON.stringify(cartData));
      const {id, amount}  = args;
      if(!newData[id]) throw new Error('cart not found');
      newData[id] = {
        ...newData[id],
        amount: amount
      }
      cartData = newData;
      return newData
    },
    deleteCart: (parent, args, contextValue, info) => {
      const newData = JSON.parse(JSON.stringify(cartData));
      delete newData[args.id];
      cartData = newData;
      return args.id
    },
    executePayment: (parent, args, contextValue, info) => {
      const newData = JSON.parse(JSON.stringify(cartData));
      args.ids.forEach((id:any) => {
        delete newData[id];
      })
      cartData = newData;
      return args.ids
    },
  }
}

export default cartResolver;

