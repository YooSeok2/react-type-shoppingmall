import { v4 as uuidv4 } from 'uuid';
import { Resolver } from './types';

const mock_products = Array.from({length: 20}).map((_,i) => ({
  id: uuidv4(),
  imageUrl: `https://i.pravatar.cc/150?img=${10+i}`,
  price: 50000,
  title: `임시상품${i+1}`,
  description: `임시상품${i+1}입니다.`,
  createdAt: new Date(1645735501883+(i*1000*60*60*10)).toISOString(),
}))

const productResolver: Resolver = {
  Query: {
     products: (parent, args, contextValue, info) => {
        return mock_products
     },
     product: (parent, args, contextValue, info) => {
        const foundItem = mock_products.find((item) => item.id === args.id);
        if(foundItem) return foundItem
        return null;
     }
  },
  Mutation: {}
}

export default productResolver;