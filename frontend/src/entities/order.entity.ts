import { ProductOrder } from "./product-order.entity"

export type Order = {
   id: string
   name: string
   products: ProductOrder[]
}