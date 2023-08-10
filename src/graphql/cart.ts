import {gql} from 'graphql-tag';

export type CartType = {
  id:string,
  imageUrl:string,
  price:number,
  title:string,
  amount:number
}

export const GET_CART = gql`
  query GetCart {
    id
    imageUrl
    price
    title
    amount
  }
`

export const ADD_CART = gql`
  mutation AddCart($id: string) {
    id
    imageUrl
    price
    title
    amount
  }
`

