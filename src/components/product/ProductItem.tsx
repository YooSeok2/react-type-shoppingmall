import {Products} from '@/types';
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
  category,
  id,
  description,
  image,
  price,
  rating,
  title,
  children
}: Products & {children?: ReactElement}){
  const child = Children.only(children);
  return (
    <Item>
      <Link href={`/products/${id}`}>
        <h3 className='title'>{title}</h3>
        <p className='category'>{category}</p>
        <p className='description'>{description}</p>
        {child}
        <p className='price'>{price}</p>
        <p className='rate'>{rating.rate}</p>
      </Link>
    </Item>
  )
}

