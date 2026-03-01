import { useEffect, useState } from "react";
import TampilanProduk from "../views/product";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

const kategori = () => {
  const [products, setProducts] = useState([]);
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data.data} />
    </div>
  );
};

export default kategori;
