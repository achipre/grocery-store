import Image from "next/image";
import { CategoryList } from "./_componets/CategoryList";
import { ProductList } from "./_componets/ProductList";
import { Sliders } from "./_componets/Sliders";
import { getAllProducts, getCategoryList, getSliders } from "./_utils/GlobalApi";
import { Footer } from "./_componets/Footer";

export default async function Home() {
  const sliderList = await getSliders()
  const categoryList = await getCategoryList()
  const productList = await getAllProducts()
  return (
    <>
      <main className="p-6 md:p-10 px-14 md:px-16">
        {/* Slider */}
        <Sliders sliderList={sliderList} />
        {/* Category List */}
        <CategoryList categoryList={categoryList} />
        {/* Product List */}
        <ProductList productList={productList} />
        {/* Banner */}
        <Image className="w-full" src='/footer.png' width={1000} height={400} alt="banner"/>
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
