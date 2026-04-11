import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/dist/client/script";

const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      {/* <div className={styles.navbar__brand} id="title">
        MyApp
      </div> */}
      <div className={styles.navbar__brand} id="title">
        <Script
          id="title-script"
          strategy="lazyOnload"
        >{`document.getElementById("title").innerHTML = "MyApp";`}</Script>
      </div>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              {data.user.image && (
                <Image
                  src={data.user.image}
                  alt={data.user.fullname}
                  className={styles.navbar__user__image}
                  width={50}
                  height={50}
                />
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
