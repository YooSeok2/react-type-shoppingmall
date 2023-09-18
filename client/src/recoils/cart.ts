import { CartType } from '@/graphql/cart';
import {
  atom
} from 'recoil';

export const checkedCartState = atom<CartType[]>({
  key: 'cartState',
  default: []
})

// export const CartItemSelector = selectorFamily<void | number, string>({
//   key: 'cartItem',
//   get: (id: string) => ({get}) => {},
//   set: (id: string) => ({get, set}, newValue:number) => {
//     const cartState = get(checkedCartState);
//     const newCartState = cartState.map((item) => {
//       if(item.id === id) {
//         return {
//           ...item,
//           amount: newValue
//         }
//       }
//       return item;
//     })
//     console.log(newCartState)
//     set(checkedCartState, newCartState);
//   }
// })

// export const CartDeleteSelector = selectorFamily<void, string>({
//   key: 'cartDelete',
//   get: (id: string) => ({get}) => {},
//   set: (id: string) => ({get, set}) => {
//     const cartState = get(checkedCartState);
//     const newCartState = cartState.filter((item) => item.id !== id);
//     set(checkedCartState, newCartState);
//   }
// })