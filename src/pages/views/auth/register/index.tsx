import Link from "next/link";
import styles from "./register.module.css";

const TampilanRegister = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
        <p className={styles.subtitle}>Buat akun baru Anda</p>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nama Lengkap</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Masukkan email Anda"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Masukkan password"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Konfirmasi Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Konfirmasi password"
            />
          </div>

          <button type="submit" className={styles.button}>
            Daftar
          </button>
        </form>

        <div className={styles.footer}>
          Sudah punya akun?{" "}
          <Link href="/auth/login" className={styles.link}>
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TampilanRegister;
