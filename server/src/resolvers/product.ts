import { v4 as uuidv4 } from 'uuid';
import { Resolver } from './types';

export const mock_products = Array.from({length: 20}).map((_,i) => ({
  id: uuidv4(),
  imageUrl: `https://i.pravatar.cc/150?img=${10+i}`,
  price: 50000,
  title: `임시상품${i+1}`,
  description: `임시상품${i+1}입니다.`,
  createdAt: String(new Date(1645735501883+(i*1000*60*60*10)).toISOString()),
}))

const productResolver: Resolver = {
  Query: {
     products: (parent, args, {db}) => {
        return db.products
     },
     product: (parent, args, {db}) => {
        const foundItem = db.products.find((item : any) => item.id === args.id);
        return foundItem;
     }
  },
  Mutation: {}
}

export default productResolver;