import {gql} from 'graphql-tag';
import { ProductType } from './products';

export type CartType = {
  id:string,
  amount:number,
  product: ProductType
}

export const GET_CARTS = gql`
  query GetCarts {
    id
    amount
    product {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`

export const ADD_CART = gql`
mutation ADD_CART($id: ID!) {
  addCart(productId: $id) {
    id
    amount
    product {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
}
`

