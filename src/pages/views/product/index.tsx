type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <h1>Daftar Produk</h1>
      {products.map((products: ProductType) => (
        <div key={products.id}>
          <h2>Nama: {products.name}</h2>
          <p>Harga: {products.price}</p>
          <img src={products.image} alt={products.name} width={200} />
          <p>Kategori: {products.category}</p>
        </div>
      ))}
    </div>
  );
};

export default TampilanProduk;
