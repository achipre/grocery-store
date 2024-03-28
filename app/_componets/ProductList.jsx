'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductItemDetail } from "./ProductItemDetail"


export const ProductList = ({productList}) => {
  return (
    <section className="mt-5">
      <h2 className="text-primary font-bold text-2xl">Popular Products</h2>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4">
      {productList.map(product => product.id <= 8 && (
        <div className="h-full w-full flex flex-col border border-stone-300 p-8 rounded-xl cursor-pointer group hover:bg-stone-300 transition-all ease-in-out hover:shadow-md" key={product.id}>
          <Image className="h-56 self-center py-2 object-contain group-hover:scale-110 transition-all ease-in-out" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+ product?.attributes?.images?.data[0]?.attributes?.url} width={240} height={60} alt="icon"/>
          <h2 className="text-center text-lg text-orange-900 font-bold">{product?.attributes?.name}</h2>
          <div className="flex justify-center gap-3 my-3">
            <h2 className="text-center text-lg text-orange-900 font-bold">${product?.attributes?.sellingPrice}</h2>
            {product?.attributes?.mrp && <p className="text-center text-lg text-gray-500 line-through font-bold ">${product?.attributes?.mrp}</p>}
          </div>
          <Dialog>
            <DialogTrigger>
              <Button className='items-center mt-auto bg-stone-200 text-orange-800 font-bold text-lg border border-orange-800 hover:text-stone-200 hover:bg-orange-800 transition-all ease-in-out'>Add to Cart</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <ProductItemDetail product={product} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>
      ))}
      </div>
    </section>
  )
}
