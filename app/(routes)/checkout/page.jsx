'use client'
import { createOrder, getCartItemsApi } from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const jwt = sessionStorage.getItem('jwt')
  const router = useRouter()

  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemList, setCartItemList] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  
  const [isLoading, setIsLoading] = useState(false)

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [zip, setZip] = useState()
  const [address, setAddress] = useState()

  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in')
    }
    getCartItems()
  }, [])

  useEffect(() => {
    let total = 0
    cartItemList.forEach(amount => {
      return total = total + amount.amount
    });
    setSubtotal(total)
    setTotalAmount(total * 0.9 + 15)
  }, [cartItemList])
  
  const getCartItems = async () => {
    setIsLoading(true)

    const cartListItem = await getCartItemsApi(user?.id, jwt)
    setTotalCartItem(cartListItem.length)
    setCartItemList(cartListItem)
    setIsLoading(false)

  }

  const onApprove = (data) => {
    console.log(data);
    const payload = {
      paymentId: data.paymentId,
      totalOrder: totalAmount,
      username,
      email,
      phone,
      zip,
      address,
      orderItemList
    }
    createOrder(payload,jwt)
      .then(resp => console.log(resp))
      toast('Order Places Successfull')
  }

  return (
    <div className="">
      <h2 className="text-center bg-orange-700 font-bold text-4xl py-6 text-orange-200">Checkout</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 mx-auto max-w-5xl">
        <div className="max-w-2xl ml-8 mr-8 sm:ml-8 sm:mr-0">
          <h2 className="text-3xl font-bold">Billing Details</h2>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mt-3">
            <Input placeholder='Name' onChange={(e) => setUsername(e.target.value)} value={username} />
            <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mt-3">
            <Input type='tel' placeholder='Phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
            <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} value={zip} />
          </div>
          <div className="mt-3">
            <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
          </div>
        </div>
        <div className="max-w-xl mx-8 border">
          <h2 className="p-3 bg-slate-100 font-bold text-center">({isLoading ? <Loader2 className="inline animate-spin p-1" /> : 'Total Cart ' + totalCartItem})</h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">Subtotal: <span>${isLoading ? <Loader2 className="inline animate-spin p-1" /> : subtotal}</span></h2>
            <hr />
            <h2 className="flex justify-between">Delivery: <span>$15.00</span></h2>
            <h2 className="flex justify-between">Tax(9%): <span>${isLoading ? <Loader2 className="inline animate-spin p-1" /> : (totalCartItem * 0.9).toFixed(2)}</span></h2>
            <hr />
            <h2 className="font-bold flex justify-between">Total: <span>${isLoading ? <Loader2 className="inline animate-spin p-1" /> :totalAmount}</span></h2>
            {/* <Button>Payment <ArrowBigRight/></Button> */}
            <PayPalButtons style={{"layout":"vertical"}} 
              onApprove={onApprove}
              createOrder={(data, action) => {
                return action.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: 1,
                        currency_code: 'USD'
                      }
                    }
                  ]
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

