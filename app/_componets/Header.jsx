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


export const Header = () => {
  return (
    <header className="flex justify-between p-5 shadow-md">
      <div className="flex gap-6 items-center">
        <Image width={150} height={100} src={'/logo.webp'} alt="logo"/>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex cursor-pointer gap-2 items-center border border-orange-950 rounded-full p-2 px-8 bg-orange-200 text-orange-950">
              <LayoutGrid className="w-5 h-5 text-orange-800" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex relative gap-3 items-center border border-orange-950 rounded-full  bg-orange-200 text-orange-900">
          <Search className="cursor-text pointer-events-none absolute left-4" />
          <input className="bg-orange-200 placeholder:text-orange-900 w-full outline-none p-2 px-8 h-full rounded-full pl-12" type="text" placeholder="Search" />
        </div>
      </div>
      <div className="flex items-center gap-6 pr-5">
        <h2 className="flex gap-1 items-center text-lg font-semibold text-orange-900"> <ShoppingBag /> 0</h2>
        <Button>Login</Button>
      </div>
    </header>
  )
}
