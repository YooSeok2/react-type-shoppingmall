import {Products} from '@/types';
import styled from '@emotion/styled'
import Link from 'next/link';

const ItemList = styled.li`
border: 1px solid #000;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
& .image{
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin: 15px 0;
}
`

export default function ProductItem ({
  category,
  id,
  description,
  image,
  price,
  rating,
  title
}: Products){
  return (
    <ItemList>
      <Link href={`/products/${id}`}>
        <h3 className='title'>{title}</h3>
        <p className='category'>{category}</p>
        <p className='description'>{description}</p>
        <img src={image} className='image'/>
        <p className='price'>{price}</p>
        <p className='rate'>{rating.rate}</p>
      </Link>
    </ItemList>
  )
}
