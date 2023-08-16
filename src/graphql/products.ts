import { gql } from 'graphql-tag';

export type ProductType = {
  id:string,
  imageUrl:string,
  price:number,
  title:string,
  description:string,
  createdAt:string,
}

export const GET_PRODUCTS = gql`
  query GetProducts {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`;
export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`; 