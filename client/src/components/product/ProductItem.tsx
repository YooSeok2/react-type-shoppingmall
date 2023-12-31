import {ProductType} from '@/graphql/products'
import styled from '@emotion/styled'
import Link from 'next/link';
import { Children, ReactElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { graphqlFetcher } from '@/api/queryClient';
import { ADD_CART } from '@/graphql/cart';

const Item = styled.div`
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  & a{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & button{
    width: 100%;
    height: 30px;
    background-color: #fefefe;
    border: 1px solid #000;
    padding: 5px;
  }
`

export function ProductItem ({
  id,
  imageUrl,
  price,
  description,
  title,
  children
}: ProductType & {children?: ReactElement}){
  const ImageChild = Children.only(children);
  const {mutate: addCart} = useMutation((id:string) => graphqlFetcher(ADD_CART, {id}))
  return (
    <Item>
      <Link href={`/products/${id}`}>
        <h3 className='title'>{title}</h3>
        {ImageChild}
        <p className='description'>{description}</p>
        <p className='price'>{price}</p>
      </Link>
      <button name='button' onClick={()=>addCart(id)}>담기</button>
    </Item>
  )
}

