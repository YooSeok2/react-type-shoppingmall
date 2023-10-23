import { gql } from "apollo-server-express";

// 반드시 와야되는 값은 뒤에 느낌표를 붙여준다.
const productSchema = gql`
  type Product {
    id: ID! 
    imageUrl: String!
    price: Int!
    title: String!
    description: String
    createdAt: String 
  }

  type Query {
    products(cursor: ID!): [Product!]
    product(id: ID!): Product!
  }

  type Mutation {
    addProduct(
      imageUrl: String!
      price: Int!
      title: String!
      description: String!
      ): Product!
    updateProduct(
      id: ID!
      imageUrl: String
      price: Int
      title: String
      description: String
    ): Product!
    deleteProduct(id: ID!): ID!
  }
`

export default productSchema;