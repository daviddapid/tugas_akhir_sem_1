import { Order } from "@/entities/order.entity";
import { config } from "@/lib/config";

export async function getOrderById(id: string): Promise<Order> {
   const response = await fetch(config.baseUrl + "/order/" + id)
   const json = response.json()

   return json;
}