import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
export const Sliders = ({sliderList}) => {
  return (
      <Carousel>
        <CarouselContent>
          {sliderList.map( slider => 
             (<CarouselItem key={slider?.id}>
              <Image 
                className="w-full rounded-2xl h-[210px] md:h-[420px] object-cover" 
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider?.attributes?.image?.data[0]?.attributes?.url} 
                width={1200} height={400} alt="banner" />
            </CarouselItem>)
          )
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  )
}
