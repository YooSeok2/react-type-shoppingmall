import { Cart, Resolver } from './types';
import { DBFIELDS, writeDB } from '../dbcontroller';


const setJSON = (data:Cart) => writeDB(DBFIELDS.CART, data);

const cartResolver: Resolver = {
  Query: {
    carts: (parent, args, {db}, info)  => {
      return db.cart;
   },
  },
  Mutation: {
    addCart: (parent, {id}, {db}, info) => {
      if(!id) throw new Error('id is required');
      const foundItem = db.products.find((item)=> item.id === id);
      if(!foundItem) throw new Error('product not found');
      const foundCartItemIndex = db.cart.findIndex((item)=> item.id === id);
      if( foundCartItemIndex === -1) {
        const newCartItem = {
          id,
          amount: 1,
          product: {
            ...foundItem
          }
        }
        db.cart.push(newCartItem);
        const result = setJSON(db.cart);
        if(!result) throw new Error('failed to add cart');
        return newCartItem;
      } 
      const cartItem = {
        ...db.cart[foundCartItemIndex],
        amount: 1 + db.cart[foundCartItemIndex].amount
      }
      db.cart.splice(foundCartItemIndex, 1, cartItem);
      const result = setJSON(db.cart);
      if(!result) throw new Error('failed to add cart')
      return cartItem;
    },
    updateCart: (parent, {id, amount}, {db}, info) => {
      const foundCartItemIndex = db.cart.findIndex((item)=> item.id === id);
      if( foundCartItemIndex === -1) throw new Error('cart not found');
      const cartItem = {
        ...db.cart[foundCartItemIndex],
        amount
      }
      db.cart.splice(foundCartItemIndex, 1, cartItem);
      setJSON(db.cart);
      const result = setJSON(db.cart);
      if(!result) throw new Error('failed to add cart')
      return cartItem;
    },
    deleteCart: (parent, {id}, {db}, info) => {
      const foundCartItemIndex = db.cart.findIndex((item)=> item.id === id);
      if( foundCartItemIndex === -1) throw new Error('cart not found');
      db.cart.splice(foundCartItemIndex, 1);
      const result = setJSON(db.cart);
      if(!result) throw new Error('failed to add cart')
      return id;
    },
    executePayment: (parent, {ids}, {db}, info) => {
      ids.forEach((id:string)=>{
        const foundCartItemIndex = db.cart.findIndex((item)=> item.id === id);
        if( foundCartItemIndex === -1) throw new Error('cart not found');
        db.cart.splice(foundCartItemIndex, 1);
      })
      const result = setJSON(db.cart);
      if(!result) throw new Error('failed to add cart');
      return ids;
    },
  }
}

export default cartResolver;

