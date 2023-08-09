import {
  atom, selectorFamily
} from 'recoil';

const cartState = atom<Map<string, number>>({
  key: 'cartState',
  default: new Map()
})

export const cartItemSelector = selectorFamily<number | undefined, string>({
  key: 'cartItem',
  get: (id: string) => ({get}) => {
    const carts = get(cartState);
    return carts.get(id) || 0;
  },
  set: (id: string) => ({get, set}, newValue:number) => {
    const carts = get(cartState);
    const newCarts = new Map(carts);
    if(newCarts.has(id)) newCarts.set(id, carts.get(id)+newValue);
    else newCarts.set(id, newValue)    
    console.log(newCarts)
    set(cartState, newCarts);
  }
})