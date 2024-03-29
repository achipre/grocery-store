import { getCategoryList, getProductsByCategory } from "@/app/_utils/GlobalApi"
import { TopCategoryList } from "./_components/TopCategoryList";
import { ProductList } from "@/app/_componets/ProductList";

export default async function ProductCategory({params}) {
  
  const categoryList = await getCategoryList()
  const productList = await getProductsByCategory(params.categoryname)

  return (
    <main>
      <h2 className="text-center bg-orange-700 font-bold text-4xl py-6 text-orange-200">{(params.categoryname).toUpperCase()}</h2>
      <div className="my-6"></div>
      <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryname} />
      <div className="mx-12">
        <ProductList productList={productList} />
      </div>
    </main>
  )
}
