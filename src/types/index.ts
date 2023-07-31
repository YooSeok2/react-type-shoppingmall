export type Rating = {
  rate: number,
  count: number
}
export type Products = {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  title: string,
  rating: Rating
}