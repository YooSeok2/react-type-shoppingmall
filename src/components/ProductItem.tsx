import {Products} from '@/types';

export default function ProductItem ({
  category,
  id,
  description,
  image,
  price,
  rating,
  title
}: Products){
  console.log('product', title)
  return (
    <li>
      <h3>{title}</h3>
      <p>{category}</p>
      <p>{description}</p>
      <img src={image}/>
      <p>{price}</p>
      <p>{rating.rate}</p>
    </li>
  )
}
