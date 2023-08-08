import {PRODUCTS} from '@/graphql/products'
import styled from '@emotion/styled'
import Link from 'next/link';
import { Children, ReactElement } from 'react';

const Item = styled.div`
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
  & a{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export function ProductItem ({
  id,
  imageUrl,
  price,
  description,
  title,
  children
}: PRODUCTS & {children?: ReactElement}){
  const ImageChild = Children.only(children);
  return (
    <Item>
      <Link href={`/products/${id}`}>
        <h3 className='title'>{title}</h3>
        {ImageChild}
        <p className='description'>{description}</p>
        <p className='price'>{price}</p>
      </Link>
    </Item>
  )
}

