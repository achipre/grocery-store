'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function CreateAccount () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onCreateAccount = (e) => {
    e.preventDefault()
    console.log(username,email,password);
    setUsername('')
    setEmail('')
    setPassword('')
  }



  return (
    <div className="mt-6 p-14 flex justify-center">
      <div className="flex flex-col items-center p-10 bg-stone-300 rounded-2xl border border-stone-400">
        <Image className="" src='/logo.png' width={250} height={250} alt="logo"/>
        <h2 className="ml-7 font-bold text-3xl">Create Account</h2>
        <p className="text-orange-700 font-bold text-center">Enter your Email and Password to Create an account</p>
        <form className='flex flex-col mt-8 w-full max-w-96 gap-3'>
          <Input onChange={(e) => setUsername(e.target.value)} value={username} className='text-orange-800 font-bold placeholder:text-orange-800 placeholder:opacity-60 placeholder:font-bold text-lg' placeholder="Username" />
          <Input onChange={(e) => setEmail(e.target.value)} value={email} className='text-orange-800 font-bold placeholder:text-orange-800 placeholder:opacity-60 placeholder:font-bold text-lg' type="email" placeholder="name@example.com" />
          <Input onChange={(e) => setPassword(e.target.value)} value={password} className='text-orange-800 font-bold placeholder:text-orange-800 placeholder:opacity-60 placeholder:font-bold text-lg' type="password" placeholder="Password" />
          <Button onClick={onCreateAccount} className='text-lg mt-6'>Create Account</Button>
          <p className="text-center mt-2">Already have an account: 
            <Link href='/sign-in' className="text-blue-500"> Click Here to Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
