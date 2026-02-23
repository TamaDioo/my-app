import { useRouter } from "next/router";

const halamanKategori = () => {
  const { query } = useRouter();
  const slugArray = Array.isArray(query.slug) ? query.slug : [query.slug];

  return (
    <div>
      <h1>Halaman Kategori</h1>
      <p>Parameter URL:</p>
      <ul>
        {slugArray.map((param, index) => (
          <li key={index}>
            Segmen {index + 1}: {param}
          </li>
        ))}
      </ul>
      <p>Full path: /{slugArray.join("/")}</p>
    </div>
  );
};

export default halamanKategori;
