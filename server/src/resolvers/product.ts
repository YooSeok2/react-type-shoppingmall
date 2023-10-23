import { v4 as uuidv4 } from 'uuid';
import { Resolver, Product } from './types';
import { DBFIELDS, writeDB } from '../dbcontroller';

const setJSON = (data:Product[]) => writeDB(DBFIELDS.PRODUCTS, data);

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
  Mutation: {
   addProduct: (parent, {
      imageUrl,
      price,
      title,
      description
   }, {db}) => {
      const newProduct = {
         id: uuidv4(),
         imageUrl,
         price,
         title,
         description,
         createdAt: new Date().toISOString()
      }
      db.products.unshift(newProduct);
      setJSON(db.products);
      return newProduct;
   },
   updateProduct: (parent, {id, ...data}, { db }) => {  
      const existProductIdx = db.products.findIndex((item : any) => item.id === id);
      if(existProductIdx === -1) throw new Error('product not found');
      const existProduct = db.products[existProductIdx];
      const updatedProduct = {
         ...existProduct,
         ...data
      }
      db.products.splice(existProductIdx, 1, updatedProduct);
      setJSON(db.products);
      return updatedProduct;
   },
   deleteProduct: (parent, { id }, { db }) => {
      const existProductIdx = db.products.findIndex((item : any) => item.id === id);
      if(existProductIdx === -1) throw new Error('product not found');
      const updatedProduct = {
         ...db.products[existProductIdx]
      };
      delete updatedProduct.createdAt;
      db.products.splice(existProductIdx, 1, updatedProduct);
      setJSON(db.products);
      return id;
   }
  }
}

export default productResolver;