import { useSession } from "next-auth/react";
import styles from "./profile.module.css";

const HalamanProfile = () => {
  const { data }: any = useSession();
  const fullname = data?.user?.fullname || "Pengguna";
  const email = data?.user?.email || "-";
  const initial = fullname?.charAt(0)?.toUpperCase() || "U";

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.heading}>Profile Saya</h1>
              <p className={styles.subheading}>
                Selamat datang, {fullname}! Ini adalah halaman profile kamu.
              </p>
            </div>
            <div className={styles.avatar} aria-hidden="true">
              {initial}
            </div>
          </header>

          <div className={styles.grid}>
            <article className={styles.infoCard}>
              <p className={styles.label}>Nama Lengkap</p>
              <p className={styles.value}>{fullname}</p>
            </article>

            <article className={styles.infoCard}>
              <p className={styles.label}>Email</p>
              <p className={styles.value}>{email}</p>
            </article>

            <article className={styles.infoCard}>
              <p className={styles.label}>Status Akun</p>
              <p className={styles.value}>
                <span className={styles.badge}>Aktif</span>
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HalamanProfile;
