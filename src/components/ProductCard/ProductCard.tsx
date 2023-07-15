import Image from "next/image";
import { TProduct } from "@/types/types";
import { textTruncate } from "@/utils/textTruncate";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { title, description, price, image, rating } = product;
  return (
    <li className="cursor-pointer flex flex-col max-h-content border border-gray-300 rounded-md p-2.5 gap-2.5 transition-colors">
      <div className="relative flex max-h-[140px] w-full rounded-md items-center justify-center overflow-hidden bg-white">
        <Image
          height={300}
          width={300}
          priority
          src={image}
          alt={title}
          quality={80}
          className="relative h-full w-full object-contain transition duration-300 ease-in-out hover:scale-105 p-2"
        />
      </div>
      <div>
        <h2 className="text-sm md:text-lg leading-5 font-semibold text-gray-700  hover:text-orange-700 transition-color transition-transform duration-75 overflow-hidden whitespace-nowrap text-overflow">
          {title}
        </h2>

        <p className="text-sm text-gray-500 overflow-ellipsis overflow-hidden h-26 md:h-30">
          {textTruncate(description, 80)}
        </p>

        <div className="text-left">
          <div>
            <span className="text-sm md:text-lg font-semibold">{`$${price}`}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs md:text-sm text-orange-700">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>&#9733;</span>
            ))}
            <span>({rating?.count})</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
