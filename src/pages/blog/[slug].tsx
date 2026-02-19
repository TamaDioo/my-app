import { useRouter } from "next/router";

const HalamanSlug = () => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Halaman Slug</h1>
      <p>Slug: {query.slug}</p>
    </div>
  );
};

export default HalamanSlug;
