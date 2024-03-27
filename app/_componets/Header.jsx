'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Search, ShoppingBag } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCategory } from "../_utils/GlobalApi"


export const Header = () => {

  const [cateroryList, setCategoryList] = useState([])

  useEffect(() => {
    getCategoryList()
  }, [])
  
  const getCategoryList = () => getCategory().then(resp => setCategoryList(resp?.data?.data))

  return (
    <header className="flex justify-between p-5 shadow-md">
      <div className="flex gap-6 items-center">
        <Image width={150} height={70} src={'/logo.webp'} alt="logo" priority/>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex cursor-pointer gap-2 items-center border border-orange-950 rounded-full p-2 px-8 bg-orange-200 text-orange-950 text-lg leading-[22px]">
              <LayoutGrid className="w-5 h-5 text-orange-800" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='text-lg'>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {cateroryList.map(category => (
              <DropdownMenuItem key={category.id} className='flex gap-4 text-lg pl-5'>
                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data[0]?.attributes?.url} width={25} height={25} alt="icon"/>
                {category?.attributes?.name}
                </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex relative gap-3 items-center border border-orange-950 rounded-full  bg-orange-200 text-orange-900 text-lg">
          <Search className="cursor-text pointer-events-none absolute left-4" />
          <input className="bg-orange-200 placeholder:text-orange-900 w-full outline-none p-2 px-8 h-full rounded-full pl-12 text-lg" type="text" placeholder="Search" />
        </div>
      </div>
      <div className="flex items-center gap-6 pr-5 pl-6">
        <h2 className="flex gap-1 items-center text-lg font-semibold text-orange-900"> <ShoppingBag /> 0</h2>
        <Button>Login</Button>
      </div>
    </header>
  )
}
