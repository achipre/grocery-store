'use client'
import { signIn } from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    if (jwt) {
      router.push('/')
    }
  }, [])

  const router = useRouter()

  const onSignIn =(e) => {
    e.preventDefault()
    setLoader(true)
    signIn(email, password)
      .then(response => {
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
        sessionStorage.setItem('jwt', response.data.jwt)
        toast("Sign In successfull")
        router.push('/')
        setLoader(false)
      })
      .catch(error => {
        const errorMessage = error?.response?.data?.error?.message
        toast(errorMessage,{ variant: "destructive" })
        setLoader(false)
      })
  }

  return (
    <div className="p-14 flex justify-center h-full items-center">
      <div className="flex flex-col items-center p-10 bg-stone-300 rounded-2xl border border-stone-400">
        <Image className="" src='/logo.webp' width={250} height={250} alt="logo"/>
        <h2 className="ml-7 font-bold text-3xl">Sign In to Account</h2>
        <p className="text-orange-700 font-bold text-center">Enter your Email and Password to Sign In</p>
        <form className='flex flex-col mt-8 w-full max-w-96 gap-3'>
          <Input onChange={(e) => setEmail(e.target.value)} value={email} className='text-orange-800 font-bold placeholder:text-orange-800 placeholder:opacity-60 placeholder:font-bold text-lg' type="email" placeholder="name@example.com" />
          <Input onChange={(e) => setPassword(e.target.value)} value={password} className='text-orange-800 font-bold placeholder:text-orange-800 placeholder:opacity-60 placeholder:font-bold text-lg' type="password" placeholder="Password" />
          <Button onClick={onSignIn} className='text-lg mt-6' disabled={!(email && password)}>
            {loader ? <Loader2 className='mr-2 h-4 w-4 animate-spin' />: <span>Sign In</span> }
          </Button>
          <p className="text-center mt-2">Don't have an account: 
            <Link href='/create-account' className="text-blue-500"> Click Here to Create new Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
