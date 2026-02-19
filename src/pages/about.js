import Link from "next/link";

export default function About() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Data Mahasiswa</h1>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>Nama Mahasiswa:</strong> Dio Andika Pradana Mulia Tama
        </p>
        <p>
          <strong>NIM:</strong> 2341720098
        </p>
        <p>
          <strong>Program Studi:</strong> D4 Teknik Informatika
        </p>
      </div>

      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </div>
  );
}
