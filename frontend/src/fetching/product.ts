import { Product } from "@/entities/product.entity";
import { config } from "@/lib/config"



export async function getProducts(): Promise<Product[]> {

   const response = await fetch(config.baseUrl + "/products")
   const products = await response.json()

   return products;
}

export async function getSingleProduct(id: number): Promise<Product> {

   const response = await fetch(config.baseUrl + "/products/" + id)
   const product = await response.json()

   return product
}