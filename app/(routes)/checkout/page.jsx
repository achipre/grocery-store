import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";

export default function Checkout() {
  return (
    <div className="">
      <h2 className="text-center bg-orange-700 font-bold text-4xl py-6 text-orange-200">Checkout</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 mx-auto max-w-5xl">
        <div className="max-w-2xl ml-8">
          <h2 className="text-3xl font-bold">Billing Details</h2>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mt-3">
            <Input placeholder='Name' />
            <Input type='email' placeholder='Email' />
          </div>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mt-3">
            <Input type='tel' placeholder='Phone' />
            <Input placeholder='Zip' />
          </div>
          <div className="mt-3">
            <Input placeholder='Address' />
          </div>
        </div>
        <div className="max-w-xl mx-8 border">
          <h2 className="p-3 bg-slate-100 font-bold text-center">Total Cart (3)</h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">Subtotal: <span>$250.00</span></h2>
            <hr />
            <h2 className="flex justify-between">Delivery: <span>$15.00</span></h2>
            <h2 className="flex justify-between">Tax(9): <span>$250.00</span></h2>
            <hr />
            <h2 className="font-bold flex justify-between">Total: <span>$350.00</span></h2>
            <Button>Payment <ArrowBigRight/></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

