import {graphql} from 'msw';
import {v4 as uuidv4} from 'uuid';
import { GET_PRODUCTS, GET_PRODUCT } from '@/graphql/products';
import {
  GET_CARTS, 
  ADD_CART,
  UPDATE_CART, 
  CartType
} from '@/graphql/cart';

const mock_products = Array.from({length: 20}).map((_,i) => ({
  id: uuidv4(),
  imageUrl: `https://i.pravatar.cc/150?img=${10+i}`,
  price: 50000,
  title: `임시상품${i+1}`,
  description: `임시상품${i+1}입니다.`,
  createdAt: new Date(1645735501883+(i*1000*60*60*10)).toISOString(),
}))

let cartData: {[key:string]:CartType} = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mock_products
      })
    )
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const foundItem = mock_products.find((item) => item.id === req.variables.graphqlId);
    if(foundItem) return res(ctx.data(foundItem))
    return res();
  }),
  graphql.query(GET_CARTS, (req, res, ctx) => {
    return res(ctx.data([...Object.values(cartData)]));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newData = JSON.parse(JSON.stringify(cartData));
    const id = req.variables.id;
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
    return res(ctx.data(newData));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = JSON.parse(JSON.stringify(cartData));
    const {id, amount}  = req.variables;
    if(!newData[id]) throw new Error('cart not found');
    newData[id] = {
      ...newData[id],
      amount: amount
    }
    cartData = newData;
    return res(ctx.data(newData));
  })
];

