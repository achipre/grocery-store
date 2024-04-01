import { Button } from "@/components/ui/button"
import { Loader2, ShoppingBasket } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { addToBuyCart } from "../_utils/GlobalApi"
import { toast } from "sonner"
import { UpdateCartContext } from "../_context/UpdateCartContext"

export const ProductItemDetail = ({product}) => {
  const jwt = sessionStorage.getItem('jwt')
  const user = JSON.parse(sessionStorage.getItem('user'))

  const params = useRouter()
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext)

  const [productTotalPrice, setProductTotalPrice] = useState(product?.attributes?.sellingPrice)
  const [quantity,setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleRestQuantity = () => {
    if (quantity < 2) return
    setQuantity(quantity - 1)
  }
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1)
  }
  const addToCart = () => {
    setLoading(true)
    if (!jwt) {
      params.push('/sign-in')
      setLoading(false)
      return
    }
    const data = {
      data: {
        quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id
      }
    }
    addToBuyCart(data, jwt)
      .then(resp => {
        console.log(resp);
        toast('Added to cart')
        setUpdateCart(!updateCart)
        setLoading(false)
      })
      .catch(e => {
        toast('Error while adding into cart')
        setLoading(false)
      })

  }
  return (
    <article className="grid grid-cols-1 sm:grid-cols-2">
      <Image className="w-full p-5 bg-stone-200 rounded-lg max-h-60 place-self-center object-contain max-w-80 justify-items-center" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+ product?.attributes?.images?.data[0]?.attributes?.url} width={300} height={30} alt="icon" />

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-orange-800">{product?.attributes?.name}</h1>
        <p className="text-lg">{product?.attributes?.description}</p>
        <div className="flex gap-3 my-3">
          <h2 className="text-center text-4xl text-orange-900 font-bold">${product?.attributes?.sellingPrice}</h2>
          {product?.attributes?.mrp && <p className="text-center text-4xl text-gray-500 line-through font-bold ">${product?.attributes?.mrp}</p>}
        </div>
        <h2 className="font-bold text-lg">Quantity: {product?.attributes?.itemQuantityType}</h2>
        <div className="flex flex-col gap-4">
          <div className="p-2 border flex items-center justify-evenly">
            <div className="flex items-center">
              <button disabled={quantity === 1} onClick={handleRestQuantity} className={`${quantity === 1 ? 'bg-slate-200 text-orange-900' :'bg-orange-900 text-slate-200'} px-3 rounded-lg text-2xl`}>-</button>
              <p className="w-12 text-center font-bold text-2xl">{quantity}</p>
              <button className='bg-orange-900 px-3 rounded-lg text-slate-100 text-2xl' onClick={handlePlusQuantity} >+</button>
            </div>
            <span className="text-2xl font-bold">=</span>
            <p className="text-2xl font-bold"> $ {(productTotalPrice * quantity).toFixed(2)}</p>
          </div>
          <Button onClick={addToCart} className='flex gap-2 text-xl' disabled={loading}>
            {loading ? <Loader2 className="mr-2 animate-spin"/> : (
              <>
                <ShoppingBasket/>
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
        <span className="bg-orange-200 rounded-full self-start px-6 font-bold text-orange-800">Category: {product?.attributes?.categories?.data[0]?.attributes?.name}</span>
      </div>


    </article>
  )
}
