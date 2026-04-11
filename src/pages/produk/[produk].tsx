import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductType } from "@/types/Product.type";
import dynamic from "next/dynamic";

const DetailProduk = dynamic(() => import("../../views/DetailProduct"));

const HalamanProduk = ({ product }: { product: ProductType }) => {
  {
    /Menggunakan client-side rendering/;
  }
  // const Router = useRouter;
  // console.log(Router);
  // const { query } = useRouter();
  // const { data, error, isLoading } = useSWR(
  //   `/api/produk/${query.produk}`,
  //   fetcher,
  // );
  // return (
  //   <div>
  //     <DetailProduk products={isLoading ? [] : data.data} />
  //   </div>
  // );

  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

// Funsi getServerSideProps akan dipanggil setiap kali halaman ini di akses,
// dan akan mengambil data produk dari API sebelum merender halaman.
{
  /Menggunakan server-side rendering/;
}
// export async function getServerSideProps({
//   params,
// }: {
//   params: { produk: string };
// }) {
//   const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
//   const response = await res.json();
//   return {
//     props: {
//       product: response.data, // Pastikan untuk memberikan nilai dedfault jika data tidak tersedia
//     },
//   };
// }

{
  /Menggunakan static-site generation/;
}
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    params: { produk: product.id },
  }));
  // console.log("Paths yang dihasilkan untuk produk:", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { produk: string };
}) {
  const res = await fetch(`http://localhost:3000/api/produk/${params.produk}`);
  const response: { data: ProductType[] } = await res.json();

  // console.log("Data produk yang diambil dari API:", response);
  return {
    props: {
      product: response.data,
    },
  };
}
