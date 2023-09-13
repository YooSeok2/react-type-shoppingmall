import { gql } from "apollo-server-express";
import productSchema from "./product";
import cartSchema from "./cart";

/**
 * 여러 스키마를 한데 묶어서 내보내기 위해서는 아래와 같이
 * linkSchema를 만들어서 export 해줘야 하는데
 * Query와 Mutation을 만들면 Query와 Mutation에 불러온 스키마들의
 * Query와 Mutation이 자동으로 합쳐져서(내부적으로 extend 되어진다) 내보내진다.
 * 하지만 빈 Query와 Mutation을 내보내면 오류가 발생하기 때문에 
 * _ : Boolean을 넣어주는 것이다.
 */
const linkSchema = gql`
  type Query {
    _ : Boolean
  }
  type Mutation {
    _ : Boolean
  }
`

export default [linkSchema, productSchema, cartSchema];