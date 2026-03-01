import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

const kategori = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsedata) => {
        // console.log("Data produk:", responsedata);
        setProducts(responsedata.data);
      })
      .catch((error) => console.error("Error fetching produk:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <button
        onClick={fetchProducts}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Memuat..." : "Refresh Data"}
      </button>
      {products.map((product: ProductType) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Harga: {product.price}</p>
          <p>Ukuran: {product.size}</p>
          <p>Kategori: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default kategori;
