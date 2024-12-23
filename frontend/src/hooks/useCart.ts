import { ProductOrder } from "@/entities/product-order.entity";
import { create } from "zustand";


interface CartHook {
   products: ProductOrder[],
   add: (product: ProductOrder) => void
   updateQty: (createdAt: number, qty: number) => void
   updateSugar: (createdAt: number, sugar: number) => void
   updateCoffe: (createdAt: number, coffe: number) => void
   updateMilk: (createdAt: number, milk: number) => void
   remove: (createdAt: number) => void
}

export const useCart = create<CartHook>(
   set => ({
      products: [],
      add: (product: ProductOrder) => set((state) => {
         const updatedProducts = [
            ...state.products,
            product,
         ]
         return { products: updatedProducts }
      }),
      updateQty: (createdAt, qty) => set((state) => {
         const products = state.products.map(p => {
            if (p.createdAt == createdAt && qty > 0) {
               p.qty = qty
            }
            return p
         })

         return {
            products: products
         }
      }),
      remove: (createdAt) => set(state => {
         return {
            products: state.products.filter(p => p.createdAt != createdAt)
         }
      }),
      updateSugar: (createdAt, sugar) => set(state => {
         const products = state.products.map(p => {
            if (p.createdAt == createdAt) {
               p.sugar = sugar
            }
            return p
         })
         return { products }
      }),
      updateCoffe: (createdAt, coffe) => set(state => {
         const products = state.products.map(p => {
            if (p.createdAt == createdAt) {
               p.coffe = coffe
            }
            return p
         })
         return { products }
      }),
      updateMilk: (createdAt, milk) => set(state => {
         const products = state.products.map(p => {
            if (p.createdAt == createdAt) {
               p.milk = milk
            }
            return p
         })
         return { products }
      }),
   })
)