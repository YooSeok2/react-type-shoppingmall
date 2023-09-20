import { v4 as uuidv4 } from 'uuid';
import { Resolver } from './types';

const productResolver: Resolver = {
  Query: {
     products: (parent, {cursor = ''}, {db}) => {
        const fromIndex = db.products.findIndex((item : any) => item.id === cursor)+1;
        return db.products.slice(fromIndex, fromIndex+10) || [];
     },
     product: (parent, args, {db}) => {
        const foundItem = db.products.find((item : any) => item.id === args.id);
        return foundItem;
     }
  },
  Mutation: {}
}

export default productResolver;