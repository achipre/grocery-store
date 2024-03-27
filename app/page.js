import { CategoryList } from "./_componets/CategoryList";
import { ProductList } from "./_componets/ProductList";
import { Sliders } from "./_componets/Sliders";
import { getCategoryList, getSliders } from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await getSliders()
  const categoryList = await getCategoryList()
  return (
    <>
      <main className="p-6 md:p-10 px-14 md:px-16">
        {/* Slider */}
        <Sliders sliderList={sliderList} />
        {/* Category List */}
        <CategoryList categoryList={categoryList} />
        {/* Product List */}
        <ProductList />
      </main>
    </>
  );
}
