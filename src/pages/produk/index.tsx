import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import dynamic from "next/dynamic";

const TampilanProduk = dynamic(() => import("../../views/product"));

const kategori = () => {
  const { push } = useRouter();
  const [products, setProducts] = useState([]);

  // Menggunakan SWR untuk Client-Side data fetching
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data?.data} />
    </div>
  );
};

export default kategori;
