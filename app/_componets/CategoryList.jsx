import Image from "next/image"

export const CategoryList = ({categoryList}) => {
  return (
    <section className="mt-5">
      <h2 className="text-primary font-bold text-2xl">Shop By Category</h2>
      <div className="grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-3 gap-4">
      {categoryList.map(category => (
        <div className="h-full flex flex-col bg-stone-300 p-8 rounded-xl cursor-pointer group hover:bg-stone-400 transition-all ease-in-out" key={category.id}>
          <Image className="h-full self-center py-2 object-contain group-hover:scale-125 transition-all ease-in-out" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data[0]?.attributes?.url} width={105} height={105} alt="icon"/>
          <h2 className="text-center text-lg text-orange-900 font-bold">{category?.attributes?.name}</h2>

        </div>
      ))}
      </div>

    </section>
  )
}
