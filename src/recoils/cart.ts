import { CartType } from '@/graphql/cart';
import {
  atom, selectorFamily
} from 'recoil';

export const checkedCartState = atom<CartType[]>({
  key: 'cartState',
  default: []
})

// export const cartItemSelector = selectorFamily<number | undefined, string>({
//   key: 'cartItem',
//   get: (id: string) => ({get}) => {
//     const carts = get(cartState);
//     return carts.get(id) || 0;
//   },
//   set: (id: string) => ({get, set}, newValue:number) => {
//     const carts = get(cartState);
//     const newCarts = [...carts];
//     if(newCarts.has(id)) newCarts.set(id, carts.get(id)+newValue);
//     else newCarts.set(id, newValue)    
//     set(cartState, newCarts);
//   }
// })