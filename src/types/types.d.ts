export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  color: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type Filters = {
  priceRange: [number, number];
  color: string;
};
