'use client'
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image"
import { useEffect, useState } from "react";

export const CartItemList = ({cartItemList, handlerItemDelete}) => {
  return (
    <div>
      <div className="h-[80vh] overflow-scroll">
      {
        cartItemList.map(cart => (
          <div key={cart.id} className="flex justify-between items-center p-2 mb-3 gap-x-4">
            <div className="flex justify-center w-[40%] border p-2">
              <Image className="aspect-square object-contain" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image} width={90} height={90} alt={cart.name} />
            </div>
            <div className="w-[60%]">
              <h2 className="font-bold">{cart.name}</h2>
              <h2>Quantity: {cart.quantity}</h2>
              <h2 className="text-lg font-bold">$ {cart.amount}</h2>
            </div>
            <Trash2Icon onClick={() => handlerItemDelete(cart.id)} className="hover:bg-slate-200 p-2 rounded-full font-bold w-12 h-12 cursor-pointer" />
          </div>
        ))
      }
      </div>
    </div>
  )
}
