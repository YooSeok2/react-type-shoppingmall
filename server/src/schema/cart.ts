import { gql } from "apollo-server-express";

const cartSchema = gql`
  type Product {
    id: ID! 
    imageUrl: String!
    price: Int!
    title: String!
    description: String
    createdAt: Float 
  }

  type CartItem {
    id: ID!
    amount: Int!
    product: Product!
  }

  type Query {
    carts: [CartItem!]
  }
  
  type Mutation {
    addCart(id: ID!): CartItem!
    updateCart(id: ID!, amount: Int!): CartItem!
    deleteCart(id: ID!): ID!
    executePayment(ids:[ID!]): [ID!]
  }
`

export default cartSchema;