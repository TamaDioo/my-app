const MainSection = () => {
  return (
    <section className="main-section">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Produk User Page</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product grid akan ditambahkan di sini */}
          <div className="text-center text-gray-500 col-span-full py-12">
            <p>Belum ada produk tersedia</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
