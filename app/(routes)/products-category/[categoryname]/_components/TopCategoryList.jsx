import { getCategoryList } from "@/app/_utils/GlobalApi"
import Image from "next/image"
import Link from "next/link"

export const TopCategoryList = ({categoryList, selectedCategory}) => {

  return (
    <div className="flex h-full overflow-auto items-stretch gap-4 justify-start sm:justify-center">
      {categoryList.map(category => (
        <Link href={'/products-category/'+category?.attributes?.name} className={`flex flex-col ${ (selectedCategory === category?.attributes?.name)? 'bg-stone-400':'bg-stone-300'} p-8 rounded-xl cursor-pointer group hover:bg-stone-400 transition-all ease-in-out`} key={category.id}>
          <Image className="h-full self-center py-2 object-contain group-hover:scale-125 transition-all ease-in-out" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data[0]?.attributes?.url} width={105} height={105} alt="icon"/>
          <h2 className="text-center text-lg text-orange-900 font-bold">{category?.attributes?.name}</h2>

        </Link>
      ))}
      </div>
  )
}
