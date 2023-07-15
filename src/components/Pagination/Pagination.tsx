import { TProduct } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 6;

const Pagination = ({ products }: { products: TProduct[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const currentPage = Number(searchParams.get("page")) || 1;
  return (
    <div className="flex justify-between px-2.5 ">
      <button
        onClick={() => {
          router.push("?page=" + (currentPage > 1 ? currentPage - 1 : 1));
        }}
        className="hover:text-orange-700 transition-colors duration-75"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => {
          router.push(
            `?page=${
              currentPage < Math.ceil(products.length / ITEMS_PER_PAGE)
                ? currentPage + 1
                : currentPage
            }`
          );
        }}
        className="hover:text-orange-700 transition-colors duration-75"
        disabled={currentPage === Math.ceil(products.length / ITEMS_PER_PAGE)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
