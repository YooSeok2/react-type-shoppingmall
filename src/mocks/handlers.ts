import {graphql} from 'msw';
import {v4 as uuidv4} from 'uuid';
import { GET_PRODUCTS, GET_PRODUCT } from '@/graphql/products';


const mock_products = Array.from({length: 20}).map((_,i) => ({
  id: uuidv4(),
  imageUrl: `https://i.pravatar.cc/150?img=${10+i}`,
  price: 50000,
  title: `임시상품${i+1}`,
  description: `임시상품${i+1}입니다.`,
  createdAt: new Date(1645735501883+(i*1000*60*60*10)).toISOString(),
}))

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mock_products
      })
    )
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    return res(ctx.data(mock_products.filter((p) => p.id === req.variables.graphqlId)[0]))
  })
];

